import Nav from "@/components/layout/Nav";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  tag: string;
  title: string;
  content: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
}

const tagName: string[] = [
  "기술",
  "여행",
  "요리",
  "패션",
  "운동",
  "영화",
  "건강",
];

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/api/stores/${categoryId}`);     // 백엔드랑 통신할 때
        const response = await axios.get<Post[]>(`/data/fakedata.json`); // json 파일 사용
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutPage>
      <LayoutContainer>
        <InputWrapper>
          <input type="text" placeholder="단짠단짠 글 검색하기" />
          <button type="submit">검색</button>
        </InputWrapper>
        <div>
          {Object.keys(tagName).map((tag) => (
            <button>{tagName[Number(tag)]}</button>
          ))}
        </div>
        <div>
          {posts.map((post: Post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              {/* 각 게시글을 클릭하면 해당 상세 페이지로 이동 */}
              <PostWrapper>
                <p>{post.tag}</p>
                <p>{post.title}</p>
                <p>{post.content}</p>
                <span>{post.date}</span>
                <span>조회수{post.views}</span>
                <span>좋아요{post.likes}</span>
                <span>댓글{post.comments}</span>
              </PostWrapper>
            </Link>
          ))}
        </div>
        <Nav />
      </LayoutContainer>
    </LayoutPage>
  );
};

const InputWrapper = styled.div`
  display: flex;
  width: 26rem;
  margin: 10px;
  input {
    width: calc(100% - 60px);
    border: none;
    border-bottom: 1px solid grey;
  }
  button {
    width: 60px;
    border: none;
  }
`;

const PostWrapper = styled.div`
  border-bottom: 1px solid grey;
`;
const LayoutPage = styled.div`
  display: block;
  background-color: #fff;
  height: 100vh;
  position: relative;
  max-width: 26.5rem;
  margin: auto;

  @media (min-width: 1024px) {
    left: 50vw;
    margin: 0;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CommunityPage;
