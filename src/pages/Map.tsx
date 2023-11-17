import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.5666612, 126.9783785),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOptions);
    // 마커 필요시 코드 추가 필요
  }, []);
  return (
    <>
      <div id="map" style={{ width: "100%", height: "80vh" }}></div>
    </>
  );
};

export default Map;
