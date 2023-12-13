import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/Category";
import bigLogoImg from "/big-logo.svg";
import titleImg from "/manwon-title.svg";

const SearchElement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    navigate(`/search?keyword=${encodeURIComponent(search)}`);
  };

  return (
    <SearchPage>
      <SearchMain>
        <LogoWrapper>
          <img
            className="biglogo"
            src={bigLogoImg}
            alt="큰 로고이미지"
            loading="lazy"
          />
          <div>
            <span className="normal-font">
              한 푼이라도 아쉬운 사람들을 위한
            </span>
            <span className="bold-font">만원의 행복 서비스</span>
          </div>
          <img
            className="title"
            src={titleImg}
            alt="만원의행복"
            loading="lazy"
          />
        </LogoWrapper>
        <InputContainer>
          <input
            type="text"
            placeholder="단돈 만원대로 이용 가능한 갓성비 착한 가게를 찾아보세요!"
            value={search}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
          />
          <IconContainer onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconContainer>
        </InputContainer>
        <CategoryWrapper>
          <Category />
        </CategoryWrapper>
      </SearchMain>
    </SearchPage>
  );
};

const SearchPage = styled.div`
  position: fixed;
  height: 100%;
  width: 32rem;
  left: calc(50vw - 32rem);
  display: none;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;

  @media (min-width: 1024px) {
    margin-left: 2rem;
    display: block;
  }
`;

const SearchMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  max-width: 25rem;
  width: 100%;
  height: 100vh;
  padding: 1rem 0rem 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .biglogo {
    width: 26.25rem;
  }
  .title {
    margin-top: 10px;
    width: 16.375rem;
  }
  div {
    width: 30rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.mainColor};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: ${({ theme }) => theme.colors.white};
      font-size: 20px;
    }
    .normal-font {
      font-family: NotoSansLightWOFF, sans-serif, Arial;
      margin-right: 7px;
    }
    .bold-font {
      font-weight: 700;
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 27rem;
  height: 3.4375rem;
  margin-top: 10px;

  & input {
    position: absolute;
    width: 23rem;
    height: 3.125rem;
    font-size: 14px;
    padding: 0px 40px 0px 19px;
    caret-color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 42px;
    border: 3px solid ${({ theme }) => theme.colors.mainColor};
    z-index: 5;
  }

  & input:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: -2px;
  width: 3.125rem;
  height: 3.4375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 6;

  svg {
    color: #59d37d;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  button {
    height: 28px;
    padding: 0 20px;
    margin: 5px;
    border: none;
    background: ${({ theme }) => theme.colors.mainColor2};
    border-radius: 42px;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  #category-button-7 {
    background: ${({ theme }) => theme.colors.grey};
  }
`;

export default SearchElement;
