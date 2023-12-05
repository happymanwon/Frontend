import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/map/Card";
import Map from "@/components/map/Map";
import DraggableCardComponent from "@/components/map/DraggableCardComponent";

import { useMapToggleStore } from "@stores/mapToggle";
import useRegionStore from "@/stores/location";

import { ResultDataType } from "@/types/map/storeDataType";

import { styled } from "styled-components";
import { useEffect, useState } from "react";

interface PositionError {
  message: string;
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

const MapPage = () => {
  const { isMap } = useMapToggleStore();
  const { districtId, district } = useRegionStore();
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null);
  const [locationError, setLocationError] = useState<PositionError | null>(
    null
  );

  const getStoreAPI = async () => {
    const { data } = await axios.get<ResultDataType>(
      `/api/shops?localCode=${districtId}`
    );
    const filteredData = data.data.filter((shop) =>
      shop.roadAddress.includes(district[districtId])
    );
    return filteredData;
  };

  // api 요청
  const {
    isLoading: isStoreDataLoading,
    error: storeDataError,
    data: storeData,
  } = useQuery({
    queryKey: ["storeData", districtId],
    queryFn: getStoreAPI,
  });

  // 현재 위치 찾기
  const findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
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

  if (isStoreDataLoading || currentLocation === null) return null;
  if (storeDataError || locationError) {
    let errorMessage = "";

    if (storeDataError && "message" in storeDataError)
      errorMessage = storeDataError.message;
    if (locationError && "message" in locationError)
      errorMessage = locationError.message;

    return <div>{errorMessage}</div>;
  }
  return (
    <MapContainer>
      {isMap ? (
        <>
          <Map
            isMap={isMap}
            storeData={storeData!}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
          />
          <DraggableCardComponent storeData={storeData!} />
        </>
      ) : (
        <CardMain>
          <Card storeData={storeData!} />
        </CardMain>
      )}
    </MapContainer>
    // <MapContainer>
    //   <Map
    //     isMap={isMap}
    //     storeData={storeData!}
    //     currentLocation={currentLocation}
    //     setCurrentLocation={setCurrentLocation}
    //   />
    //   <DraggableContainer />
    // </MapContainer>
  );
};

const MapContainer = styled.main`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  position: relative;
  overflow: hidden;
`;

const CardMain = styled.div`
  height: calc(100vh - 6.125rem - 4.5rem);
  padding: 0 1.75rem;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MapPage;
