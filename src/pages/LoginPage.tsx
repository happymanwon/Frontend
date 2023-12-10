import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import logoImg from "@/assets/images/medium-logo.svg";
import titleImg from "@/assets/images/manwon-title.svg";

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
      <img src={logoImg} />
      <div className="title-container">
        <span className="normal-font">한 푼이라도 아쉬운</span>
        <span className="bold-font">사람들을 위한</span>
      </div>
      <img src={titleImg} className="title" />
      <KakaoButton onClick={handleLogin}>
        <FontAwesomeIcon
          icon={faComment}
          size="2x"
          style={{ color: "#2b1417" }}
        />
      </KakaoButton>
      <BottomWrapper>
        <div>
          <span>아직 만원의 행복 회원이 아니신가요?</span>
          <button className="sign-in-button">회원가입 ❯</button>
        </div>
        <button onClick={() => navigate("/")} className="home-button">
          나중에 할래요
        </button>
      </BottomWrapper>
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: NotoSansLightrWOFF, sans-serif, Arial;
  margin-top: 7.1875rem;
  gap: 10px;
  .title {
    width: 13.25rem;
  }
  .title-container {
    border: 0.5px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 40px;
    width: 17.625rem;
    height: 2.3125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
  .bold-font {
    font-weight: 700;
    margin-left: 5px;
  }
`;
const KakaoButton = styled.button`
  background-color: #fee500;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  color: #000000;
  cursor: pointer;
`;
const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 40px;
  text-align: center;
  font-size: 12px;

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 12px;
  }
  .sign-in-button {
    font-weight: 700;
  }
  .home-button {
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export default LoginPage;
