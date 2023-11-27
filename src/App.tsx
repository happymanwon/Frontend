import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import CategoryPage from "@pages/CategoryPage";
import StoreDetailPage from "@/pages/StoreDetailPage";
import PostDetailPage from "@/pages/PostDetailPage";
import KakaoLoginPage from "@/pages/KakaoLoginPage";
import MapPage from "@/pages/MapPage";
import ShopPage from "@/pages/ShopPage";
import CommunityPage from "@/pages/CommunityPage";
import LoginPage from "@/pages/LoginPage";
import Mypage from "@/pages/Mypage";
import NotFoundPage from "@/pages/NotFoundPage";

import SearchElement from "@/components/SearchElement";
import Layout from "@/components/layout/Layout";
import Background from "@/components/layout/Background";

import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { GlobalStyle } from "@/styles/global";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Router>
          <Background />
          <SearchElement />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <MainPage />
                </Layout>
              }
            />
            <Route
              path="/category/:categoryId"
              element={
                <Layout>
                  <CategoryPage />
                </Layout>
              }
            />
            <Route path="/store/:storeId" element={<StoreDetailPage />} />
            <Route
              path="/auth"
              element={
                <Layout>
                  <KakaoLoginPage />
                </Layout>
              }
            />
            <Route
              path="/map"
              element={
                <Layout>
                  <MapPage />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <ShopPage />
                </Layout>
              }
            />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            <Route
              path="/mypage"
              element={
                <Layout>
                  <Mypage />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <LoginPage />
                </Layout>
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
