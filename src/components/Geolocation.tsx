import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import useRegionStore from "@stores/location";
import SelectBox from "./SelectBox";

interface Location {
  latitude: number;
  longitude: number;
}

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API;

const Geolocation = () => {
  const domain = useLocation();
  const { districtId, setDistrictId, district } = useRegionStore();
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
              const result = response.data.documents[0].address;
              const region1Depth = result.region_1depth_name;
              const region2Depth = result.region_2depth_name;

              // 카카오 지도에서 찾은 지역구 이름과 district 안에 키값과 같은 것 찾기 - 적용
              const matchingRegion = Object.keys(district).find((key) => district[Number(key)] === region2Depth);
              if (region1Depth.includes("서울") && matchingRegion) {
                // 찾은 값을 선택된 지역으로 설정
                setDistrictId(Number(matchingRegion));
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

  const handleRegionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDistrictId(Number(e.currentTarget.id));
    // setDistrict(district[selected]); // 선택한 지역 이름 설정
  };

  const isMain = domain.pathname === "/";

  return (
    <DistrictContainer>
      <SelectBox
        options={Object.entries(district)}
        selectedValue={district[districtId]}
        onClick={handleRegionChange}
        isMain={isMain}
      />
    </DistrictContainer>
  );
};

const DistrictContainer = styled.div`
  select {
    border: none;
    border-radius: 0;
    font-family: NotoSansLightWOFF, sans-serif, Arial;
  }
`;

export default Geolocation;
