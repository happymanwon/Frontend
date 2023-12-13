import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapBottomSheet from "@/components/map/MapBottomSheet";
import Map from "@/components/map/Map";
import Card from "@/components/map/Card";
import useRegionStore from "@/stores/location";
import axios from "axios";
import { ResultDataType } from "@/types/map/storeDataType";
import { useQuery } from "@tanstack/react-query";
import { useMapToggleStore } from "@/stores/mapToggle";
import { styled } from "styled-components";

interface RegionStore {
  districtId: number;
  district: { [key: number]: string };
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

const MapDetailPage: React.FC = () => {
  const { isMap } = useMapToggleStore();
  const [params] = useSearchParams();
  const value = params.get("search") || "";
  const { districtId }: RegionStore = useRegionStore();
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);

  const getStoreAPI = async () => {
    const { data } = await axios.get<ResultDataType>(`/api/shops/search?keyword=${encodeURIComponent(value)}`);
    return data;
  };

  const {
    isLoading: isStoreDataLoading,
    error: storeDataError,
    data: storeData,
  } = useQuery({
    queryKey: ["storeData", districtId],
    queryFn: getStoreAPI,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (storeData && storeData.length > 0) {
      setCurrentLocation({
        lat: Number(storeData![0].latitude),
        lng: Number(storeData![0].longitude),
      });
    }
  }, [storeData]);

  if (isStoreDataLoading || currentLocation === null) return null;
  if (storeDataError) {
    let errorMessage = "";

    if (storeDataError && "message" in storeDataError) errorMessage = storeDataError.message;

    return <div>{errorMessage}</div>;
  }

  return (
    <MapContainer>
      {isMap ? (
        <>
          <Map storeData={storeData!} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} isDetail={true} />
          <MapBottomSheet storeData={storeData!} />
        </>
      ) : (
        <CardMain>
          <Card storeData={storeData!} />
        </CardMain>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.main`
  width: 100%;
  // height: calc(100vh - 6.125rem - 4.5rem);
  position: relative;
  overflow: hidden;
`;

const CardMain = styled.div`
  // height: calc(100vh - 6.125rem - 4.5rem);
  padding: 0 1.75rem;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MapDetailPage;
