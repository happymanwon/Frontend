import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import MainHeader from "./HeaderList/MainHeader";
import StoreListHeader from "./HeaderList/StoreListHeader";
import MapHeader from "./HeaderList/MapHeader";
import MypageHeader from "./HeaderList/MypageHeader";

import styled from "styled-components";

const Header: React.FC = () => {
  const location = useLocation().pathname;
  const [param] = useSearchParams();
  const pageName = param.get("page") || null;

  let component = null;

  if (location === "/") {
    component = <MainHeader />;
  }
  if (location.includes("/category") || location.includes("/search")) {
    component = <StoreListHeader />;
  }
  if (location.includes("/map")) {
    component = <MapHeader />;
  }
  if (pageName !== "profile" && location.includes("/mypage")) {
    component = <MypageHeader />;
  }

  return <HeaderContainer>{component}</HeaderContainer>;
};

const HeaderContainer = styled.header`
  height: 6.125rem;
  width: 100%;
`;

export default Header;
