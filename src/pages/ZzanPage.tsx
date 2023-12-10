import { ZzanItemType } from "@/types/zzan/zzanItemType";
import DefaultImg from "@/assets/images/default-store-img.svg?react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const ZzanPage = () => {
  const [zzanData, setZzanData] = useState<ZzanItemType[] | null>(null);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/zzan-items`); // json 파일 사용
        setZzanData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, []);

  // 이미지 로드 실패시 대체 이미지로 설정하는 함수
  const handleImageError = (id: string) => () => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <ZzanContainer>
      {!zzanData || zzanData.length === 0 ? (
        <p>데이터가 없습니다😅</p>
      ) : (
        <ListWrapper>
          {zzanData.map((data, index) => {
            const isError = imageError[data.zzanItemId];
            return (
              <ListLink key={index} to={`/zzan-items/${data.zzanItemId}`}>
                {isError ? (
                  <DefaultImg />
                ) : (
                  <img src={data.imageUrl} alt={`이미지 ${index}`} onError={handleImageError(String(data.zzanItemId))} loading="lazy" />
                )}
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
  font-family: NotoSansMediumWOFF, sans-serif, Arial;
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
  }
  span {
    margin-left: 14px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

export default ZzanPage;
