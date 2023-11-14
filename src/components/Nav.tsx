import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar>
      <NavLink to="/map">짠지도</NavLink>
      <NavLink to="/shop">짠처리</NavLink>
      <NavLink to="/">만원</NavLink>
      <NavLink to="/community">단짠단짠</NavLink>
      <NavLink to="/mypage">마이페이지</NavLink>
    </Navbar>
  );
};

const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 417px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin-left: 56%;

  @media (max-width: 1024px) {
    margin-left: 0px;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
`;

export default Nav;
