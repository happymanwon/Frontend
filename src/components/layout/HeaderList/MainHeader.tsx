import Geolocation from "@/components/Geolocation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainHeader = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState(""); //한글자씩 반영되는 부분을 보완하는 상태값

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
    <MainHeaderContainer>
      <DistrictWrapper>
        <Geolocation />
      </DistrictWrapper>
      <InputContainer>
        <input
          type="text"
          placeholder="단돈 만원대로 이용 가능한 착한 가게를 검색해 보세요!"
          value={search}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <IconContainer onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconContainer>
      </InputContainer>
    </MainHeaderContainer>
  );
};

const MainHeaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.greyLine};
  padding: 13px 0 17px 30px;
  height: 68px;
`;

const DistrictWrapper = styled.div`
  select {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.greyLine};
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 360px;
  height: 44px;
  border-radius: 6px;
  background: #fff;
  border: none;
  margin-top: 7px;

  & input {
    position: absolute;
    width: 314px;
    height: 28px;
    font-size: 14px;
    padding: 8px 38px 8px 8px;
    caret-color: #000;
    background: transparent;
    border: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 38px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default MainHeader;
