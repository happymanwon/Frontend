import reset from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./style/theme";

import Main from "@pages/Main";
import CategoryPage from "@pages/CategoryPage";
import StoreDetail from "@/pages/StoreDetail";
import PostDetail from "@/pages/PostDetail";
import Kakao from "@/pages/Kakao";
import Map from "@/pages/Map";
import Shop from "@/pages/Shop";
import Community from "@/pages/Community";
import LoginPage from "@/pages/LoginPage";
import Mypage from "@/pages/Mypage";
import NotFound from "@pages/NotFound";

import SearchElement from "@/components/SearchElement";
import Layout from "@/components/layout/Layout";
import Background from "@/components/layout/Background";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

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
            <Route
              path="/category/:categoryId/:storeId"
              element={
                <Layout>
                  <StoreDetail />
                </Layout>
              }
            />
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
