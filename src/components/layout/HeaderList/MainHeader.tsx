import React from "react";
import Geolocation from "@/components/Geolocation";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainHeader = () => {
  return (
    <MainHeaderContainer>
      <DistrictWrapper>
        <Geolocation />
      </DistrictWrapper>
      <InputContainer>
        <input
          type="text"
          placeholder="단돈 만원대로 이용 가능한 착한 가게를 검색해 보세요!"
        />
        <IconContainer>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconContainer>
      </InputContainer>
    </MainHeaderContainer>
  );
};

const MainHeaderContainer = styled.div`
  background: #aab2b5;
  padding: 13px 0 17px 30px;
  height: 68px;
`;

const DistrictWrapper = styled.div`
  select {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.grey};
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
