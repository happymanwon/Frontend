import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import MainHeader from "./HeaderList/MainHeader";
import StoreListHeader from "./HeaderList/StoreListHeader";
import MapHeader from "./HeaderList/MapHeader";
import MypageHeader from "./HeaderList/MypageHeader";
import CommunityHeader from "./HeaderList/CommunityHeader";
import ZzanHeader from "./HeaderList/ZzanHeader";

import styled from "styled-components";
import QrHeader from "./HeaderList/QrHeader";

const Header: React.FC = () => {
  const location = useLocation().pathname;
  const [param] = useSearchParams();
  const pageName = param.get("page") || null;

  let component: React.ReactNode = null; // 초기값으로 React.ReactNode을 사용하여 null 대신에 다른 값도 가질 수 있게 설정

  if (location === "/") {
    component = <MainHeader />;
  }
  if (location.includes("/category") || location.includes("/search")) {
    component = <StoreListHeader />;
  }
  if (location.includes("/map")) {
    component = <MapHeader />;
  }
  if (location === "/zzan") {
    component = <ZzanHeader />;
  }
  if (pageName !== "profile" && location.includes("/mypage")) {
    component = <MypageHeader />;
  } else if (pageName === "profile" && location.includes("/mypage")) {
    return null;
  }
  if (location.includes("/community") || location.includes("/search-post")) {
    component = <CommunityHeader />;
  }

  if (location.includes("/qr")) {
    component = <QrHeader />;
  }

  return <HeaderContainer>{component}</HeaderContainer>;
};

const HeaderContainer = styled.header`
  height: 6.125rem;
  width: 100%;
`;

export default Header;
