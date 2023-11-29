import React, { useEffect, useRef, useState } from "react";
import { useMapToggleStore } from "@stores/mapToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ToggleSpanProps {
  selected: boolean;
  position: "left" | "right";
}

const MapHeader: React.FC = () => {
  const { isMap, setIsMap } = useMapToggleStore();
  const [sortState, setSortState] = useState("평점순");
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 클릭을 감지하여 드롭다운을 닫는 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  // 클릭 이벤트 리스너를 설정하고 정리하는 useEffect
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortDropButton = () => {
    setIsActive(!isActive);
  };

  const handleToggleClick = () => {
    setIsMap();
  };

  return (
    <MapHeaderContainer>
      <MapHeaderSection>
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} />
        <H2>{isMap ? "짠지도" : "짠목록"}</H2>
        <ToggleDiv>
          <ToggleSpan
            onClick={handleToggleClick}
            selected={isMap}
            position="left"
          >
            지도
          </ToggleSpan>
          <ToggleSpan
            onClick={handleToggleClick}
            selected={!isMap}
            position="right"
          >
            목록
          </ToggleSpan>
        </ToggleDiv>
      </MapHeaderSection>
      <MapHeaderSortSection
        ref={dropdownRef}
        style={{ visibility: isMap ? "hidden" : "visible" }}
      >
        <FilterButton>가게 전체</FilterButton>
        <FilterSpan onClick={handleSortDropButton}>{sortState}</FilterSpan>
        {isActive && (
          <ListUl>
            <ListLi
              isActive={sortState === "좋아요순"}
              onClick={() => setSortState("좋아요순")}
            >
              {sortState === "좋아요순" ? <ActiveCircle></ActiveCircle> : null}
              <span>좋아요순</span>
            </ListLi>
            <ListLi
              isActive={sortState === "평점순"}
              onClick={() => setSortState("평점순")}
            >
              {sortState === "평점순" ? <ActiveCircle></ActiveCircle> : null}
              <span>평점순</span>
            </ListLi>
          </ListUl>
        )}
      </MapHeaderSortSection>
    </MapHeaderContainer>
  );
};

const MapHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 23px;
  border-bottom: 1px solid #4e5867;

  font-family: Noto Sans;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #000;
`;

const MapHeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  position: relative;

  & svg {
    width: 0.9375rem;
    height: 0.9375rem;
  }
`;

const H2 = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: 700;
  line-height: 2.09375rem;
`;

const ToggleDiv = styled.div`
  display: flex;
  border-radius: 6px;
  border: 0.5px solid #dadada;
  width: 100px;
  height: 30px;
  &:first-child {
    border-right: 0.5px solid #dadada;
  }
`;

const ToggleSpan = styled.span<ToggleSpanProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 12px;
  background-color: ${(props) => (props.selected ? "#DADADA" : "transparent")};
  color: ${(props) => (props.selected ? "#4E5867" : "#DADADA")};
  border-radius: ${(props) =>
    props.selected && props.position === "left"
      ? "6px 0 0 6px"
      : props.selected && props.position === "right"
      ? "0 6px 6px 0"
      : "0"};
  cursor: pointer;
`;

const MapHeaderSortSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 1.125rem;
  gap: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d2d5d9;
  background-color: #fff;

  letter-spacing: -0.0173rem;
  margin-bottom: 0.6875rem;
`;

const FilterSpan = styled.span`
  letter-spacing: -0.0173rem;
  cursor: pointer;
`;

const ListUl = styled.ul`
  position: absolute;
  right: 0;
  top: 2.1875rem;
  width: 7.5rem;
  height: 4.375rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

interface ListLiProps {
  isActive: boolean;
}
const ListLi = styled.li<ListLiProps>`
  height: 2.1875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) => (props.isActive ? "#f8f8f8" : "#fff")};
  letter-spacing: -0.01725rem;
  cursor: pointer;

  &:first-child {
    border-bottom: 1px solid #f8f8f8;
  }

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ActiveCircle = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  border: 1px solid #00bf18;
  border-radius: 50%;
  background-color: #00bf18;
  position: absolute;
  left: 0.9375rem;
`;

export default MapHeader;
