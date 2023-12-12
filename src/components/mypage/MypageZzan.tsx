import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const item = [
  {
    id: 1,
    image: "/data/fakeimg/sushi.jpg",
    payDate: "2023-12-12 결제",
    payStore: "스시히로이",
    payPrice: "18,900원",
    isQR: true,
  },
  {
    id: 2,
    image: "/data/fakeimg/toast.png",
    payDate: "2023-12-11 결제",
    payStore: "토스트",
    payPrice: "1,000원",
    isQR: false,
  },
];

const MypageZzan = () => {
  const navigate = useNavigate();

  const MoveQR = (id: number, isQR: boolean) => () => {
    if (isQR) {
      navigate(`/qr/${id}`);
    }
  };

  return (
    <MyZzanContainer>
      <span>2023년 12월</span>
      {item.map((item, index) => (
        <ZzanItemContainer key={index}>
          <ZzanItemImg>
            <img src={item.image} alt="" />
          </ZzanItemImg>
          <ZzanItemInfo>
            <div>{item.payDate}</div>
            <div>{item.payStore}</div>
            <div>{item.payPrice}</div>
          </ZzanItemInfo>
          <ZzanItemBtn isQR={item.isQR} onClick={MoveQR(item.id, item.isQR)}>
            {item.isQR ? "QR 코드" : "사용완료"}
          </ZzanItemBtn>
        </ZzanItemContainer>
      ))}
    </MyZzanContainer>
  );
};

const MyZzanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 2.75rem);
  padding: 0 1.375rem;
  gap: 0.75rem;

  span {
    color: #1a1a1a;
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
    letter-spacing: -0.408px;
    margin-bottom: -0.375rem;
  }
`;

const ZzanItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.125rem;
  width: 23.875rem;
  height: 5.75rem;
  padding: 0.5rem 0.875rem;
  border-radius: 9px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  gap: 0.5rem;
`;

const ZzanItemImg = styled.div`
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.5rem;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ZzanItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  flex: 2;
  & > div:nth-child(1) {
    color: var(--Gray_3, #888);
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }
  & > div:nth-child(2) {
    color: var(--Primary-Black, var(--Primary-Black, #1a1a1a));
    font-family: NotoSansMediumWOFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px; /* 150% */
  }
  & > div:nth-child(3) {
    color: var(--Primary-Black, var(--Primary-Black, #1a1a1a));
    font-family: NotoSansMediumWOFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px; /* 150% */
  }
`;

interface ZzanItemBtnPropsType {
  isQR: boolean;
}

const ZzanItemBtn = styled.button<ZzanItemBtnPropsType>`
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isQR ? "#2AB673" : "#888")};
  font-size: 0.875rem;
  font-family: NotoSansMediumWOFF;
  font-weight: 700;
  line-height: 1.3125rem;
  border: none;
  color: #fff;
  cursor: ${(props) => (props.isQR ? "pointer" : "default")};
`;

export default MypageZzan;
