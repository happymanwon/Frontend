import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { StoreData } from "@/types/category/storeData";
import DefaultImg from "/default-store-img.svg?react";

const SearchPage = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("keyword") || "";
  const [searchResult, setSearchResult] = useState<StoreData[] | null>(null);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchKeyword?.trim() === "") {
          setSearchResult([]);
          return;
        }
        // const response = await axios.get(`/api/stores`);     // 백엔드랑 통신할 때
        const response = await axios.get("/api/shops"); // json 파일 사용
        const filterDataByKeyword = response.data.data.filter(
          (data: StoreData) => data.name.includes(searchKeyword)
        );
        setSearchResult(filterDataByKeyword);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchKeyword]);

  // 이미지 로드 실패시 대체 이미지로 설정하는 함수
  const handleImageError = (id: string) => () => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <SearchContainer>
      <KeywordDesc>{searchKeyword}</KeywordDesc>
      <SearchWrapper>
        {!searchResult || searchResult.length === 0 ? (
          <p>데이터가 없습니다😅</p>
        ) : (
          <ListWrapper>
            {searchResult.map((data, index) => {
              const isError = imageError[data.id];
              return (
                <ListLink key={index} to={`/store/${data.id}`}>
                  {isError ? (
                    <DefaultImg />
                  ) : (
                    <img
                      src={data.imageUrl}
                      alt={`이미지 ${index}`}
                      onError={handleImageError(String(data.id))}
                      loading="lazy"
                    />
                  )}
                  <h1>{data.name}</h1>
                </ListLink>
              );
            })}
          </ListWrapper>
        )}
      </SearchWrapper>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  // height: calc(100vh - 6.125rem - 4.5rem);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
`;

const KeywordDesc = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
`;

const SearchWrapper = styled.div`
  margin: 10px 0px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ListLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 11.3rem;
  height: 13rem;
  img {
    width: 11.3rem;
    height: 11.3rem;
    border-radius: 10px;
  }
  h1 {
    margin-top: 5px;
    font-size: 16px;
  }
`;

export default SearchPage;
