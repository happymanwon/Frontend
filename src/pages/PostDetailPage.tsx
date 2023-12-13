import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import { PostDataType } from "@/types/community/postDataType";
// import { CommentDataType } from "@/types/community/commentDataType";
import LocationInfo from "@/components/LocationInfo";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImg from "/default-profile.png";
import optionImg from "/option-button.svg";
import useUserStore from "@/stores/useUserStore";
import { getTimeDifference } from "@/utils/getTimeDifference";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useUserStore();

  const { postId } = useParams<{ postId?: string }>(); // 파라미터가 없을 수 있으므로 postId를 옵셔널로 지정
  const [post, setPost] = useState<PostDataType | null>(null);
  const [comment, setComment] = useState(""); // 댓글 내용 상태값
  const [showModal, setShowModal] = useState(false);

  // 작성자와 로그인 사용자를 비교하여 모달 표시
  // const isAuthor = post?.nickname === loggedInUser;

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete(`/api/boards/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("게시물이 삭제되었습니다.");
        navigate("/community");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEditClick = () => {
    // 수정 페이지로 이동하는 동작
    navigate(`/editpost/${postId}`);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // 입력된 댓글 내용을 상태값에 저장
  };

  const handleCommentSubmit = async () => {
    try {
      // 서버로 댓글 내용 보내기
      const response = await axios.post(
        "/api/comments",
        {
          boardId: Number(postId),
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("댓글이 성공적으로 전송되었습니다.", response.data);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("댓글 전송 중 에러:", error);
      console.log(comment);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/boards/${postId}`); // json 파일 사용

        if (postId) {
          const postData = response.data.data;
          setPost(postData);
        }
        console.log(response.data.data.commentList.length);
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
        {/* {isAuthor && ( */}
        <div className="right" onClick={() => setShowModal(!showModal)}>
          <img src={optionImg} alt="option-button" />
        </div>
        {/* )} */}
        {showModal && (
          // 삭제 또는 수정 모달
          <ModalContainer>
            <Button className="edit" onClick={handleEditClick}>
              <span>수정하기</span>
            </Button>
            <Button className="delete" onClick={handleDeleteClick}>
              <span>삭제하기</span>
            </Button>
          </ModalContainer>
        )}
        <TagContainer>
          {post?.hashtagNames.map((tag: string, index: number) => (
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
              <img src={profileImg} className="profile" loading="lazy" />
            </span>
            <span className="writer">{post.nickname}</span>
            <span className="date">{getTimeDifference(post.createAt)}</span>
          </PostHeader>
          <PostWrapper>
            <p className="content">{post.content}</p>
            <div className="img">
              {post.imageUrls.map((imgSrc: string, index: number) => (
                <div key={index}>
                  <img src={imgSrc} className="images" loading="lazy" />
                </div>
              ))}
            </div>
          </PostWrapper>
        </PostContainer>
        {post.roadName && (
          <MapContainer>
            <LocationInfo address={post.roadName} way={""} />
          </MapContainer>
        )}
        <CommentContainer>
          {post.commentList.map((commentData: any, index: number) => (
            <div className="comment" key={index}>
              <img src={profileImg} alt="Profile" loading="lazy" />
              <div className="comment-info">
                <div className="write-info">
                  <span>{commentData.nickname}</span>
                  <div>{getTimeDifference(commentData.createdAt)}</div>
                </div>
                <div>{commentData.content}</div>
              </div>
            </div>
          ))}
        </CommentContainer>
        <WriteCommentWrapper>
          <input
            type="text"
            value={comment}
            placeholder="댓글달기"
            onChange={handleCommentChange}
          />
          <button onClick={handleCommentSubmit}>게시</button>
        </WriteCommentWrapper>
      </BodyContainer>
    </LayoutContainer>
  );
};

// 모달 스타일
const ModalContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 118px;
  height: 70px;
  left: 286px;
  top: 83px;
  background: #ffffff;
  border: 0.5px solid #dadada;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  position: relative;
  text-align: center;
  width: 118px;
  height: 35px;
  left: 0px;
  border: none;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.edit {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

// 페이지 스타일
const LayoutContainer = styled.div`
  width: 100%;
  display: block;
  height: 100vh;
  position: relative;
  max-width: 26.5rem;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
  height: calc(100vh - 6.125rem);
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
  min-height: 12.625rem;
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
    height: 6.8125rem;
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
  margin-bottom: 70px;
  .comment {
    display: flex;
    align-items: center;
    font-size: 8px;
    gap: 10px;
    margin-bottom: 10px;
  }
  .write-info {
    display: flex;
    gap: 5px;
    line-height: 13px;
    span {
      font-family: NotoSansMediumWOFF, sans-serif, Arial;
      font-weight: 700;
    }
  }
  img {
    width: 35px;
    border-radius: 50%;
    border: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  }
`;

const WriteCommentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 26.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 0.5px solid ${({ theme }) => theme.colors.greyUnderLine};
  input {
    border: none;
    margin-left: 24px;
    width: 18.75rem;
    &:focus {
      outline: none;
    }
  }
  button {
    font-family: NotoSansLightWOFF, sans-serif, Arial;
    font-size: 13px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.mainColor};
    cursor: pointer;
    margin-right: 24px;
  }
`;

export default PostDetailPage;
