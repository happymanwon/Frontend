import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import chatImg from "@/assets/images/chat-img.svg";
import coinImg from "@/assets/images/coin-img.svg";
import mapImg from "@/assets/images/map-img.svg";
import sejongImg from "@/assets/images/sejong-img.png";
import userImg from "@/assets/images/user-img.svg";

const Nav = () => {
  // 로그인 여부 (전역 상태 관리 시 지울 예정)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Navbar>
      <NavLink to="/map">
        <img src={mapImg} alt="맵 이미지" />
        <p>짠지도</p>
      </NavLink>
      <NavLink to="/shop">
        <img src={coinImg} alt="코인 이미지" />
        <p>짠처리</p>
      </NavLink>
      <NavLink to="/">
        <img src={sejongImg} alt="세종 이미지" width={49} height={49} />
      </NavLink>
      <NavLink to="/community">
        <img src={chatImg} alt="채팅 이미지" />
        <p>단짠단짠</p>
      </NavLink>
      {isLogin ? (
        <NavLink to="/mypage">
          <img src={userImg} alt="유저 이미지" />
          <p>마이페이지</p>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <img src={userImg} alt="유저 이미지" />
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
`;

export default Nav;
