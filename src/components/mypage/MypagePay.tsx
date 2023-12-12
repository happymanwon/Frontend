import React from "react";
import styled from "styled-components";

const payItems = [
  { date: "2023.12.12", store: "스시히로이", point: "18,900", isMinus: true },
  { date: "2023.12.11", store: "농협 4435", point: "21,000", isMinus: false },
];

const MypagePay = () => {
  return (
    <PayContainer>
      <DateSpan>2023년 12월</DateSpan>
      {payItems.map((item, index) => (
        <PayItem key={index}>
          <PayInfo>
            <span>{item.date}</span>
            <span>{item.store}</span>
          </PayInfo>
          <PayPoint isMinus={item.isMinus}>
            <span>{item.isMinus ? "-" : ""}</span>
            <span>{item.point} P</span>
          </PayPoint>
        </PayItem>
      ))}
    </PayContainer>
  );
};

const PayContainer = styled.div`
  width: calc(100% - 2.75rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.375rem;
  gap: 0.75rem;
`;

const DateSpan = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;
  margin-bottom: -0.375rem;
`;

const PayItem = styled.div`
  width: 100%;
  height: 62px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0.6875rem 1.375rem;
  border: 1px solid #e5e5e5;
  border-radius: 9px;
`;

const PayInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span:nth-child(1) {
    color: #888;
    font-family: NotoSansRegularWOFF;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }

  span:nth-child(2) {
    color: #1a1a1a;
    /* Subtitle3 */
    font-family: NotoSansMediumWOFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px; /* 150% */
  }
`;

interface PayPointProps {
  isMinus: boolean;
}

const PayPoint = styled.div<PayPointProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  & span {
    color: ${(props) => (props.isMinus ? "#1a1a1a" : "#2ab673")};
    text-align: right;
    font-feature-settings: "clig" off, "liga" off;
    font-family: NotoSansMediumWOFF;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 110% */
    letter-spacing: -0.408px;
  }
`;

export default MypagePay;
