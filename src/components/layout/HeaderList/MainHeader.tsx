import React from 'react';
import Geolocation from "@/components/Geolocation";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainHeader = () => {
  return (
    <MainHeaderContainer>
      <Geolocation />
      <InputContainer>
        <input type="text" placeholder="단돈 만원대로 이용 가능한 갓성비 착한 가게를 검색해 보세요!" />
        <IconContainer>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconContainer>
      </InputContainer>
    </MainHeaderContainer>
  );
};

const MainHeaderContainer = styled.div`
  padding: 5px 30px 14px 32px;
`

const InputContainer = styled.div`
  position: relative;
  width: 360px;
  height: 44px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid;

  & input {
    position: absolute;
    width: 314px;
    height: 28px;
    font-size: 12px;
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
`

export default MainHeader;