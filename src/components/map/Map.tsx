import React, { useEffect, useState } from "react";
import { StoreDataType } from "@/types/map/storeDataType";

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import defaultImg from "@/assets/images/default-store.png";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapPropsType {
  storeData: StoreDataType[];
  currentLocation: { lat: number; lng: number };
  setCurrentLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
  currentViewLocation?: { lat: number; lng: number };
  setCurrentViewLocation?: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
  isDetail: boolean;
}

const Map: React.FC<MapPropsType> = ({
  storeData,
  currentLocation,
  setCurrentLocation,
  currentViewLocation,
  setCurrentViewLocation,
  isDetail,
}) => {
  const [storeInfo, setStoreInfo] = useState<StoreDataType | null>(null);
  const [isMarkerClicked, setIsMarkerClicked] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mapInfo, setMapInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
      level: 5,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMapInfo(map);

    // 지도의 중심이 변경되어야 하는 경우에만 업데이트
    if (currentViewLocation && setCurrentViewLocation) {
      if (currentViewLocation.lat !== currentLocation.lat || currentViewLocation.lng !== currentLocation.lng) {
        map.setCenter(new window.kakao.maps.LatLng(currentViewLocation.lat, currentViewLocation.lng));
      }
    }

    // 지도 클릭 이벤트를 등록합니다
    window.kakao.maps.event.addListener(map, "click", () => {
      setIsMarkerClicked(false);
    });

    // 데이터를 이용하여 지도에 마커 추가
    storeData.forEach((store: StoreDataType) => {
      if (store.latitude && store.longitude) {
        const coords = new window.kakao.maps.LatLng(parseFloat(store.latitude), parseFloat(store.longitude));
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setMap(map);

        // 마커 클릭 시 정보창 생성
        window.kakao.maps.event.addListener(marker, "click", () => {
          // 클릭 시 지도 중심 이동
          map.setCenter(coords);
          setStoreInfo(store);
          setIsMarkerClicked(true);
        });
      } else {
        console.error("No coordinates");
      }
    });
  }, [storeData, currentLocation, currentViewLocation]);

  // 현재 위치로 이동
  const currentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(newLocation);
          if (setCurrentViewLocation) {
            setCurrentViewLocation(newLocation);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  };

  // 현재 지도에서 검색
  const retryLocation = () => {
    if (mapInfo && setCurrentViewLocation) {
      const center = mapInfo.getCenter();
      setCurrentViewLocation({
        lat: center.getLat(),
        lng: center.getLng(),
      });
    }
  };

  // 이미지 로드 실패시 대체 이미지로 설정하는 함수
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  const handleMoveStore = (id: number | undefined) => {
    if (!id) return;
    navigate(`/store/${id}`);
  };

  return (
    <>
      {!isDetail && (
        <CurrentLocationSearch onClick={retryLocation}>
          <FontAwesomeIcon icon={faRotateRight} /> &nbsp;현 지도에서 검색
        </CurrentLocationSearch>
      )}
      <MapContainer id="map"></MapContainer>
      <CurrentLocationButton onClick={currentLocationHandler} isDetail={isDetail} isMarkerClicked={isMarkerClicked}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </CurrentLocationButton>
      {!isDetail && (
        <BottomSheetContainer
          style={{
            transform: isMarkerClicked ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <CardContainer onClick={() => handleMoveStore(storeInfo?.id)}>
            <img src={storeInfo?.imageUrl} alt={storeInfo?.name} onError={handleImageError} loading="lazy" />
            <CardInfo>
              <h3>{storeInfo?.name}</h3>
              <p>{storeInfo?.id}</p>
            </CardInfo>
          </CardContainer>
        </BottomSheetContainer>
      )}
    </>
  );
};

const CurrentLocationSearch = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.375rem;
  height: 1.5625rem;
  background: #ffffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-size: 0.8rem;
  color: #006de1;
  z-index: 10;
  cursor: pointer;
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
`;

interface CurrentLocationButtonPropsType {
  isDetail: boolean;
  isMarkerClicked: boolean;
}

const CurrentLocationButton = styled.div<CurrentLocationButtonPropsType>`
  position: absolute;
  bottom: ${(props) => (props.isDetail ? "15rem" : props.isMarkerClicked ? "17rem" : "1.25rem")};
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

const BottomSheetContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 16.5625rem;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0 0px 20px 0 rgba(38, 89, 115, 0.11), 0 -1px 0 rgba(38, 89, 115, 0.05);
  border-radius: 1.25rem 1.25rem 0 0;

  display: flex;
  justify-content: center;

  // 초기 상태: 화면 밖으로 숨겨진 상태
  transform: translateY(100%);

  // 애니메이션 효과
  transition: transform 0.3s ease-out;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 23rem;
  height: 14.375rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 1.0625rem 0;
  cursor: pointer;

  & img {
    height: 71%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 29%;
  margin: 0.5rem 0.875rem;

  & h3 {
    color: #000;
    font-family: Noto Sans KR;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 170% */
  }

  & p {
    color: #4e5867;
    font-family: Noto Sans KR;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 212.5% */
  }
`;

export default Map;
