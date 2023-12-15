import { useState } from "react";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { styled } from "styled-components";
import axios from "axios";
import profileImg from "/default-profile.png";

const CommentList = ({ comments }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");

  const handleInitialCommentData = (commentId) => {
    const initialComment = comments.find(
      (comment) => comment.commentId === commentId
    );
    if (initialComment) {
      setUpdatedComment(initialComment.content);
    }
  };

  const handleCommentUpdate = (e) => {
    setUpdatedComment(e.target.value); // 입력된 댓글 내용을 상태값에 저장
  };

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
    handleInitialCommentData(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  // 댓글 수정 삭제
  const handleEditComment = async (commentId, updatedContent) => {
    try {
      // 수정된 내용을 서버로 전송하여 업데이트
      const response = await axios.patch(
        `/api/comments/${commentId}`,
        {
          content: updatedContent,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );
      console.log("댓글이 성공적으로 수정되었습니다.", response.data);
      window.location.reload(); // 댓글 수정 후 페이지 새로고침 또는 다시 로드
    } catch (error) {
      // 수정 중 에러가 발생한 경우 처리
      console.error("댓글 수정 중 에러:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete(`/api/comments/${commentId}`, {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
        });
        alert("댓글이 삭제되었습니다.");
        // 댓글 삭제 후 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <CommentContainer>
      {comments?.map((commentData) => (
        <div className="comment" key={commentData.commentId}>
          <img src={profileImg} alt="Profile" loading="lazy" />
          <div className="comment-info">
            <div className="write-info">
              <span>{commentData.nickname}</span>
              <div>{getTimeDifference(commentData.createdAt)}</div>
            </div>
            {editingCommentId === commentData.commentId ? (
              <EditMode>
                <input value={updatedComment} onChange={handleCommentUpdate} />
                <ButtonWrapper>
                  <button
                    onClick={() =>
                      handleEditComment(commentData.commentId, updatedComment)
                    }
                  >
                    수정
                  </button>
                  <button onClick={() => handleCancelEdit()}>취소</button>
                </ButtonWrapper>
              </EditMode>
            ) : (
              <ViewMode>
                <div>{commentData.content}</div>
                <ButtonWrapper>
                  <button
                    onClick={() => handleEditClick(commentData.commentId)}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteComment(commentData.commentId)}
                  >
                    삭제
                  </button>
                </ButtonWrapper>
              </ViewMode>
            )}
          </div>
        </div>
      ))}
    </CommentContainer>
  );
};

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

const EditMode = styled.div`
  display: flex;
  align-items: center;
  width: 20.625rem;
  justify-content: space-between;
  & input {
    font-size: 8px;
    width: 70%;
  }
`;
const ViewMode = styled.div`
  display: flex;
  align-items: center;
  width: 20.625rem;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  & button {
    font-size: 8px;
    color: ${({ theme }) => theme.colors.mainColor};
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default CommentList;
