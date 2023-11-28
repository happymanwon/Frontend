import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/Category";
import bigLogoImg from "@/assets/images/big-logo.svg";
import subtitleImg from "@/assets/images/subtitle.svg";

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
          <img className="biglogo" src={bigLogoImg} alt="큰 로고이미지" />
          <img className="subtitle" src={subtitleImg} alt="소개문구" />
        </LogoWrapper>
        <InputContainer>
          <input
            type="text"
            placeholder="검색"
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
  font-family: NotoSansWOFF, sans-serif, Arial;

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
  max-width: 25rem;
  width: 100%;
  padding: 5rem 0rem 2rem;
  gap: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  .biglogo {
    width: 261px;
    height: 294px;
  }
  .subtitle {
    width: 400px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 400px;
  height: 55px;
  border-radius: 10px;
  background: #fff;

  & input {
    position: absolute;
    width: 370px;
    height: 50px;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 0px 15px 0px 20px;
    caret-color: #000;
    background: transparent;
    border-radius: 42px;
    border: 1px solid #2ab673;
    z-index: 5;
  }

  & input:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 50px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 6;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 370px;
  button {
    height: 28px;
    padding: 0 20px;
    margin: 5px;
    border: none;
    background: #2ab673;
    border-radius: 42px;
    color: #ffffff;
    font-size: 16px;
  }
`;

export default SearchElement;
