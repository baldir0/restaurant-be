export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  restaurantId: string;
}

export interface AddProductEntity extends Omit<ProductEntity, "id"> {}
