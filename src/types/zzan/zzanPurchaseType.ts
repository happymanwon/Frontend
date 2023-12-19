export interface zzanPurchaseType {
  purchaseId: number;
  zzanItemId: number;
  shopName: string;
  itemName: string;
  price: number;
  qrUrl: string;
  status: string;
  usedTime: string | null;
  isQR: boolean;
}
