import { useState, useEffect } from "react";
import axios from "axios";

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
  const [regionName, setRegionName] = useState("종로구");

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
              setRegionName(region2Depth);
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

  return <div>{regionName && <p>{regionName}</p>}</div>;
};

export default Geolocation;
