import { Reset } from "styled-reset";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";

function App() {
  return (
    <>
      <Reset />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
