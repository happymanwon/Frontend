import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import CategoryPage from "@pages/CategoryPage";
import SearchPage from "@/pages/SearchPage";
import StoreDetailPage from "@/pages/StoreDetailPage";
import PostDetailPage from "@/pages/PostDetailPage";
import KakaoLoginPage from "@/pages/KakaoLoginPage";
import MapPage from "@/pages/MapPage";
import MapDetailPage from "@/pages/MapDetailPage";
import ZzanPage from "@/pages/ZzanPage";
import ZzanDetailPage from "@/pages/ZzanDetailPage";
import CommunityPage from "@/pages/CommunityPage";
import NewPostPage from "@/pages/NewPostPage";
import LoginPage from "@/pages/LoginPage";
import Mypage from "@/pages/Mypage";
import NotFoundPage from "@/pages/NotFoundPage";

import SearchElement from "@/components/SearchElement";
import Layout from "@/components/layout/Layout";
import Background from "@/components/layout/Background";

import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { GlobalStyle } from "@/styles/global";
import EditPostPage from "./pages/EditPostPage";
import QrPage from "./pages/QrPage";

import PrivateRoute from "./PrivateRoute";

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
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchPage />
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
              path="/map/detail"
              element={
                <Layout>
                  <MapDetailPage />
                </Layout>
              }
            />
            <Route
              path="/zzan"
              element={
                <Layout>
                  <ZzanPage />
                </Layout>
              }
            />
            <Route
              path="/zzan-items/:zzanId"
              element={
                <Layout>
                  <ZzanDetailPage />
                </Layout>
              }
            />
            <Route
              path="/community"
              element={
                <Layout>
                  <CommunityPage />
                </Layout>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <Layout>
                  <PostDetailPage />
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
            <Route
              path="/newpost"
              element={
                <PrivateRoute>
                  <Layout>
                    <NewPostPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/editpost/:postId"
              element={
                <PrivateRoute>
                  <Layout>
                    <EditPostPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <Layout>
                    <Mypage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/qr/:storeId"
              element={
                <PrivateRoute>
                  <Layout>
                    <QrPage />
                  </Layout>
                </PrivateRoute>
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
