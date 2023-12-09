import React from "react";
import { StoreDataType } from "@/types/map/storeDataType";
import { styled } from "styled-components";

interface CardPropsType {
  storeData: StoreDataType[];
}

const Card: React.FC<CardPropsType> = ({ storeData }) => {
  return (
    <>
      {storeData?.map((store: StoreDataType) => {
        return (
          <CardContainer key={store.id}>
            <img src={store.imageUrl} alt={store.name} loading="lazy" />
            <CardInfo>
              <h3>{store.name}</h3>
              <p>좋아요 25개</p>
            </CardInfo>
          </CardContainer>
        );
      })}
    </>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 23rem;
  height: 14.375rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 1.0625rem 0;

  & img {
    height: 71%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 29%;
  margin: 0.5rem 0.875rem;

  & h3 {
    color: #000;
    font-family: Noto Sans KR;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 170% */
  }

  & p {
    color: #4e5867;
    font-family: Noto Sans KR;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5938rem; /* 212.5% */
  }
`;

export default Card;
