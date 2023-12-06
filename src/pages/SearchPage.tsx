import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { StoreData } from "store-datas";

const SearchPage = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("keyword") || "";
  const [searchResult, setSearchResult] = useState<StoreData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchKeyword?.trim() === "") {
          setSearchResult([]);
          return;
        }
        // const response = await axios.get(`/api/stores`);     // 백엔드랑 통신할 때
        const response = await axios.get(`/data/stores.json`); // json 파일 사용
        const filterDataByKeyword = response.data.filter((data) =>
          data.sh_name.includes(searchKeyword)
        );
        setSearchResult(filterDataByKeyword);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchKeyword]);

  return (
    <SearchContainer>
      <KeywordDesc>{searchKeyword}</KeywordDesc>
      <SearchWrapper>
        {!searchResult || searchResult.length === 0 ? (
          <p>데이터가 없습니다😅</p>
        ) : (
          <ListWrapper>
            {searchResult.map((data, index) => (
              <ListLink key={index} to={`/store/${Number(data.sh_id)}`}>
                <img
                  src="https://sftc.seoul.go.kr/mulga/inc/img_view.jsp?filename=20220718174745.jpg"
                  alt={`이미지 ${index}`}
                />
                <h1>{data.sh_name}</h1>
              </ListLink>
            ))}
          </ListWrapper>
        )}
      </SearchWrapper>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  overflow: scroll;
  font-family: NotoSansWOFF, sans-serif, Arial;
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
