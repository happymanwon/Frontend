import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  // 로그인 여부 (전역 상태 관리 시 지울 예정)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Navbar>
      <NavLink to="/map">짠지도</NavLink>
      <NavLink to="/shop">짠처리</NavLink>
      <NavLink to="/">만원</NavLink>
      <NavLink to="/community">단짠단짠</NavLink>
      {isLogin ?
        <NavLink to="/mypage">마이페이지</NavLink>
        :
        <NavLink to="/login">로그인</NavLink>
      }
    </Navbar>
  );
};

const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 26rem;
  display: flex;
  justify-content: space-around;
  padding: 1rem 4px;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
`;

export default Nav;
