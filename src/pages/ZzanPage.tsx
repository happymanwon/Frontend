import { ZzanItemType } from "@/types/zzan/zzanItemType";
import defaultImg from "@/assets/images/default-store.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import useRegionStore from "@/stores/location";

const ZzanPage = () => {
  const [zzanData, setZzanData] = useState<ZzanItemType[] | null>(null);
  const { districtId } = useRegionStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/zzan-items?categoryId=1&localCode=${districtId}`); // json 파일 사용
        setZzanData(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [districtId]);

  // 이미지 로드 실패시 대체 이미지로 설정하는 함수
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  return (
    <ZzanContainer>
      {!zzanData || zzanData.length === 0 ? (
        <p>데이터가 없습니다😅</p>
      ) : (
        <ListWrapper>
          {zzanData.map((data, index) => {
            return (
              <ListLink key={index} to={`/zzan-items/${data.zzanItemId}`}>
                <img src={data.imageUrl} alt={`이미지 ${index}`} onError={handleImageError} loading="lazy" />
                <h1>{data.shopName}</h1>
                <span>{data.itemName}</span>
              </ListLink>
            );
          })}
        </ListWrapper>
      )}
    </ZzanContainer>
  );
};

const ZzanContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  background-color: ${({ theme }) => theme.colors.greyBackground};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  p {
    margin: 20px 0 0 20px;
    font-weight: 400;
    font-size: 14px;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
const ListLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 23.125rem;
  height: 14.375rem;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px 0px #00000040;
  font-family: "NotoSansMediumWOFF";
  cursor: pointer;

  img {
    width: 23.125rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 10.4375rem;
  }
  h1 {
    margin: 12px 0 3px 14px;
    font-size: 15px;
    font-family: "NotoSansMediumWOFF";
  }
  span {
    margin-left: 14px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.mainColor};
    font-family: "NotoSansMediumWOFF";
  }
`;

export default ZzanPage;
