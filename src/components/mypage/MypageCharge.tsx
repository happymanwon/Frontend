import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import nhImg from "/nh.png";

const MypageCharge = () => {
  const navigate = useNavigate();
  return (
    <ChargeContainer>
      <AccountContainer>
        <img src={nhImg} alt="농협" />
        <span className="bank">농협</span>
        <span>3553292390433</span>
      </AccountContainer>
      <MoneyContainer>
        <input type="text" placeholder="금액을 입력해 주세요" />
        <div className="balance">
          <span>포인트 잔액: </span>
          <span>1,100원</span>
        </div>
      </MoneyContainer>
      <ManageButton onClick={() => navigate("/mypage?page=payment")}>
        + 연결계좌 관리하기
      </ManageButton>
      <ChargeButton
        onClick={() => {
          alert("충전이 어렵습니다.");
        }}
      >
        충전하기
      </ChargeButton>
    </ChargeContainer>
  );
};

const ChargeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 2.75rem);
  font-family: NotoSansLightWOFF;
`;

const AccountContainer = styled.div`
  width: 100%;
  height: 3.0625rem;
  display: flex;
  align-items: center;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  gap: 7px;
  font-size: 15px;
  img {
    margin-left: 5px;
    width: 23px;
  }
  .bank {
    color: ${({ theme }) => theme.colors.mainColor};
    font-family: NotoSansMediumWOFF;
  }
`;

const MoneyContainer = styled.div`
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  input {
    width: 23.8125rem;
    height: 2rem;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor2};
  }
  .balance {
    font-size: 12px;
  }
`;

const ManageButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  font-family: NotoSansMediumWOFF;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
  cursor: pointer;
`;

const ChargeButton = styled.button`
  position: absolute;
  bottom: 0;
  z-index: 99;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 3.125rem;
  background-color: ${({ theme }) => theme.colors.mainColor2};
  font-size: 18px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default MypageCharge;
