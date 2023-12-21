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
  height: calc(100vh - 6.125rem - 4.5rem);
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MypageCommunity;
