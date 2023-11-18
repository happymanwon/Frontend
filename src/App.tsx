import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import CategoryPage from "@pages/CategoryPage";
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

function App() {
  return (
    <>
      <Reset />
      <Router>
        <Background />
        <SearchElement />
        <Routes>
          <Route path="/" element={<Layout><Main /></Layout>} />
          <Route path="/category/:categoryId" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/auth" element={<Layout><Kakao /></Layout>} />
          <Route path="/map" element={<Layout><Map /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/community" element={<Community />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/mypage" element={<Layout><Mypage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
