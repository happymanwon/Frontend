import styled from "styled-components";

const MypageCharge = () => {
  return (
    <ChargeContainer>
      <AccountContainer></AccountContainer>
    </ChargeContainer>
  );
};

const ChargeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 2.75rem);
`;

const AccountContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default MypageCharge;
