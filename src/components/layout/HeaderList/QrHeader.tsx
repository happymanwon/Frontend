import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const QrHeader = () => {
  return (
    <MypageHeaderContainer>
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => history.back()} />
      <H2>QR 코드</H2>
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
    content: "";
    width: 10px;
  }
  & > svg {
    font-size: 1.25rem;
    color: #1a1a1a;
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

export default QrHeader;
