import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/useUserStore";
import useTokenValidation from "@/hooks/useTokenValidation"; // 토큰 검증

const PrivateRoute = ({ children }) => {
  const { accessToken } = useUserStore();
  const navigate = useNavigate();
  const token = accessToken;
  const { isValidating, isValid } = useTokenValidation(token);

  // 로그인 상태에 따라 제한을 설정
  if (isValidating) {
    // 유효성 검사 중에는 로딩 중 띄우기
    return <div>로딩중..</div>;
  } else if (isValid) {
    // 토큰이 유효한 경우 경로에 액세스
    return children;
  } else {
    // 토큰이 유효하지 않은 경우 리디렉션
    navigate("/login");
    return null;
  }
};

export default PrivateRoute;
