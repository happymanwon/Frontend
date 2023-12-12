import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <LayoutPage>
      <LayoutContainer>
        {location.pathname === "/login" ||
        location.pathname.includes("/zzan-items") ||
        location.pathname.includes("/newpost") ||
        location.pathname.includes("/editpost") ||
        location.pathname.includes("/post") ? null : (
          <Header />
        )}
        {children}
        {location.pathname === "/login" ||
        location.pathname === "/newpost" ||
        location.pathname.includes("/editpost") ||
        location.pathname.includes("/post") ||
        location.pathname.includes("/zzan-items") ? null : (
          <Nav />
        )}
      </LayoutContainer>
    </LayoutPage>
  );
};

const LayoutPage = styled.div`
  display: block;
  background-color: #fff;
  height: 100vh;
  position: relative;
  max-width: 26.5rem;
  margin: auto;

  @media (min-width: 1024px) {
    left: 50vw;
    margin: 0;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Layout;
