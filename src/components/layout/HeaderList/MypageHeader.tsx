import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface PageTitleType {
  [key: string]: string;
}

const pageTitle: PageTitleType = {
  pay: "충전 및 사용 내역",
  zzan: "짠처리 결제 관리",
  community: "커뮤니티 글 관리",
  setting: "설정",
};

const MypageHeader = () => {
  const [params] = useSearchParams();
  const pageName = params.get("page");

  return (
    <MypageHeaderContainer isPageName={pageName !== null}>
      {pageName && (
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => history.back()} />
      )}
      <H2>{pageTitle[pageName as keyof PageTitleType] || "마이페이지"}</H2>
    </MypageHeaderContainer>
  );
};

interface MypageHeaderContainerPropsType {
  isPageName: boolean;
}

const MypageHeaderContainer = styled.div<MypageHeaderContainerPropsType>`
  display: flex;
  justify-content: ${(props) =>
    props.isPageName ? "space-between" : "center"};
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

export default MypageHeader;
