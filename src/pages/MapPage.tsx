import { useEffect } from "react";
import Card from "@/components/map/Card";
import { useMapToggleStore } from "@stores/mapToggle";
import { styled } from "styled-components";
import useRegionStore from "@/stores/location";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const MapPage = () => {
  useEffect(() => {
    if (isMap) {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(37.4996992, 126.5565696),
        level: 4,
      };
      new window.kakao.maps.Map(mapContainer, mapOptions);
      // 마커 필요시 코드 추가 필요
    }
  }, [isMap]);

  return (
    <>
      {isMap ? (
        <MapContainer id="map"></MapContainer>
      ) : (
        <CardContainer>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardContainer>
      )}
    </>
  );
};

const MapContainer = styled.main`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
`;

const CardContainer = styled.main`
  height: calc(100vh - 6.125rem - 4.5rem);
  padding: 0 1.75rem;
  overflow: auto;
`;

export default MapPage;
