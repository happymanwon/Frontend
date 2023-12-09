import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MypageProfile = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <MypageHeaderContainer>
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => history.back()} />
        <H2>프로필 수정</H2>
        <span onClick={() => navigate("/mypage")}>완료</span>
      </MypageHeaderContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 6.125rem;
  width: 100%;
`;

const MypageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  & > svg {
    font-size: 1.25rem;
    color: #1a1a1a;
    cursor: pointer;
  }
  & > span {
    color: #1a1a1a;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 33.5px; /* 279.167% */
    cursor: pointer;
  }
`;

const H2 = styled.h2`
  color: #1a1a1a;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 33.5px; /* 209.375% */
`;

export default MypageProfile;
