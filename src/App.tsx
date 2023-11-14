import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";
import CategoryPage from "@pages/CategoryPage";
import SearchElement from '@/components/SearchElement';
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
