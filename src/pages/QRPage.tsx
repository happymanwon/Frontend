import styled from "styled-components";

const QRPage = () => {
  return (
    <QrContainer>
      <QrTitle>스시히로이</QrTitle>
      <QrImage>
        <img src="/data/fakeimg/qr.png" alt="qr" />
      </QrImage>
      <QrInfo>
        <h2>가게 사장님께 해당 QR 코드를 보여주세요!</h2>
        <p>구매 날짜 2023.12.12</p>
      </QrInfo>
    </QrContainer>
  );
};

const QrContainer = styled.main`
  /* height: 6.125rem; */
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 23px;
`;

const QrTitle = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2ab673;
  border-radius: 2px;
  color: #fff;
  font-family: NotoSansMediumWOFF, sans-serif, Arial;
  font-size: 12px;
`;

const QrImage = styled.div`
  width: 173px;
  height: 173px;
  border: 6px solid #2ab673;
  padding: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const QrInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  h2 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 0.625rem;
    color: #1a1a1a;
  }
  p {
    font-size: 15px;
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;
  }
`;

export default QRPage;
