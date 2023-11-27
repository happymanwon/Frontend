import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

import { StoreData } from "store-datas";
import useCategoryStore from "../stores/categories";
import useRegionStore from "../stores/location";
import useLikeStore from "../stores/likes";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
  }
}

const StoreDetail = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const { categoryId } = useCategoryStore();
  const { districtId, district } = useRegionStore();
  const districtName = district[districtId];
  const { liked, toggleLike } = useLikeStore();

  const { storeId } = useParams<{ storeId: string }>();
  const [storeData, setStoreData] = useState<StoreData>(null);

  const handleLike = () => {
    toggleLike();
    // 좋아요 카운트  +1 관련 기능은 추후 추가
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "공유할 제목",
          text: "공유할 설명",
          url: window.location.href,
        });
      } else {
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("URL이 클립보드에 복사되었습니다.");
        } catch (err) {
          console.error("URL 복사 중 에러 발생:", err);
        }
      }
    } catch (error) {
      console.error("공유 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/api/stores/${categoryId}`);     // 백엔드랑 통신할 때
        const response = await axios.get(`/data/stores/${categoryId}.json`); // json 파일 사용
        const filterDataById = response.data.filter(
          (data) => data.sh_id === storeId
        );
        setStoreData(filterDataById);
        console.log(filterDataById);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();

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
          const infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">상점</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    };
    searchAddress("서울특별시 중구 세종대로 110 서울특별시청"); // storeData.sh_addr 로 추후에 변경
  }, [storeId, categoryId]);

  // if (!storeData) {
  //   return <p>Loading...</p>;
  // }

  return (
    <LayoutPage>
      <LayoutContainer>
        <StoreHeaderWrapper>
          <div className="left" onClick={() => navigate(-1)}>
            <FontAwesomeIcon className="arrow" icon={faArrowLeft} />
          </div>
          <ImageWrapper>
            {/* 사진 데이터 있을 때 
              <img src={`${data.sh_photo}`} alt={`이미지 ${index}`} /> */}
            <img
              src="https://sftc.seoul.go.kr/mulga/inc/img_view.jsp?filename=20220718174745.jpg"
              alt="이미지"
            />
          </ImageWrapper>
          <NameLikeWrapper>
            <h2>상점이름sh_name</h2>
            <div className="total-like">좋아요00개</div>
          </NameLikeWrapper>
          <div className="district-pride">
            {districtName} | 주메뉴 또는 주력상품 sh_pride
          </div>
        </StoreHeaderWrapper>
        <LikeShare>
          <button className="like" onClick={handleLike}>
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeartRegular}
              id={liked ? "liked" : ""}
            />
            {liked ? "좋아요 취소" : "좋아요"}
          </button>
          <button className="share" onClick={handleShare}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            공유하기
          </button>
        </LikeShare>
        <InfoWrapper>
          <StoreInfo>
            <h3>상점소개</h3>
            <p>sh_info 영업시간, 휴무일, sh_phone전화번호</p>
          </StoreInfo>
          <MenuInfo>
            <h3>메뉴소개</h3>
          </MenuInfo>
          <MapInfo>
            <h3>위치정보</h3>
            <p>sh_way(찾아가는길) sh_addr</p>
            <div
              ref={mapRef}
              id="map"
              style={{ width: "100%", height: "200px" }}
            ></div>
          </MapInfo>
        </InfoWrapper>
      </LayoutContainer>
    </LayoutPage>
  );
};

const LayoutPage = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 100vh;
  position: relative;
  max-width: 26.5rem;
  margin: auto;
  width: 100%;
  overflow: scroll;
  font-family: NotoSansWOFF, sans-serif, Arial;

  @media (min-width: 1024px) {
    left: 50vw;
    margin: 0;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StoreHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLine};
  .left {
    margin-left: 10px;
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.white};
  }

  .district-pride {
    padding: 5px 0 0 15px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grey};
  }
`;
const ImageWrapper = styled.div`
  height: 15rem;
  img {
    width: 26rem;
    height: 100%;
    object-fit: cover;
  }
`;

const NameLikeWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10rem;
  h2 {
    font-size: 20px;
    font-weight: 700;
    padding-left: 15px;
  }

  .total-like {
    font-size: 12px;
    font-weight: 700;
  }
`;

const LikeShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.125rem;
  background-color: ${({ theme }) => theme.colors.white};
  .like {
    border-right: 1px solid ${({ theme }) => theme.colors.greyLine};
    #liked {
      color: ${({ theme }) => theme.colors.mediumGreen};
    }
  }
  button {
    width: 50%;
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
`;

const StoreInfo = styled.div`
  margin: 20px 0;
  height: 8.75rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px 0 10px 10px;
`;

const MenuInfo = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px 0 10px 10px;
`;

const MapInfo = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
  p,
  h3 {
    padding: 10px 0 0 10px;
  }
  #map {
    margin-top: 10px;
  }
`;
export default StoreDetail;
