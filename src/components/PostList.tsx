import styled from "styled-components";
import { Link } from "react-router-dom";
import { PostDataType } from "@/types/community/postDataType";
import commentImg from "@/assets/images/comment.svg";

const PostList = ({ post }: { post: PostDataType }) => {
  return (
    <PostLink key={post.id} to={`/post/${post.id}`}>
      {/* 각 게시글을 클릭하면 해당 상세 페이지로 이동 */}
      <PostWrapper>
        <div className="post-top">
          <p className="tag">#{post.tag}</p>
          <p className="content">{post.content}</p>
        </div>
        <div className="img">
          {post.image.map((imgSrc: string, index: number) => (
            <div key={index}>
              <img src={imgSrc} className="images" />
            </div>
          ))}
        </div>
        <div className="store-name">
          <img src="/src/assets/images/map-pin.svg" />#{post.store}
        </div>
        <div className="post-end">
          <div className="write-info">
            <span>
              <img src={post.profilepic} className="profile" />
            </span>
            <span className="writer">{post.writer}</span>
            <span className="write-time">{post.date}</span>
          </div>
          <div className="comment">
            <img src={commentImg} />
            <span>{post.comments.length}개</span>
          </div>
        </div>
      </PostWrapper>
    </PostLink>
  );
};

const PostWrapper = styled.div`
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  width: 22.4375rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  padding: 13px 21px;
  .post-top {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tag {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  .content {
    margin-top: 7px;
    margin-bottom: 15px;
  }
  .profile {
    width: 35px;
    border-radius: 50%;
    border: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  }
  .img {
    display: flex;
    gap: 5px;
  }
  .images {
    border-radius: 8px;
    width: 6.8125rem;
  }
  .store-name {
    font-size: 8px;
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: ${({ theme }) => theme.colors.grey};
  }
  .post-end {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .write-info {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 8px;
    .writer {
      color: ${({ theme }) => theme.colors.mainColor};
      font-weight: 700;
      font-family: NotoSansMediumWOFF, sans-serif, Arial;
    }
    .write-time {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
  .comment {
    display: flex;
    align-items: center;
    font-size: 8px;
    span {
      margin-left: 3px;
    }
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

export default PostList;
