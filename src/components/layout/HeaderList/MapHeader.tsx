import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

interface ToggleSpanProps {
  selected: boolean;
  position: 'left' | 'right';
}

const MapHeader: React.FC = () => {
  const [selected, setSelected] = useState(false);    // 전역 관리로 할 예정 (컴포넌트를 바꿔야 되기 때문에)

  const handleToggleClick = () => {
    setSelected(!selected);
  };

  return (
    <MapHeaderContainer>
      <FontAwesomeIcon icon={faArrowLeft} />
      <H2>짠지도</H2>
      <ToggleDiv>
        <ToggleSpan onClick={handleToggleClick} selected={selected} position="left">지도</ToggleSpan>
        <ToggleSpan onClick={handleToggleClick} selected={!selected} position="right">목록</ToggleSpan>
      </ToggleDiv>
    </MapHeaderContainer>
  );
};

const MapHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  position: relative;
`;

const H2 = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const ToggleDiv = styled.div`
  display: flex;
  border-radius: 6px;
  border: 0.5px solid #DADADA;
  width: 100px;
  height: 30px;
  &:first-child {
    border-right: 0.5px solid #DADADA;
  }
`;

const ToggleSpan = styled.span<ToggleSpanProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 12px;
  background-color: ${props => props.selected ? '#DADADA' : 'transparent'};
  color: ${props => props.selected ? '#4E5867' : '#DADADA'};
  border-radius: ${props => props.selected && props.position === 'left' ? '6px 0 0 6px' :
                            props.selected && props.position === 'right' ? '0 6px 6px 0' : '0'};
  cursor: pointer;
`

export default MapHeader;