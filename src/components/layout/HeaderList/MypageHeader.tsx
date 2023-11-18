import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";


const MypageHeader = () => {
  return (
    <MypageHeaderContainer>
      <FontAwesomeIcon icon={faArrowLeft} />
      <h2>마이페이지</h2>
    </MypageHeaderContainer>
  );
};

const MypageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  &::after {
    content: '';
    width: 10px;
  }
`;

export default MypageHeader;