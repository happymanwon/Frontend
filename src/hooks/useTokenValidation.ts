import { useEffect, useState } from "react";
import axios from "axios";

const useTokenValidation = (token) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `/api/auth/token/validation?token=${token}`
          );
          console.log("토큰이 유효합니다:", response.data.valid);
          setIsValid(true);
        } else {
          console.log("토큰이 없습니다.");
        }
      } catch (error) {
        console.error("토큰 유효성 검사 중 오류:", error);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  return { isValidating, isValid };
};

export default useTokenValidation;
