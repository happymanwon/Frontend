import { zzanShopInfoType } from "./zzanShopInfoType";

export interface ZzanItemType {
  zzanItemId: number;
  shopName: string;
  itemName: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  salePrice: number;
  deadLine: string;
  canSale: boolean;
  count: number;
  shopInfo: zzanShopInfoType;
}
