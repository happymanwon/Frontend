import styled from "styled-components";
import profile_img from "@/assets/images/new-sejong-profile.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MypageMain = () => {
  const navigate = useNavigate();

  return (
    <MypageContainer>
      <ProfileSection>
        <Profile>
          <ProfileImg src={profile_img} />
          <ProfileName>
            <span style={{ color: "#2AB673" }}>세종대왕님</span> <br />
            <span>환영해요!</span>
          </ProfileName>
        </Profile>
        <ProfileEdit onClick={() => navigate("/mypage?page=profile")}>
          프로필 수정
        </ProfileEdit>
      </ProfileSection>
      <PaySection>
        <PointInfo>
          <h2>짠처리 PAY</h2>
          <div onClick={() => navigate("/mypage?page=pay")}>
            <span>1,100P</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </PointInfo>
        <Charge onClick={() => navigate("/mypage?page=charge")}>
          포인트 충전
        </Charge>
      </PaySection>
      <MoveSection>
        <MoveMenu onClick={() => navigate("/mypage?page=zzan")}>
          <MoveMenuTitle>
            짠처리 결제 관리
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveMenuTitle>
        </MoveMenu>
        <MoveMenu onClick={() => navigate("/mypage?page=community")}>
          <MoveMenuTitle>
            커뮤니티 글 관리
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveMenuTitle>
        </MoveMenu>
        <MoveMenu onClick={() => navigate("/mypage?page=setting")}>
          <MoveMenuTitle>
            설정
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveMenuTitle>
        </MoveMenu>
      </MoveSection>
    </MypageContainer>
  );
};

const MypageContainer = styled.main`
  width: calc(100% - 44px);
  height: 100%;
  padding: 0 1.375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.625rem;
  gap: 2.1875rem;
  font-family: Noto Sans KR;
`;

const ProfileSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  color: #1a1a1a;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 129.3%; /* 20.688px */
  margin-left: 0.75rem;
`;

const ProfileEdit = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.875rem;
  height: 1.375rem;
  border-radius: 14px;
  border: 1px solid #dadada;
  background: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  color: #888;
  cursor: pointer;
`;

const PaySection = styled.section`
  display: flex;
  width: 21rem;
  height: 4.5rem;
  padding: 0.9375rem 1.4375rem;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid var(--Gray_2, #dadada);
  background: var(--WH, #fff);
  gap: 0.25rem;
`;

const PointInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;

  & > h2 {
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    color: #2ab673;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;

    & > span {
      color: #1a1a1a;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 34px;
    }

    & > svg {
      font-size: 13px;
      color: #1a1a1a;
      font-weight: 300;
    }
  }
`;

const Charge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.875rem;
  border-radius: 7px;
  border: 1px solid #2ab673;
  background: #2ab673;
  font-size: 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
`;

const MoveSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const MoveMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 2.8125rem;
  border-bottom: 1px solid #dadada;
  background: #fff;
  cursor: pointer;
`;

const MoveMenuTitle = styled.span`
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > svg {
    font-size: 1rem;
    color: #dadada;
    font-weight: 100;
  }
`;

export default MypageMain;
