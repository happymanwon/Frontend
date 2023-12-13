import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import useUserStore from "@/stores/useUserStore";
import { PostDataType } from "@/types/community/postDataType";
import PostList from "@/components/PostList";
import checkImg from "/check.svg";
import newPostImg from "/new-post.svg";
import scrollUpImg from "/top-button.svg";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { nickname } = useUserStore();

  const MoveToTop = () => {
    console.log("MoveToTop function called");
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewPost = () => {
    navigate("/newpost");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/boards");

        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    // boardId를 기준으로 내림차순으로 정렬
    return b.boardId - a.boardId;
  });

  const filteredPosts = showMyPosts
    ? posts.filter((post) => post.nickname === nickname)
    : posts;

  const handleMyPost = (checked: boolean) => {
    setShowMyPosts(checked);
  };

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
          ? filteredPosts.map(
              (post: PostDataType) =>
                post.nickname === nickname && (
                  <PostList key={post.boardId} post={post} />
                )
            )
          : sortedPosts.map((post: PostDataType) => (
              <PostList key={post.boardId} post={post} />
            ))}
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
  // height: calc(100vh - 6.125rem - 4.5rem);
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
