import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/map/Card";
import Map from "@/components/map/Map";

import { useMapToggleStore } from "@stores/mapToggle";
import useRegionStore from "@/stores/location";

import { StoreDataType } from "@/types/map/storeDataType";

import { styled } from "styled-components";

const MapPage = () => {
  const { isMap } = useMapToggleStore();
  const { districtId, district } = useRegionStore();

  const getStoreAPI = async () => {
    const { data } = await axios(`/api/shops`);
    const filterData = data.filter((store: StoreDataType) => {
      if (store.address.includes(district[districtId])) {
        return store;
      }
    });
    return filterData;
  };

  const {
    isLoading,
    error,
    data: storeData,
  } = useQuery({
    queryKey: ["storeData", districtId],
    queryFn: () => getStoreAPI(),
  });

  if (isLoading) return null;
  if (error) return <div>{error.message}</div>;

  return (
    <MapContainer>
      {isMap ? (
        <Map isMap={isMap} storeData={storeData} />
      ) : (
        <CardContainer>
          <Card storeData={storeData} />
        </CardContainer>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.main`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
`;

const CardContainer = styled.div`
  height: calc(100vh - 6.125rem - 4.5rem);
  padding: 0 1.75rem;
  overflow: auto;
`;

export default MapPage;
