import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";
import CategoryPage from "@pages/CategoryPage";
import SearchElement from "@/components/SearchElement";
import Layout from "@/components/layout/Layout";
import Background from "@/components/layout/Background";
import Mypage from "@/pages/Mypage";
import Kakao from "@/pages/Kakao";
import Map from "@/pages/Map";
import Community from "@/pages/Community";
import Shop from "@/pages/Shop";
import PostDetail from "@/components/PostDetail";

function App() {
  return (
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
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/*" element={<NotFound />} />
          <Route
            path="/mypage"
            element={
              <Layout>
                <Mypage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
