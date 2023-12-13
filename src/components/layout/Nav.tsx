import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useUserStore from "@/stores/useUserStore";
import ChatImg from "@/assets/images/chat-img.svg?react";
import CoinImg from "@/assets/images/coin-img.svg?react";
import MapImg from "@/assets/images/map-img.svg?react";
import sejongImg from "/sejong-img.svg";
import UserImg from "@/assets/images/user-img.svg?react";
import styled from "styled-components";

const Nav = () => {
  // 로그인 여부 (전역 상태 관리 시 지울 예정)
  const { memberId, nickname } = useUserStore.getState();
  console.log(memberId, nickname);
  // const [isLogin] = useState(memberId && true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar style={{ zIndex: "10", backgroundColor: "#fff" }}>
      <NavLink
        to="/map"
        className={isActive("/map") || isActive("/map/detail") ? "active" : ""}
      >
        <MapImg />
        <p>짠지도</p>
      </NavLink>
      <NavLink to="/zzan" className={isActive("/zzan") ? "active" : ""}>
        <CoinImg />
        <p>짠처리</p>
      </NavLink>
      <NavLink to="/">
        <img
          src={sejongImg}
          alt="세종 이미지"
          width={49}
          height={49}
          loading="lazy"
        />
      </NavLink>
      <NavLink
        to="/community"
        className={isActive("/community") ? "active" : ""}
      >
        <ChatImg />
        <p>단짠단짠</p>
      </NavLink>
      {/* {isLogin ? ( */}
      <NavLink to="/mypage" className={isActive("/mypage") ? "active" : ""}>
        <UserImg />
        <p>마이페이지</p>
      </NavLink>
      {/* ) : (
        <NavLink to="/login" className={isActive("/login") ? "active" : ""}>
          <UserImg />
          <p>로그인</p>
        </NavLink>
      )} */}
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

  @media (max-width: 425px) {
    & {
      max-width: 100%;
      width: calc(100% - 2rem);
    }
  }
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
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
    color: #888;
  }

  & svg {
    fill: #888;
  }

  &.active {
    p {
      color: #2ab673;
    }
    svg {
      fill: #2ab673;
    }
  }
`;

export default Nav;
