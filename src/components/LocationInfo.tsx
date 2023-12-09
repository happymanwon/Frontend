import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationInfoProps {
  address: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const searchAddress = (address: string) => {
      const mapContainer = mapRef.current; // 지도를 표시할 div

      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          // const infowindow = new window.kakao.maps.InfoWindow({
          //   content:
          //     '<div style="width:150px;text-align:center;padding:6px 0;">상점</div>',
          // });
          // infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    };
    searchAddress(address);
  }, [address]);

  return (
    <div>
      <h3>위치정보</h3>
      <p>{address}</p>
      <p>sh_way(찾아가는길) sh_addr</p>
      <div
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "150px" }}
      ></div>
    </div>
  );
};

export default LocationInfo;
