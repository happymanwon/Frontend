import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faX,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import styled, { keyframes } from "styled-components";
import linkImg from "@/assets/images/link-share.svg";
import kakaoImg from "@/assets/images/kakao-share.svg";

import { StoreData } from "store-datas";
import useCategoryStore from "../stores/categories";
import useRegionStore from "../stores/location";
import useLikeStore from "../stores/likes";
import { shareKakao } from "@/utils/shareKakao";
import LocationInfo from "@/components/LocationInfo";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useCategoryStore();
  const { districtId, district } = useRegionStore();
  const districtName = district[districtId];
  const { liked, toggleLike } = useLikeStore();

  const { storeId } = useParams<{ storeId: string }>();
  const [storeData, setStoreData] = useState<StoreData>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleShareClick = () => {
    setBottomSheetVisible(true);
  };

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
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();
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
          <button className="share" onClick={handleShareClick}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            공유
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
            <LocationInfo
              address={"서울특별시 중구 세종대로 110 서울특별시청"}
            />
          </MapInfo>
        </InfoWrapper>
      </LayoutContainer>
      {bottomSheetVisible && (
        <>
          <Overlay />
          <BottomSheet>
            <div className="sheet-header">
              <span>가게 공유</span>
              <button onClick={() => setBottomSheetVisible(false)}>
                <FontAwesomeIcon className="cancel" icon={faX} />
              </button>
            </div>
            <div className="share-buttons">
              <button onClick={handleShare}>
                <img src={linkImg} />
                <span>링크 복사하기</span>
              </button>
              <div className="underline"></div>
              <button onClick={shareKakao}>
                <img src={kakaoImg} />
                <span>카카오톡 공유하기</span>
              </button>
            </div>
          </BottomSheet>
        </>
      )}
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
    margin-top: 35px;
    margin-left: 15px;
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
    font-weight: 500;
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
      color: ${({ theme }) => theme.colors.mainColor};
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
  p {
    padding-left: 10px;
    font-size: 12px;
  }
  h3 {
    padding: 10px 0 0 10px;
    font-size: 14px;
    font-weight: 700;
  }
  #map {
    margin-top: 10px;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  width: 26.5rem;
  height: 14.25rem;
  background-color: #fff;
  animation: ${slideUp} 0.3s ease-out; /* 애니메이션 효과 적용 */
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
  z-index: 7;
  font-weight: 500;
  .sheet-header {
    display: flex;
    justify-content: space-between;
    margin: 1.25rem 1rem 2rem 11rem;
    .cancel {
      height: 17px;
    }
  }

  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
  .underline {
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  }
  .share-buttons {
    margin: 0 28px 20px 28px;
    img {
      margin-right: 10px;
    }
    button {
      height: 70px;
      font-size: 15px;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 26.5rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 6;
  pointer-events: auto;
`;

export default StoreDetailPage;
