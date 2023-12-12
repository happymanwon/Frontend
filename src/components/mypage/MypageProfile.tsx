import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile_img from "@/assets/images/new-sejong-profile.png";
import Camera from "@/assets/images/camera.svg?react";

const MypageProfile = () => {
  const [nickname, setNickname] = useState("세종대왕");
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <MypageHeaderContainer>
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => history.back()} />
        <H2>프로필 수정</H2>
        <span onClick={() => navigate("/mypage")}>완료</span>
      </MypageHeaderContainer>
      <MypageProfileContainer>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <ProfileImg>
            <img src={profile_img} alt="프로필 사진" />
          </ProfileImg>
          <CameraImg>
            <Camera />
          </CameraImg>
        </div>
        <InputTag>
          <label htmlFor="">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputTag>
      </MypageProfileContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 6.125rem;
  width: 100%;
`;

const MypageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  & > svg {
    font-size: 1.25rem;
    color: #1a1a1a;
    cursor: pointer;
  }
  & > span {
    color: #1a1a1a;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 33.5px; /* 279.167% */
    cursor: pointer;
  }
`;

const H2 = styled.h2`
  color: #1a1a1a;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 33.5px; /* 209.375% */
`;

const MypageProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
`;

const ProfileImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
  border: 0.5px solid var(--Gray_2, #dadada);
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const CameraImg = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--Gray_2, #dadada);
  color: #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    width: 70%;
    height: 70%;
  }

  & > svg > path {
    fill: #ffffff;
  }
`;

const InputTag = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20.375rem;
  margin-top: 1.5rem;
  & > label {
    width: 100%;
    color: #1a1a1a;
    font-family: NotoSansMediumWOFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 214.286% */
  }
  & > input {
    width: calc(100% - 2.5rem);
    height: 1.875rem;
    padding: 0.625rem 1.25rem;
    border: 1px solid #e1e1e1;
    border-radius: 9px;
    color: #1a1a1a;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 33.5px; /* 209.375% */
    text-align: left;
  }

  & > input:focus {
    outline: none;
  }
`;

export default MypageProfile;
