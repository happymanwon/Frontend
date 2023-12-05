import React, { useEffect } from "react";

import { StoreDataType } from "@/types/map/storeDataType";

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapPropsType {
  isMap: boolean;
  storeData: StoreDataType[];
  currentLocation: { lat: number; lng: number };
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

const Map: React.FC<MapPropsType> = ({
  isMap,
  storeData,
  currentLocation,
  setCurrentLocation,
}) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(
        37.5666612,
        126.9783785
        // currentLocation.lat,
        // currentLocation.lng
      ),
      level: 5,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 데이터를 이용하여 지도에 마커 추가
    storeData.forEach((store: StoreDataType) => {
      if (store.latitude && store.longitude) {
        const coords = new window.kakao.maps.LatLng(
          parseFloat(store.longitude),
          parseFloat(store.latitude)
        );
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setMap(map);

        // 마커 클릭 시 정보창 생성
        window.kakao.maps.event.addListener(marker, "click", () => {
          // 클릭 시 지도 중심 이동
          map.setCenter(coords);
        });
      } else {
        console.error("No coordinates");
      }
    });
  }, [isMap, storeData, currentLocation]);

  const currentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  };

  return (
    <>
      <MapContainer id="map"></MapContainer>
      <CurrentLocationButton onClick={currentLocationHandler}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </CurrentLocationButton>
    </>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
`;

const CurrentLocationButton = styled.div`
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #000;
  z-index: 1;
`;

export default Map;
