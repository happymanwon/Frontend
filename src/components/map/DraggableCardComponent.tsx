import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { StoreDataType } from "@/types/map/storeDataType";

const DraggableCardComponent: React.FC<{ storeData: StoreDataType[] }> = ({
  storeData,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState<number>(0);
  const [currentTop, setCurrentTop] = useState<string>("75%");

  const handleDragStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      setIsDragging(true);
      setStartY(
        e.type.startsWith("touch")
          ? (e as React.TouchEvent).touches[0].clientY
          : (e as React.MouseEvent).clientY
      );
    },
    []
  );

  const handleDragMove = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!isDragging) return;
      const clientY = e.type.startsWith("touch")
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY;
      const diffY = clientY - startY;
      setCurrentTop((prevTop) => {
        const prevTopValue = parseInt(prevTop.replace("%", ""), 10);
        const newTop = prevTopValue + (diffY / window.innerHeight) * 100;
        return `${Math.max(0, Math.min(75, newTop))}%`;
      });
      setStartY(clientY);
    },
    [isDragging, startY]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    setCurrentTop(currentTop === "75%" ? "0%" : "75%");
  };

  return (
    <DraggableCardContainer
      style={{ top: currentTop }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onClick={handleClick} // PC에서의 클릭 이벤트 핸들러
    >
      {storeData.map((store, index) => (
        <CardContainer key={index}>
          <img src={store.imageUrl} alt={store.name} loading="lazy" />
          <CardInfo>
            <h3>{store.name}</h3>
            <p>좋아요 25개</p>
          </CardInfo>
        </CardContainer>
      ))}
    </DraggableCardContainer>
  );
};

const DraggableCardContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 75%; // 초기에는 화면의 75% 지점에서 시작하도록 설정
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: top 0.3s; // 부드러운 애니메이션 효과
  padding: 0 1.75rem;
  overflow: auto;
  z-index: 10; // Map 위에 보이도록 z-index 설정
  touch-action: none; // 브라우저의 기본 터치 액션을 비활성화

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  // 드래그 핸들
  .drag-handle {
    width: 100%;
    height: 4rem;
    background: #ccc;
    border-radius: 8px 8px 0 0;
    touch-action: none; // 브라우저의 기본 터치 액션을 비활성화
    /* 드래그 핸들 스타일링 */
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 23rem;
  height: 14.375rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 1.0625rem 0;

  & img {
    height: 71%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 29%;
  margin: 0.5rem 0.875rem;

  & h3 {
    color: #000;
    font-family: Noto Sans KR;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 170% */
  }

  & p {
    color: #4e5867;
    font-family: Noto Sans KR;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 212.5% */
  }
`;

export default DraggableCardComponent;
