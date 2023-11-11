import { v4 as uuid, parse, stringify } from "uuid";

import {
  RestaurantEntity,
  RestaurantEntityResponse,
  RestaurantListEntity,
  RestaurantMapEntity,
} from "../types/restaurant";
import { pool } from "../utils/database-connection";
import { FieldPacket } from "mysql2";
import { InsertionError } from "../utils/errorHandler";
import { deleteImageFile, getImagePath } from "../utils/fileSystem";

export class RestaurantRecord implements RestaurantEntity {
  public id;
  public name;
  public description;
  public address;
  public image;
  public openHours;
  public rating;
  public lat;
  public lon;
  constructor(NewRestaurant: RestaurantEntity) {
    this.id = NewRestaurant.id;
    this.name = NewRestaurant.name;
    this.description = NewRestaurant.description;
    this.address = NewRestaurant.address;
    this.image = NewRestaurant.image;
    this.openHours = NewRestaurant.openHours;
    this.rating = NewRestaurant.rating;
    this.lat = NewRestaurant.lat;
    this.lon = NewRestaurant.lon;
  }

  static async findOne(id: string): Promise<RestaurantEntityResponse> {
    const [result] = ((await pool.execute(
      "SELECT * FROM `restaurants` WHERE `id`=:id",
      {
        id: parse(id),
      }
    )) as [RestaurantEntity[], FieldPacket[]])[0];


    return {
      id: stringify(Buffer.from(result.id)),
      name: result.name,
      description: result.description,
      address: result.address,
      image: getImagePath(result.image, "restaurants-icons"),
      openHours: result.openHours,
      rating: result.rating
    }
  }

  static async getPage(
    itemsPerPage: number,
    page: number
  ): Promise<{ file: string; data: RestaurantListEntity }[]> {
    const offset = itemsPerPage * (page - 1);
    const [elements] = (
      await pool.execute("SELECT COUNT(*) as count FROM `restaurants`")
    )[0] as [{ count: number }, FieldPacket[]];
    const maxPages = Math.ceil(elements.count / itemsPerPage);
    const [result] = (await pool.execute(
      "SELECT `id`, `name`, `description`, `image`, `rating`, `address`, `openHours` FROM `restaurants` LIMIT :limit OFFSET :offset",
      {
        limit: String(itemsPerPage),
        offset:
          offset / itemsPerPage > maxPages ? String(maxPages) : String(offset),
      }
    )) as [RestaurantListEntity[], FieldPacket[]];

    const resultData = await Promise.all(
      result.map(async (obj) => {
        let file = null;

        // try {
        //   file = await loadImageFile(obj.image, "restaurants-icons");
        // } catch (e) {
        //   file = null;
        // }

        return {
          data: { ...obj, id: stringify(Buffer.from(obj.id))},
          file: file ,
        };
      })
    );

    return resultData;
  }

  static async findAllAsMapPoints(
    searchString: string = ""
  ): Promise<RestaurantMapEntity[]> {
    const [result] = (await pool.execute(
      "SELECT `id`, `lat`, `lon`, `name`, `image` FROM `restaurants` where `name` LIKE :searchString",
      {
        searchString: `%${searchString}%`,
      }
    )) as [RestaurantMapEntity[], FieldPacket[]];
    return result.map((obj) => {
      return {
        ...obj,
        id: stringify(Buffer.from(obj.id))
      }
    });
  }

  async delete(): Promise<string> {
    const [result] = await pool.execute(
      "DELETE FROM `restauratns` WHERE `id`=:id",
      {
        id: this.id,
      }
    );
    return this.id;
  }

  async insert(): Promise<string> {
    if (this.id) throw new InsertionError("Object already exists in DB.");

    this.id = uuid();

    try {
      const [result] = await pool.execute(
        "INSERT INTO `restaurants` (`id`, `name`, `description`, `address`,`image`,`openHours`,`lat`,`lon`) VALUES (:id, :name, :description, :address, :image, :openHours, :lat, :lon)",
        {
          id: parse(this.id),
          name: this.name,
          description: this.description,
          address: this.address,
          image: this.image,
          openHours: JSON.stringify(this.openHours),
          lat: this.lat,
          lon: this.lon,
        }
      );
    } catch (e) {
      await deleteImageFile(this.image, "restaurants-icons");
      throw new InsertionError(e.message);
    }
    return this.id;
  }
}
