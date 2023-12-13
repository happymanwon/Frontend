import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PostDataType } from "@/types/community/postDataType";
import commentImg from "/comment.svg";
import profileImg from "/default-profile.png";
import { useRef, useState } from "react";
import axios from "axios";
import ReportModal from "./ReportModal";
import useUserStore from "@/stores/useUserStore";
import { getTimeDifference } from "@utils/getTimeDifference";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const PostList = ({ post }: { post: PostDataType }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const { accessToken } = useUserStore();

  const handleTagClick = (tagName: string) => {
    navigate(`/search-post/${tagName}`);
  };

  const reportButtonClick = () => {
    setReportModal(true);
  };

  const imgListRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX - (imgListRef.current?.offsetLeft ?? 0));
    setScrollLeft(imgListRef.current?.scrollLeft ?? 0);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    const x = clientX - (imgListRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1; // 스크롤 속도 조절
    imgListRef.current!.scrollLeft = scrollLeft - walk;
  };

  // 신고 기능
  const handleReportClick = async (reportReason) => {
    console.log(reportReason);
    try {
      await axios.post(
        `/api/reports/${post.boardId}`,
        {
          postId: post.boardId,
          reportReason: reportReason,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("게시물이 신고되었습니다.");
      // navigate("/community");
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  // // 숨기기 기능
  // const handleHiddenClick = () => {
  //   // 아직 미구현
  // };

  return (
    <>
      {/* 각 게시글을 클릭하면 해당 상세 페이지로 이동 */}
      <PostItemContainer onClick={() => navigate(`/post/${post.boardId}`)}>
        <TopArea>
          <div className="tag">
            {post.hashtagNames.map((tag: string, id: number) => (
              <button
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagClick(tag);
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={(e) => {
              e.stopPropagation();
              setIsClicked(!isClicked);
            }}
          />
          {isClicked && (
            <ButtonList>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reportButtonClick();
                }}
              >
                신고하기
              </button>
              <button>글 숨기기</button>
            </ButtonList>
          )}
        </TopArea>
        <MiddleArea>
          <p>{post.content}</p>
          <div
            className="imgList"
            ref={imgListRef}
            onMouseDown={(e) => startDragging(e.clientX)}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onTouchStart={(e) => startDragging(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          >
            {post.imageUrls.map((image: string, index: number) => (
              <img key={index} src={image} alt="" />
            ))}
          </div>
          <div className="location-text">
            <img src="/map-pin.svg" alt="pin" />
            <span>{post.storeName}</span>
          </div>
        </MiddleArea>
        <BottomArea>
          <div>
            <img src={profileImg} alt="이미지" className="profile" loading="lazy" />
            <span className="writer">{post.nickname}</span>
            <span>·</span>
            <span className="write-time">{getTimeDifference(post.createAt)}</span>
          </div>
          <div>
            <img src={commentImg} alt="이미지" loading="lazy" />
            {/* <span>{post.commentList.length}개</span> */}
          </div>
        </BottomArea>
      </PostItemContainer>

      {reportModal && (
        <DarkBackground
          onClick={(e) => {
            e.stopPropagation();
            setReportModal(false);
          }}
        >
          <ReportModalWrapper onClick={(e) => e.stopPropagation()}>
            <ReportModal onCancel={() => setReportModal(false)} onReport={handleReportClick} />
          </ReportModalWrapper>
        </DarkBackground>
      )}
    </>
  );
};

const PostItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.8125rem 0 0.8125rem 1.3125rem;
  border: 1px solid #dadada;
  border-radius: 12px;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #2ab673;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 25.5px; /* 150% */
  position: relative;

  & > svg {
    position: relative;
    width: 15px;
    height: 15px;
    padding: 5px;
    color: #888;
    margin-right: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
  }

  & > .tag {
    button {
      border: none;
      background: none;
      color: ${({ theme }) => theme.colors.mainColor};
      font-size: 12px;
      cursor: pointer;
      padding: 0 4px 0 0;
    }
  }
`;

const ButtonList = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 118px;
  height: 70px;
  border: 0.5px solid #dadada;
  background: #fff;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;

  & > button {
    width: 100%;
    height: 50%;
    border: none;
    background-color: #fff;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 25.5px; /* 150% */
    cursor: pointer;
  }
  & > button:hover {
    background-color: #f2f4f6;
  }
`;

const MiddleArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  & > p {
    margin-bottom: 1rem;
    color: #1a1a1a;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17.5px; /* 145.833% */
    padding-right: 30px;
  }
  & > .imgList {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: scroll;
    margin-bottom: 7px;
    cursor: grab; /* 마우스 커서 변경 */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > .imgList > img {
    width: 6.875rem;
    height: 6.875rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    object-fit: cover;
    flex-shrink: 0; /* 이미지가 줄어들지 않도록 설정 */
  }

  & > .location-text {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: 0.8125rem;
  }

  & > .location-text > span {
    color: #888;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 8.182px;
    font-style: normal;
    font-weight: 400;
    line-height: 20.864px; /* 255% */
  }
`;

const BottomArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-family: NotoSansMediumWOFF;
  font-size: 7.256px;
  font-style: normal;
  font-weight: 400;
  line-height: 129.3%;
  padding-right: 22px;

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 2px;

    & > img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 0.5px solid #dadada;
      margin-right: 5px;
    }

    & > .writer {
      color: #2ab673;
      font-family: NotoSansMediumWOFF;
      font-weight: 700;
    }
  }
  & > div:nth-child(2) {
    color: var(--Primary-Black, var(--Primary-Black, #1a1a1a));
    font-family: NotoSansMediumWOFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px; /* 150% */
  }
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
