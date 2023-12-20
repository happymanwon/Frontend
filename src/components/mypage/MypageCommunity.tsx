import CommunityPostItem from "@/components/CommunityPostItem";
import styled from "styled-components";

const MypageCommunity = () => {
  return (
    <CommunityContainer>
      <CommunityPostItem />
    </CommunityContainer>
  );
};

const CommunityContainer = styled.div`
  width: calc(100% - 1.5rem);
  height: 100%;
  display: flex;
  flex-direction: column;

  & > span {
    color: #1a1a1a;
    font-feature-settings: "clig" off, "liga" off;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
    letter-spacing: -0.408px;
    margin-left: 12px;
  }
`;

export default MypageCommunity;
