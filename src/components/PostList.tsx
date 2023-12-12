import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PostDataType } from "@/types/community/postDataType";
import commentImg from "@/assets/images/comment.svg";
import profileImg from "@/assets/images/default-profile.png";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import ReportModal from "./ReportModal";

const PostList = ({ post }: { post: PostDataType }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const reportButtonClick = () => {
    setReportModal(true);
  };

  const handleReportClick = async (reportReason) => {
    console.log(reportReason);
    try {
      await axios.post(`/api/reports/${post.boardId}`, {
        postId: post.boardId,
        reportReason: reportReason,
      });
      alert("게시물이 신고되었습니다.");
      navigate("/community");
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };
  const handleHiddenClick = () => {
    // 아직 미구현
  };

  return (
    <div>
      {/* 각 게시글을 클릭하면 해당 상세 페이지로 이동 */}
      <PostWrapper>
        <div className="post-top">
          <div className="tag">
            {post.hashtagNames.map((tag: string) => (
              <span>#{tag}</span>
            ))}
          </div>
          <div className="right" onClick={() => setShowModal(!showModal)}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          {showModal && (
            // 삭제 또는 수정 모달
            <ModalContainer>
              <Button className="edit" onClick={reportButtonClick}>
                <span>신고하기</span>
              </Button>
              <Button className="delete" onClick={handleHiddenClick}>
                <span>글 숨기기</span>
              </Button>
            </ModalContainer>
          )}
          <PostLink key={post.boardId} to={`/post/${post.boardId}`}>
            <p className="content">{post.content}</p>
          </PostLink>
        </div>
        <div className="img">
          {post.imageUrls.map((imgSrc: string) => (
            <div key={imgSrc}>
              <img
                src={`https://kr.object.ncloudstorage.com/happymanwon-backend/${imgSrc}`}
                alt="이미지"
                className="images"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* <div className="store-name">
          <img src="/src/assets/images/map-pin.svg" />#{post.store}
        </div> */}
        <div className="post-end">
          <div className="write-info">
            <span>
              <img
                src={profileImg}
                alt="이미지"
                className="profile"
                loading="lazy"
              />
            </span>
            <span className="writer">{post.nickname}</span>
            <span className="write-time">{post.createdAt}</span>
          </div>
          <div className="comment">
            <img src={commentImg} alt="이미지" loading="lazy" />
            {/* <span>{post.comments.length}개</span> */}
          </div>
        </div>
      </PostWrapper>
      {reportModal && (
        <DarkBackground onClick={() => setReportModal(false)}>
          <ReportModalWrapper onClick={(e) => e.stopPropagation()}>
            <ReportModal
              onCancel={() => setReportModal(false)}
              onReport={handleReportClick}
            />
          </ReportModalWrapper>
        </DarkBackground>
      )}
    </div>
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
  .right {
    position: absolute;
    right: 0;
    margin-right: 30px;
    cursor: pointer;
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
    .profile {
      width: 35px;
      height: 35px;
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

const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경색 */
  z-index: 1000; /* 모달 위로 표시되도록 z-index 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportModalWrapper = styled.div`
  /* 모달 스타일 */
  /* ... */
`;
export default PostList;
