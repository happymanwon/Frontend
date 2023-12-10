import { StoreDataType } from "@/types/map/storeDataType";

// calculateDistance 함수 타입 정의
interface CalculateDistanceType {
  (lat1: number, lon1: number, lat2: number, lon2: number): number;
}

// filterStoresByDistance 함수 타입 정의
interface FilterStoresByDistanceType {
  (stores: StoreDataType[], currentLocation: { lat: number; lng: number }, radius: number): StoreDataType[];
}

const calculateDistance: CalculateDistanceType = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // 지구의 반경(meter)
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 최종 거리(meter)
};

const filterStoresByDistance: FilterStoresByDistanceType = (stores, currentLocation, radius) => {
  return stores.filter((store) => {
    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      parseFloat(store.latitude),
      parseFloat(store.longitude)
    );
    return distance <= radius;
  });
};

export default filterStoresByDistance;
