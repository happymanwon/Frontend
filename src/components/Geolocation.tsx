import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const district: { [key: number]: string } = {
  1: "종로구",
  2: "중구",
  3: "용산구",
  4: "성동구",
  5: "광진구",
  6: "동대문구",
  7: "중랑구",
  8: "성북구",
  9: "강북구",
  10: "도봉구",
  11: "노원구",
  12: "은평구",
  13: "서대문구",
  14: "마포구",
  15: "양천구",
  16: "강서구",
  17: "구로구",
  18: "금천구",
  19: "영등포구",
  20: "동작구",
  21: "관악구",
  22: "서초구",
  23: "강남구",
  24: "송파구",
  25: "강동구",
};

interface Location {
  latitude: number;
  longitude: number;
}

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API;

const Geolocation = () => {
  // 초기값은 서울시청 위도 경도
  const [location, setLocation] = useState<Location | null>({
    latitude: 37.5666612,
    longitude: 126.9783785,
  });
  const [regionName, setRegionName] = useState(district[1]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(1); // 종로구가 기본값

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
                ([key, value]) => value === region2Depth
              );

              if (matchingRegion) {
                // 찾은 값을 선택된 지역으로 설정
                setSelectedRegion(parseInt(matchingRegion[0]));
                setRegionName(region2Depth);
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
    setSelectedRegion(selected);
    setRegionName(district[selected]); // 선택한 지역 이름 설정
    // 여기서 선택한 지역에 해당하는 위도 경도 정보 등을 가져오거나 설정할 수 있습니다.
  };

  return (
    <DistrictContainer>
      <select value={selectedRegion || ""} onChange={handleRegionChange}>
        <option value="">지역 선택</option>
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
    color: #fff;
    background: #aab2b5;
  }
`;

export default Geolocation;
