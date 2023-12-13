import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios";
import * as _ from "lodash";

import useUserStore from "@/stores/useUserStore";
import { PostDataType } from "@/types/community/postDataType";
import { StoreDataType } from "@/types/map/storeDataType";
import PostList from "@/components/PostList";
import checkImg from "@/assets/images/check.svg";
import newPostImg from "@/assets/images/new-post.svg";
import scrollUpImg from "@/assets/images/top-button.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CommunityPage = () => {
  const [showMyPosts, setShowMyPosts] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { nickname } = useUserStore();

  const MoveToTop = () => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewPost = () => {
    navigate("/newpost");
  };

  const fetchData = async () => {
    try {
      const boardList = await axios.get("/api/boards");
      const shopList = await axios.get("/api/shops");

      // a 리스트의 각 요소의 roadAddress를 roadName으로 매핑
      const shopListMapped = shopList.data.data.map((item: StoreDataType) => ({ ...item, roadName: item.roadAddress }));

      // aMapped와 b 사이의 교집합을 찾음, 기준은 roadName
      const intersection = _.intersectionBy(shopListMapped, boardList.data.data, "roadName");
      boardList.data.data.forEach((item: PostDataType) => {
        const bItem = _.find(intersection, { roadName: item.roadName });
        if (bItem && typeof bItem === "object" && "name" in bItem) {
          item.storeName = bItem.name as string;
        }
      });

      return boardList.data.data.sort((a: PostDataType, b: PostDataType) => b.boardId - a.boardId);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const {
    status,
    data: boardDataList,
    error,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: () => fetchData(),
    select: (data) => data,
  });

  const handleMyPost = (checked: boolean) => {
    setShowMyPosts(checked);
  };

  if (status === "pending") return null;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <LayoutContainer ref={ref}>
      <Checkbox>
        <label htmlFor="check-box">
          <input
            type="checkbox"
            id="check-box"
            onChange={(e) => {
              handleMyPost(e.target.checked);
            }}
          />
          내 글보기
        </label>
      </Checkbox>
      <PostContainer>
        {showMyPosts
          ? boardDataList
              .filter((post: PostDataType) => post.nickname === nickname)
              .map((post: PostDataType) => <PostList key={post.boardId} post={post} />)
          : boardDataList.map((post: PostDataType) => <PostList key={post.boardId} post={post} />)}
      </PostContainer>
      <ButtonContainer>
        <button onClick={handleNewPost}>
          <img src={newPostImg} alt="새 글 쓰기" loading="lazy" />
        </button>
        <button onClick={MoveToTop}>
          <img src={scrollUpImg} alt="상단으로 이동" loading="lazy" />
        </button>
      </ButtonContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  background-color: ${({ theme }) => theme.colors.greyBackground};
`;

const Checkbox = styled.div`
  margin: 3px 0 12px 20px;
  font-size: 10px;
  input {
    top: 0.375rem;
    appearance: none; /* 기본 스타일링 제거 */
    width: 13.4px;
    height: 13.4px;
    border-radius: 1.28px;
    position: relative;
    cursor: pointer;
    border: 0.64px solid ${({ theme }) => theme.colors.black};

    &:checked::after {
      content: "";
      position: absolute;
      width: 13.4px;
      height: 13.4px;
      background-image: url(${checkImg});
      background-size: contain;
    }
  }
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  margin: 0 0 4.625rem 22rem;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default CommunityPage;
