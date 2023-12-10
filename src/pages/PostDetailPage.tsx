import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import { PostDataType } from "@/types/community/postDataType";
import LocationInfo from "@/components/LocationInfo";
import {
  faArrowLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId?: string }>(); // 파라미터가 없을 수 있으므로 postId를 옵셔널로 지정
  const [post, setPost] = useState<PostDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/api/stores/${categoryId}`);     // 백엔드랑 통신할 때
        const response = await axios.get<PostDataType[]>(`/data/fakedata.json`); // json 파일 사용

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
    <LayoutContainer>
      <Header>
        <div className="left" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h2>단짠단짠</h2>
        <div className="right">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <TagContainer>
          {post?.tag.map((tag: string, index: number) => (
            <div className="tag" key={index}>
              {tag}
            </div>
          ))}
        </TagContainer>
      </Header>
      <BodyContainer>
        <PostContainer>
          <PostHeader>
            <span>
              <img src={post.profilepic} className="profile" loading="lazy" />
            </span>
            <span className="writer">{post.writer}</span>
            <span className="date">{post.date}</span>
          </PostHeader>
          <PostWrapper>
            <p className="content">{post.content}</p>
            <div className="img">
              {post.image.map((imgSrc: string, index: number) => (
                <div key={index}>
                  <img src={imgSrc} className="images" loading="lazy" />
                </div>
              ))}
            </div>
          </PostWrapper>
        </PostContainer>
        <MapContainer>
          <LocationInfo
            address={"서울특별시 중구 세종대로 110 서울특별시청"}
            way={"가는길"}
          />
        </MapContainer>
        <CommentContainer>
          {post.comments.map((commentData: any, index: number) => (
            <div className="comment" key={index}>
              <img src={commentData.profilepic} alt="Profile" loading="lazy" />
              <p>{commentData.comment}</p>
            </div>
          ))}
        </CommentContainer>
      </BodyContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100%;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  width: 100%;
  height: 3.9375rem;
  padding-top: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyUnderLine};

  .left {
    position: absolute;
    left: 0;
    margin-left: 15px;
  }
  .right {
    position: absolute;
    right: 0;
    margin-right: 15px;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    font-weight: 700;
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: auto;
  gap: 3px;
  .tag {
    width: 4.5rem;
    height: 1.6875rem;
    border: none;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.greyBackground};
    font-size: 11px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BodyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem - 4.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  gap: 10px;
`;

const PostHeader = styled.header`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: auto;
  font-size: 8px;
  gap: 5px;
  .profile {
    width: 35px;
    border-radius: 50%;
    border: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  }
  .writer {
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
  }
  .date {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const PostWrapper = styled.div`
  width: 22.4375rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 13px 21px;
  font-size: 12px;

  .content {
    margin-top: 7px;
    margin-bottom: 15px;
  }
  .img {
    display: flex;
    gap: 5px;
  }
  .images {
    border-radius: 8px;
    width: 6.8125rem;
    margin-bottom: 5px;
  }
`;

const MapContainer = styled.div`
  margin-top: 14px;
  width: 25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  p {
    padding-left: 10px;
    font-size: 10px;
  }
  h3 {
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    padding: 12px 0 7px 10px;
    font-size: 14px;
    font-weight: 700;
  }
  #map {
    margin-top: 12px;
    b
  }
`;

const CommentContainer = styled.div`
  width: 23.75rem;
  margin-top: 30px;
  margin-bottom: 20px;
  .comment {
    display: flex;
    align-items: center;
    font-size: 8px;
    gap: 10px;
    margin-bottom: 10px;
  }
  img {
    width: 35px;
    border-radius: 50%;
    border: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  }
`;

export default PostDetailPage;
