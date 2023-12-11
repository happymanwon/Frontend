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
import defaultImg from "@/assets/images/default-store.png";

import { Store } from "@/types/category/store";
import useRegionStore from "../stores/location";
import useLikeStore from "../stores/likes";
import { ShareKakao } from "@/components/ShareKakao";
import LocationInfo from "@/components/LocationInfo";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const { districtId, district } = useRegionStore();
  const districtName = district[districtId];
  const { liked, toggleLike } = useLikeStore();

  const { storeId } = useParams<{ storeId: string }>();
  const [storeData, setStoreData] = useState<Store>();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/shops/${Number(storeId)}`);
        setStoreData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [storeId]);

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

  function createDivsFromString(text) {
    const lines = (text || "").split(/\r?\n/);
    const divs = lines.map((line, index) => {
      const boldText = "영업시간 :";
      const boldIndex = line.indexOf(boldText);
      if (boldIndex !== -1) {
        return (
          <div key={index}>
            <span>{line.substring(0, boldIndex)}</span>
            <span className="strong">
              {line.substring(boldIndex, boldIndex + boldText.length)}
            </span>
            <span>{line.substring(boldIndex + boldText.length)}</span>
          </div>
        );
      } else {
        return <div key={index}>{line}</div>;
      }
    });

    return divs;
  }

  const renderMenuInfo = () => {
    if (storeData && storeData.menuList && storeData.menuList.length > 0) {
      return storeData.menuList.map((menu, index) => (
        <p key={index}>
          <div className="price">
            <div className="price-item">{menu.menuName}</div>
            <div>{menu.menuPrice.toLocaleString()}원</div>
          </div>
        </p>
      ));
    } else {
      return (
        <div>
          <p>현재 제공된 가격 정보가 없습니다.</p>
          <p>자세한 내용은 업체로 전화 문의부탁드립니다.</p>
        </div>
      );
    }
  };

  // 이미지 로드 실패시 대체 이미지로 설정하는 함수
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultImg;
  };

  return (
    <LayoutPage>
      <LayoutContainer>
        <StoreHeaderWrapper>
          <div className="left" onClick={() => navigate(-1)}>
            <FontAwesomeIcon className="arrow" icon={faArrowLeft} />
          </div>
          <ImageWrapper>
            <img
              src={storeData?.imageUrl}
              alt="상점사진"
              onError={handleImageError}
              loading="lazy"
            />
          </ImageWrapper>
          <NameLikeWrapper>
            <h2>{storeData?.name}</h2>
            <div className="total-like">좋아요00개</div>
          </NameLikeWrapper>
          <div className="district-pride">
            {districtName} | {storeData?.menuList[0]?.menuName}
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
            <h3>가게 소개</h3>
            <div className="infoContainer">
              {createDivsFromString(storeData?.info)}
            </div>
          </StoreInfo>
          <MenuInfo>
            <h3>메뉴소개</h3>
            {renderMenuInfo()}
            <div className="notice">
              가격 정보는 업소의 사정에 따라 변경될 수 있습니다.
            </div>
          </MenuInfo>
          <MapInfo>
            <LocationInfo
              address={`${storeData?.address}`}
              way={`${storeData?.way}`}
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
                <img src={linkImg} loading="lazy" />
                <span>링크 복사하기</span>
              </button>
              <div className="underline"></div>
              <button onClick={ShareKakao}>
                <img src={kakaoImg} loading="lazy" />
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
  background-color: ${({ theme }) => theme.colors.greyBackground};
  height: 100vh;
  position: relative;
  max-width: 26.5rem;
  margin: auto;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

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
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
  width: 100%;
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
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameLikeWrapper = styled.div`
  padding: 20px 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .total-like {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const LikeShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
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
  font-size: 12px;
  line-height: 26px;

  h3 {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 700;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
  }
`;

const StoreInfo = styled.div`
  margin: 20px 0;
  padding: 20px 12px 20px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  .strong {
    font-weight: 700;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    margin-right: 10px;
  }
`;

const MenuInfo = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 12px 20px 12px;
  .price {
    display: flex;
  }
  .price-item {
    min-width: 70px;
    font-weight: 700;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
  }
  .notice {
    font-size: 10px;
    color: ${({ theme }) => theme.colors.grey};
    font-weight: 500;
  }
`;

const MapInfo = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
  p {
    padding-left: 12px;
    padding-right: 12px;
    font-size: 12px;
  }
  h3 {
    padding: 20px 12px 0 12px;
    font-size: 15px;
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
