import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
    navigate("/auth");
  };

  return (
    <JoinContainer>
      <button onClick={handleLogin}>
        <FontAwesomeIcon icon={faComment} style={{ color: "#000000" }} />
        카카오 로그인
      </button>
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
  button {
    background-color: #fee500;
    border: none;
    border-radius: 12px;
    width: 150px;
    height: 50px;
    color: #000000;
    cursor: pointer;
  }
`;

export default LoginPage;