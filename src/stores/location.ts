import { create } from "zustand";

interface RegionState {
  districtId: number;
  setDistrictId: (districtId: number) => void;
  district: { [key: number]: string };
  setDistrict: (updatedDistrict: { [key: number]: string }) => void;
}

const useRegionStore = create<RegionState>((set) => ({
  districtId: 1, // 디폴트 region
  setDistrictId: (districtId: number) => set({ districtId: districtId }),
  district: {
    1: "종로구",
    2: "중구",
    3: "용산구",
    4: "성동구",
    5: "광진구",
    6: "동대문구",
    7: "중랑구",
    8: "성북구",
    9: "강북구",
    10: "도봉구",
    11: "노원구",
    12: "은평구",
    13: "서대문구",
    14: "마포구",
    15: "양천구",
    16: "강서구",
    17: "구로구",
    18: "금천구",
    19: "영등포구",
    20: "동작구",
    21: "관악구",
    22: "서초구",
    23: "강남구",
    24: "송파구",
    25: "강동구",
  },
  setDistrict: (updatedDistrict: { [key: number]: string }) =>
    set((state) => ({ district: { ...state.district, ...updatedDistrict } })),
}));

export default useRegionStore;
