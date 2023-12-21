import CommunityPostItem from "@/components/CommunityPostItem";
import styled from "styled-components";
import axios from "axios";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { PostDataType } from "@/types/community/postDataType";

const MypageCommunity = () => {
  const { accessToken } = useUserStore();
  const [data, setData] = useState<PostDataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/members/boards", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <CommunityContainer>
      {data?.map((post: PostDataType) => (
        <CommunityPostItem key={post.boardId} post={post} />
      ))}
    </CommunityContainer>
  );
};

const CommunityContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 12px;
  box-sizing: border-box;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MypageCommunity;
