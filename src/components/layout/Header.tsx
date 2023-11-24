import React from "react";
import { useLocation } from "react-router-dom";

import MainHeader from "./HeaderList/MainHeader";
import CategoryHeader from "./HeaderList/CategoryHeader";
import StoreDetailHeader from "./HeaderList/StoreDetailHeader";
import MapHeader from "./HeaderList/MapHeader";
import MypageHeader from "./HeaderList/MypageHeader";

import styled from "styled-components";

const Header: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("id");

  let component = null;

  if (location.pathname === "/") {
    component = <MainHeader />;
  }
  if (location.pathname.includes("/category")) {
    if (storeId) {
      component = <StoreDetailHeader />;
    } else {
      component = <CategoryHeader />;
    }
  }
  if (location.pathname.includes("/map")) {
    component = <MapHeader />;
  }
  if (location.pathname.includes("/mypage")) {
    component = <MypageHeader />;
  }

  return <HeaderContainer>{component}</HeaderContainer>;
};

const HeaderContainer = styled.header`
  height: 6.125rem;
  width: 100%;
`;

export default Header;
