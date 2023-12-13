import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/global";

// ZoomProvider 컴포넌트
function ZoomProvider({ children }) {
  const [zoom, setZoom] = useState(1);
  const location = useLocation(); // 이제 여기서 useLocation을 사용할 수 있습니다.

  useEffect(() => {
    function handleResize() {
      const mainWidth = 425;
      const width = window.innerWidth;
      setZoom(width < mainWidth ? width / mainWidth : 1);
    }

    if (location.pathname.includes("/zzan-items/") || location.pathname.includes("/store") || location.pathname.includes("/map")) {
      return;
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]); // location을 의존성 배열에 추가합니다.

  return (
    <>
      <GlobalStyle zoom={zoom} />
      {children}
    </>
  );
}

export default ZoomProvider;
