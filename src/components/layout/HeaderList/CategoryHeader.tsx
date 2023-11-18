import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const CategoryHeader = () => {
  return (
    <CategoryHeaderContainer>
      <FontAwesomeIcon icon={faArrowLeft} />
      <h2>만원의 행복</h2>
    </CategoryHeaderContainer>
  );
};

const CategoryHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  &::after {
    content: '';
    width: 10px;
  }
`;


export default CategoryHeader;