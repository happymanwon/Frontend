import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "@/components/layout/Nav";
import { useEffect, useState } from "react";
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

const PostDetailPage = () => {
  const { postId } = useParams<{ postId?: string }>(); // 파라미터가 없을 수 있으므로 postId를 옵셔널로 지정
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/api/stores/${categoryId}`);     // 백엔드랑 통신할 때
        const response = await axios.get<Post[]>(`/data/fakedata.json`); // json 파일 사용

        if (postId) {
          const postData = response.data.filter(
            (item) => item.id === parseInt(postId, 10)
          )[0];
          postData ? setPost(postData) : setPost(null);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <LayoutPage>
      <LayoutContainer>
        게시글 상세페이지
        <h1>{post.title}</h1>
        <div>
          <div>태그 {post.tag}</div>
          <div>내용 {post.content}</div>
          <div>작성일 {post.date}</div>
          <div>조회수 {post.views}</div>
          <div>좋아요 {post.likes}</div>
          <div>댓글 {post.comments}</div>
        </div>
        <Nav />
      </LayoutContainer>
    </LayoutPage>
  );
};

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

export default PostDetailPage;
