export interface RestaurantEntity {
  id: string;
  name: string;
  description: string | undefined;
  address: string;
  image: string | null;
  openHours: OpenHoursDays;
  rating: number;
  lat: number;
  lon: number;
}

export interface RestaurantEntityResponse
  extends Omit<RestaurantEntity, "lat" | "lon"> {}

export interface RestaurantEntityListRequest {
  itemsPerPage: number;
}

export interface RestaurantEntityListRequestQuery {
  page: string;
}

export interface RestaurantEntityRequest {
  id: string;
}

export interface AddRestaurantEntity
  extends Omit<RestaurantEntity, "id" | "rating" | "image"> {
  image: string | null;
  imageFile?: Buffer | null;
}

export type RestaurantListResponse = Promise<
  { file: Buffer; data: RestaurantListEntity }[]
>;

export interface RestaurantListEntity {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  address: string;
  openHours: OpenHoursDays;
}

export interface RestaurantMapEntity {
  id: string;
  lat: number;
  lon: number;
  name: string;
  image: string;
}

export type OpenHoursTime = {
  from: string;
  to: string;
};

export type OpenHoursDays = {
  monday?: OpenHoursTime | null;
  tuesday?: OpenHoursTime | null;
  wednesday?: OpenHoursTime | null;
  thursday?: OpenHoursTime | null;
  friday?: OpenHoursTime | null;
  saturday?: OpenHoursTime | null;
  sunday?: OpenHoursTime | null;
};
