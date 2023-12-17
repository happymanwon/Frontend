import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserStoreType {
  accessToken: string | null;
  refreshToken: string | null;
  memberId: number | null;
  nickname: string | null;
  setLoginData: (data: {
    accessToken: string | null;
    refreshToken: string | null;
    memberId: number | null;
    nickname: string | null;
  }) => void;
  setNickname: (newNickname: string) => void;
}

// 1. Zustand 스토어 생성 및 로컬 스토리지와의 동기화 설정
const useUserStore = create(
  persist<useUserStoreType>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      memberId: null,
      nickname: null,
      setLoginData: (data) => set({ ...data }),
      setNickname: (newNickname) => set({ nickname: newNickname }),
    }),
    {
      name: "user-store", // 로컬 스토리지에 저장될 때 사용될 키
    }
  )
);

export default useUserStore;
