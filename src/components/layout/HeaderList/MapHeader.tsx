import React, { useState } from "react";
import { useMapToggleStore } from "@stores/mapToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface ToggleSpanProps {
  selected: boolean;
  position: "left" | "right";
}

const MapHeader: React.FC = () => {
  const { isMap, setIsMap } = useMapToggleStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const isDetail = location.pathname.includes("/map/detail");

  // 지도순, 정확도순 정렬 버튼
  // const [sortState, setSortState] = useState("평점순");
  // const [isActive, setIsActive] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // 검색
  const mapSearch = () => {
    if (search !== "") {
      navigate(`/map/detail?search=${encodeURIComponent(search)}`);
    }
  };

  // 외부 클릭을 감지하여 드롭다운을 닫는 함수
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setIsActive(false);
  //   }
  // };

  // 클릭 이벤트 리스너를 설정하고 정리하는 useEffect
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleSortDropButton = () => {
  //   setIsActive(!isActive);
  // };

  const handleToggleClick = () => {
    setIsMap();
  };

  return (
    <MapHeaderContainer>
      <MapHeaderSection>
        {!isDetail ? (
          <>
            <H2>짠지도</H2>
            <SearchInputField>
              <SearchInput
                placeholder="오늘은 어디로 갈까요?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    mapSearch();
                  }
                }}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={mapSearch} />
            </SearchInputField>
          </>
        ) : (
          <>
            <SearchDiv>
              <FontAwesomeIcon icon={faArrowLeft} onClick={() => history.back()} />
              <H2>{params.get("search")}</H2>
            </SearchDiv>
            <FilterDiv>
              <ToggleDiv>
                <ToggleSpan onClick={handleToggleClick} selected={isMap} position="left">
                  지도
                </ToggleSpan>
                <ToggleSpan onClick={handleToggleClick} selected={!isMap} position="right">
                  목록
                </ToggleSpan>
              </ToggleDiv>
            </FilterDiv>
          </>
        )}
      </MapHeaderSection>
    </MapHeaderContainer>
  );
};

const MapHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 23px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

  font-family: Noto Sans;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #000;
`;

const MapHeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  font-family: Noto Sans KR;
  font-size: 1rem;
  font-weight: 700;
  line-height: 2.09375rem;
  margin: 1rem 0 0.375rem;
  color: #1a1a1a;
`;

const SearchInputField = styled.fieldset`
  width: 100%;
  position: relative;

  & svg {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    color: #2ab673;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 2.5rem 0 1rem;
  border-radius: 3px;
  background: var(--background-color-gray, #f2f4f6);
  box-sizing: border-box;
  border: none;

  font-family: Inter;
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  position: relative;
  width: 100%;

  & > svg {
    width: 0.9375rem;
    height: 0.9375rem;
    font-family: Noto Sans KR;
    font-size: 1rem;
    font-weight: 700;
    line-height: 2.09375rem;
    margin: 1rem 0 0.375rem;
    cursor: pointer;
  }

  &::after {
    width: 0.9375rem;
    content: "";
  }
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  position: relative;
  width: 100%;

  &::before {
    width: 0.9375rem;
    content: "";
  }
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

export default MapHeader;
