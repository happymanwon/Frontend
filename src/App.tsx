import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";
import CategoryPage from "@pages/CategoryPage";
import Header from "./components/Header";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Reset />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Nav />
      </Router>
    </>
  );
}

export default App;
