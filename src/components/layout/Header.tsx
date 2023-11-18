import React from 'react';
import { useLocation } from "react-router-dom";

import MainHeader from './HeaderList/MainHeader';
import CategoryHeader from './HeaderList/CategoryHeader';
import MapHeader from './HeaderList/MapHeader';
import MypageHeader from './HeaderList/MypageHeader';

import styled from "styled-components";

const Header: React.FC = () => {
  const location = useLocation().pathname;

  let component = null;
  if (location === '/') {
    component = <MainHeader />;
  } 
  if (location.includes('/category')) {
    component = <CategoryHeader />;
  } 
  if (location.includes('/map')) {
    component = <MapHeader />;
  }
  if (location.includes('/mypage')) {
    component = <MypageHeader />;
  } 

  return (
    <HeaderContainer>
      {component}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 81px;
  width: 100%;
`

export default Header;
