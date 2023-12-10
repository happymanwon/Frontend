import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useMapToggleStoreType {
  isMap: boolean;
  setIsMap: () => void;
}

export const useMapToggleStore = create(
  persist<useMapToggleStoreType>(
    (set) => ({
      isMap: true,
      setIsMap: () => set((state) => ({ isMap: !state.isMap })),
    }),
    {
      name: "map-storage",
    }
  )
);
