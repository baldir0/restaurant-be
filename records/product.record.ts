import { FieldPacket } from 'mysql2';
import { ProductEntity, ProductEntityResponse } from '../types/product';
import { pool } from '../utils/database-connection';
import { deleteImageFile, getImagePath } from '../utils/fileSystem';
import { DataInsertError, errMsg } from '../utils/errorHandler';
import { parse, stringify, v4 as uuid } from 'uuid';

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

  static async getList(id: string): Promise<ProductEntityResponse[]> {
    const SQLQuery =
      'SELECT `id`, `name`, `price`, `currency`, `image` FROM `products` WHERE `restaurantId`=:id';

    const [result] = (await pool.execute(SQLQuery, {
      id: parse(id),
    })) as [ProductEntity[], FieldPacket[]];

    return result.map((entity) => ({
      id: stringify(Buffer.from(entity.id)),
      name: entity.name,
      currency: entity.currency,
      price: entity.price,
      imagePath: entity.image
        ? getImagePath(entity.image, 'products-icons')
        : null,
    }));
  }

  async insert() {
    if (this.id)
      throw new DataInsertError(errMsg.dataInsert.ObjectAlreadyExistsInDb);

    this.id = uuid();
    const SQLQuery =
      'INSERT INTO `products` (`id`, `name`, `price`, `image`, `restaurantId`) VALUES (:id, :name, :price, :image, :restaurantId)';

    try {
      const [result] = await pool.execute(SQLQuery, {
        id: parse(this.id),
        name: this.name,
        price: this.price,
        image: this.image,
        restaurantId: parse(this.restaurantId),
      });
      return this.id;
    } catch (e) {
      await deleteImageFile(this.image, 'products-icons');
      throw new DataInsertError(errMsg.dataInsert.FailedToInsert);
    }
  }
}
