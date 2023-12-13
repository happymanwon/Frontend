import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Map from "@/components/map/Map";
import useRegionStore from "@/stores/location";
import filterStoresByDistance from "@/utils/filterStoresByDistance";
import { ResultDataType, StoreDataType } from "@/types/map/storeDataType";

import { styled } from "styled-components";

interface PositionError {
  message: string;
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

const MapPage: React.FC = () => {
  const { districtId } = useRegionStore();
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [currentViewLocation, setCurrentViewLocation] = useState<CurrentLocation | null>(null);
  const [locationError, setLocationError] = useState<PositionError | null>(null);
  const [filteredStores, setFilteredStores] = useState<StoreDataType[] | null>(null);

  // api 요청 함수
  const getStoreAPI = async () => {
    const { data } = await axios.get<ResultDataType>(`/api/shops`);
    return data;
  };

  // api 요청
  const {
    isLoading: isStoreDataLoading,
    error: storeDataError,
    data: storeData,
  } = useQuery({
    queryKey: ["storeData", districtId],
    queryFn: getStoreAPI,
    select: (data) => data.data,
  });

  // 현재 위치 찾기
  const findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        /**
         *lat: 37.5666612,
          lng: 126.9783785,
         */

        // 현재 위치 저장
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
        });
        // 현재 보고 있는 위치
        setCurrentViewLocation({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        setLocationError(error);
      }
    );
  };

  useEffect(() => {
    findCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentViewLocation && storeData) {
      const radius = 2000; // 원하는 반경(m)
      const filteredList = filterStoresByDistance(storeData, currentViewLocation, radius);
      setFilteredStores(filteredList);
    }
  }, [currentViewLocation, storeData]);

  if (isStoreDataLoading || currentLocation === null || filteredStores === null || currentViewLocation === null) return null;
  if (storeDataError || locationError) {
    let errorMessage = "";

    if (storeDataError && "message" in storeDataError) errorMessage = storeDataError.message;
    if (locationError && "message" in locationError) errorMessage = locationError.message;

    return <div>{errorMessage}</div>;
  }

  if (currentLocation === null || currentViewLocation === null) return null;

  return (
    <MapContainer id="map-bottom-sheet-container">
      <Map
        storeData={filteredStores!}
        // storeData={storeData!}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        currentViewLocation={currentViewLocation}
        setCurrentViewLocation={setCurrentViewLocation}
        isDetail={false}
      />
    </MapContainer>
  );
};

const MapContainer = styled.main`
  width: 100%;
  // height: calc(100vh - 6.125rem - 4.5rem);
  position: relative;
  overflow: hidden;
`;

export default MapPage;
