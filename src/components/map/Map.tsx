import React, { useEffect } from "react";

import { StoreDataType } from "@/types/map/storeDataType";
import { AddressSearchType } from "@/types/map/addressSearchType";

import { styled } from "styled-components";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapPropsType {
  isMap: boolean;
  storeData: StoreDataType[];
}

const Map: React.FC<MapPropsType> = ({ isMap, storeData }) => {
  const removeParentheses = (address: string) => {
    const regex = /\s*\(.*?\)\s*/g;
    return address.replace(regex, "").trim();
  };

  useEffect(() => {
    if (isMap && storeData) {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 데이터를 이용하여 지도에 마커 추가
      storeData.forEach((store: StoreDataType) => {
        const address = removeParentheses(store.address);
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          address,
          (result: AddressSearchType[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              // 마커 생성 및 지도에 추가
              new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
            } else {
              console.error(`Geocode error for address ${address}: ${status}`);
            }
          }
        );
      });
    }
  }, [isMap, storeData]);

  return <MapContainer id="map"></MapContainer>;
};

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
`;

export default Map;
