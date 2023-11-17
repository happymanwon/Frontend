import { useParams } from "react-router-dom";
import { dummyData } from "@/components/fakedata";
import styled from "styled-components";
import Nav from "@/components/layout/Nav";

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

const PostDetail = () => {
  const { postId } = useParams<{ postId?: string }>(); // 파라미터가 없을 수 있으므로 postId를 옵셔널로 지정
  const parsedPostId = postId ? parseInt(postId) : undefined; // postId가 있는 경우에만 parseInt 수행

  const post =
    parsedPostId !== undefined
      ? dummyData.find((post: Post) => post.id === parsedPostId)
      : undefined;

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

export default PostDetail;
