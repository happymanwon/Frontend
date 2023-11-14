import React from 'react';
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchElement = () => {
  return (
    <SearchPage>
      <SearchMain>
        <InputContainer>
          <input type="text" />
          <IconContainer>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconContainer>
        </InputContainer>
      </SearchMain>
    </SearchPage>
  );
};

const SearchPage = styled.div`
  position: fixed;
  height: 100%;
  width: 32rem;
  left: calc(50vw - 32rem);
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const SearchMain = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  max-width: 25rem;
  width: 100%;
  padding: 3rem 0px 2rem;
`

const InputContainer = styled.div`
  position: relative;
  width: 400px;
  height: 65px;
  border-radius: 10px;
  background: #fff;

  & input {
    position: absolute;
    width: 335px;
    height: 65px;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 0px 50px 0px 15px;
    caret-color: #000;
    background: transparent;
    border: none;
    z-index: 5;
  }

  & input:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 50px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 6;
`

export default SearchElement;