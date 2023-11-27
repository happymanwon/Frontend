import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import useRegionStore from "@stores/location";

interface Location {
  latitude: number;
  longitude: number;
}

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API;

const Geolocation = () => {
  const { districtId, setDistrictId, district, setDistrict } = useRegionStore();
  // 초기값은 서울시청 위도 경도
  const [location, setLocation] = useState<Location | null>({
    latitude: 37.5666612,
    longitude: 126.9783785,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          setLocation(newLocation);
          console.log(location);
          localStorage.setItem("userLocation", JSON.stringify(newLocation));

          // 요청을 보낼 Kakao Maps API의 URL
          const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

          // Kakao Maps API에 요청을 보내기 위한 헤더 설정
          const headers = {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          };

          // Kakao Maps API에 요청 보내기
          axios
            .get(apiUrl, { headers })
            .then((response) => {
              // 응답에서 원하는 데이터 추출
              const region2Depth =
                response.data.documents[0].address.region_2depth_name;

              // 카카오 지도에서 찾은 지역구 이름과 district 안에 키값과 같은 것 찾기 - 적용
              const matchingRegion = Object.entries(district).find(
                ([value]) => value === region2Depth
              );

              if (matchingRegion) {
                // 찾은 값을 선택된 지역으로 설정
                setDistrictId(parseInt(matchingRegion[0]));
                setDistrict(region2Depth);
              }
            })
            .catch((error) => {
              console.error("Error getting geolocation:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(e.target.value); // 선택한 값을 숫자로 변환
    setDistrictId(selected);
    setDistrict(district[selected]); // 선택한 지역 이름 설정
  };

  return (
    <DistrictContainer>
      <select value={districtId || ""} onChange={handleRegionChange}>
        {Object.keys(district).map((key) => (
          <option key={key} value={parseInt(key)}>
            {district[parseInt(key)]}
          </option>
        ))}
      </select>
    </DistrictContainer>
  );
};

const DistrictContainer = styled.div`
  select {
    border: none;
    border-radius: 0;
    font-size: 16px;
    font-family: NotoSansWOFF, sans-serif, Arial;
  }
`;

export default Geolocation;
