import { FieldPacket } from "mysql2";
import { ProductEntity } from "../types/product";
import { pool } from "../utils/database-connection";
import { deleteImageFile, loadImageFile } from "../utils/fileSystem";
import { InsertionError } from "../utils/errorHandler";
import { parse, stringify, v4 as uuid } from "uuid";

export class ProductRecord implements ProductEntity {
  public id;
  public name;
  public price;
  public currency;
  public image;
  public restaurantId;
  constructor(NewProduct: ProductEntity) {
    this.id = NewProduct.id;
    this.name = NewProduct.name;
    this.price = NewProduct.price;
    this.currency = NewProduct.currency;
    this.image = NewProduct.image;
    this.restaurantId = NewProduct.restaurantId;
  }

  static async getList(id: string): Promise<[ProductEntity, Buffer]> {
    const [result] = (await pool.execute(
      "SELECT `id`, `name`, `price`, `currecny`, `image` FROM `products` WHERE `restaurantId`=:id",
      {
        id: id,
      }
    )) as [ProductEntity[], FieldPacket[]];

    const imageFile = await loadImageFile(result[0].image, "products-icons");

    return [
      { ...result[0], id: stringify(Buffer.from(result[0].id)) },
      imageFile,
    ];
  }

  async insert() {
    if (this.id) throw new InsertionError("Object already exists in DB.");

    this.id = uuid();
    try {
      const [result] = await pool.execute(
        "INSERT INTO `products` (`id`, `name`, `price`, `image`, `restaurantId`) VALUES (:id, :name, :price, :image, :restaurantId)",
        {
          id: parse(this.id),
          name: this.name,
          price: this.price,
          image: this.image,
          restaurantId: parse(this.restaurantId),
        }
      );
      return this.id;
    } catch (e) {
      await deleteImageFile(this.image, "products-icons");
      throw new InsertionError(e.message);
    }
  }
}
