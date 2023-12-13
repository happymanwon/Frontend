import { create } from "zustand";

interface PurchaseStore {
  purchasedId: string[]; // Assuming zzanId is of type string, change as needed
  addPurchasedId: (zzanId: string) => void;
}

const usePurchaseStore = create<PurchaseStore>((set) => ({
  purchasedId: [],

  // Action to add purchased item
  addPurchasedId: (zzanId) =>
    set((state) => ({
      purchasedId: [...state.purchasedId, zzanId],
    })),
}));

export default usePurchaseStore;
