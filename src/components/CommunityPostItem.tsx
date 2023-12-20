import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserStore from "@/stores/useUserStore";
import { PostDataType } from "@/types/community/postDataType";
import styled from "styled-components";
import mapPin from "/map-pin.svg";

// const items = [
//   {
//     id: 1,
//     tag: ["맛집", "일상"],
//     content:
//       "가보고 싶었던 곳인데! \n블로그 시작하면서 카페에서 찍은 예쁜 사진들로 스타츠하고 싶어요.",
//     images: [
//       "/data/fakeimg/sushi.jpg",
//       "/data/fakeimg/toast.png",
//       "/data/fakeimg/hamburger.jpg",
//       "/data/fakeimg/steak.jpg",
//     ],
//     location: "#파스타앤피자",
//   },
// ];

const CommunityPostItem = () => {
  const [params] = useSearchParams();
  const { accessToken } = useUserStore();

  const pageName = params.get("page") || null;
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<PostDataType[] | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/members/posts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data.data);
        console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <PostItemContainer>
      {data?.map((item, index) => (
        <div key={index}>
          <TopArea>
            <div>{item.hashtagNames.map((tag: string) => `#${tag} `)}</div>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              onClick={() => setIsClicked(!isClicked)}
            />
            {isClicked && (
              <ButtonList>
                <button>수정하기</button>
                <button>삭제하기</button>
              </ButtonList>
            )}
          </TopArea>
          <MiddleArea>
            <pre>{item.content}</pre>
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
              {item.imageUrls.map((image: string, index: number) => (
                <img key={index} src={image} alt="" />
              ))}
            </div>
            <div className="location-text">
              <img src={mapPin} alt="pin" />
              <span>{item.storeName}</span>
            </div>
          </MiddleArea>
          {pageName === "community" || (
            <BottomArea>
              <div>2021.10.10</div>
              <div>댓글 3개</div>
            </BottomArea>
          )}
        </div>
      ))}
    </PostItemContainer>
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
    width: 10px;
    color: #888;
    margin-right: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
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
  & > pre {
    margin-bottom: 1rem;
    color: #1a1a1a;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17.5px; /* 145.833% */
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    color: var(--Gray_3, #888);
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
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

export default CommunityPostItem;
