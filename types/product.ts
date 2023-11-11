export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  restaurantId: string;
}

export interface ProductEntityResponse {
  id: string;
  name: string;
  price: number;
  currency: string;
  imagePath: string;
}

export interface AddProductEntity extends Omit<ProductEntity, "id"> {}