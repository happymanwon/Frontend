import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ChatImg from "@/assets/images/chat-img.svg?react";
import CoinImg from "@/assets/images/coin-img.svg?react";
import MapImg from "@/assets/images/map-img.svg?react";
import sejongImg from "@/assets/images/sejong-img.png";
import UserImg from "@/assets/images/user-img.svg?react";
import styled from "styled-components";

const Nav = () => {
  // 로그인 여부 (전역 상태 관리 시 지울 예정)
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar>
      <NavLink to="/map" className={isActive("/map") ? "active" : ""}>
        <MapImg />
        <p>짠지도</p>
      </NavLink>
      <NavLink to="/shop" className={isActive("/shop") ? "active" : ""}>
        <CoinImg />
        <p>짠처리</p>
      </NavLink>
      <NavLink to="/">
        <img src={sejongImg} alt="세종 이미지" width={49} height={49} />
      </NavLink>
      <NavLink
        to="/community"
        className={isActive("/community") ? "active" : ""}
      >
        <ChatImg />
        <p>단짠단짠</p>
      </NavLink>
      {isLogin ? (
        <NavLink to="/mypage" className={isActive("/mypage") ? "active" : ""}>
          <UserImg />
          <p>마이페이지</p>
        </NavLink>
      ) : (
        <NavLink to="/login" className={isActive("/login") ? "active" : ""}>
          <UserImg />
          <p>로그인</p>
        </NavLink>
      )}
    </Navbar>
  );
};

const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  max-width: 26.5rem;
  width: 22.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.05);
  font-family: NotoSansWOFF, sans-serif, Arial;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    font-size: 0.4375rem;
    font-weight: 400;
    margin-top: 0.375rem;
  }

  & svg {
    fill: #000;
  }

  &.active {
    color: #2ab673;
    svg {
      fill: #2ab673;
    }
  }
`;

export default Nav;
