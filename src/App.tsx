import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";

import Main from "@/pages/MainPage";
import CategoryPage from "@pages/CategoryPage";
import StoreDetail from "@/pages/StoreDetailPage";
import PostDetail from "@/pages/PostDetailPage";
import Kakao from "@/pages/KakaoLoginPage";
import Map from "@/pages/MapPage";
import Shop from "@/pages/ShopPage";
import Community from "@/pages/CommunityPage";
import LoginPage from "@/pages/LoginPage";
import Mypage from "@/pages/Mypage";
import NotFound from "@/pages/NotFoundPage";

import SearchElement from "@/components/SearchElement";
import Layout from "@/components/layout/Layout";
import Background from "@/components/layout/Background";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Reset />
        <Router>
          <Background />
          <SearchElement />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Main />
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
            <Route path="/store/:storeId" element={<StoreDetail />} />
            <Route
              path="/auth"
              element={
                <Layout>
                  <Kakao />
                </Layout>
              }
            />
            <Route
              path="/map"
              element={
                <Layout>
                  <Map />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route path="/community" element={<Community />} />
            <Route path="/post/:postId" element={<PostDetail />} />
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
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
