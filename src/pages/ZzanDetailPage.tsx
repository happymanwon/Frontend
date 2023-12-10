import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import defaultImg from "@/assets/images/default-store.png";
import { ZzanItemType } from "@/types/zzan/zzanItemType";

import LocationInfo from "@/components/LocationInfo";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ZzanDetailPage = () => {
  const navigate = useNavigate();

  const { zzanId } = useParams<{ zzanId: string }>();
  const [zzanData, setZzanData] = useState<ZzanItemType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/zzan-items/${Number(zzanId)}`);
        setZzanData(response.data.data);
        console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [zzanId]);

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
              src={zzanData?.shopInfo.imageUrl}
              alt="상점사진"
              onError={handleImageError}
              loading="lazy"
            />
          </ImageWrapper>
          <NamePriceWrapper>
            <h2>{zzanData?.shopName}</h2>
            <span className="item-name">{zzanData?.itemName}</span>
            <div className="discount-info">
              <div className="original-price">
                ₩{zzanData?.originalPrice.toLocaleString()}
              </div>
              <span className="discount-rate">{zzanData?.discountRate}%</span>
              <span className="sale-price">
                ₩{zzanData?.salePrice.toLocaleString()}
              </span>
            </div>
          </NamePriceWrapper>
        </StoreHeaderWrapper>
        <InfoWrapper>
          <StoreInfo>
            <h3>가게 소개</h3>
            <div>{zzanData?.shopInfo.way}</div>
          </StoreInfo>
          <MenuInfo>
            <h3>가격표</h3>
            <div className="price">
              <div className="price-item">{zzanData?.itemName}</div>
              <div>{zzanData?.originalPrice.toLocaleString()}원</div>
            </div>
            <div className="notice">
              가격 정보는 업소의 사정에 따라 변경될 수 있습니다.
            </div>
          </MenuInfo>
          <MapInfo>
            <LocationInfo
              address={`${zzanData?.shopInfo.roadAddress}`}
              way={`${zzanData?.shopInfo.way}`}
            />
          </MapInfo>
        </InfoWrapper>
        <BuyButtonWrapper>
          <button>구매하기</button>
        </BuyButtonWrapper>
      </LayoutContainer>
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
  width: 100%;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
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

const NamePriceWrapper = styled.div`
  padding: 20px 0 0 12px;
  h2 {
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .item-name {
    color: ${({ theme }) => theme.colors.grey};
    font-weight: 700;
  }

  .discount-info {
    margin-right: 10px;
    text-align: end;

    .original-price {
      font-family: NotoSansLightWOFF, sans-serif, Arial;
      font-size: 15px;
      text-decoration: line-through;
      color: ${({ theme }) => theme.colors.grey};
    }
    .discount-rate {
      font-size: 25px;
      color: ${({ theme }) => theme.colors.mainColor2};
      margin-right: 10px;
    }
    .sale-price {
      font-size: 25px;
    }
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
  margin: 20px 0 70px 0;
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

const BuyButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 26.5rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.mainColor2};
  button {
    font-family: NotoSansLightWOFF, sans-serif, Arial;
    font-size: 18px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;
export default ZzanDetailPage;
