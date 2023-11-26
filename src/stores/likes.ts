import { create } from "zustand";

interface LikeStore {
  liked: boolean;
  toggleLike: () => void;
}

const useLikeStore = create<LikeStore>((set) => ({
  liked: false,
  toggleLike: () => set((state) => ({ liked: !state.liked })),
}));

export default useLikeStore;
