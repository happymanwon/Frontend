export interface StoreDataType {
  address: string;
  category: number;
  id: number;
  imageUrl: string;
  latitude: string;
  longitude: string;
  name: string;
  roadAddress: string;
  way: string;
}

export interface ResultDataType {
  code: number;
  data: StoreDataType[];
  message: string;
}
