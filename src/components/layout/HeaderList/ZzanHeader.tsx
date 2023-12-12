import styled from "styled-components";
import Geolocation from "@/components/Geolocation";

const ZzanHeader: React.FC = () => {
  return (
    <MapHeaderContainer>
      <H2>짠처리</H2>
      <SelectBoxContainer>
        <Geolocation />
        <BuyListButton>구매내역</BuyListButton>
      </SelectBoxContainer>
    </MapHeaderContainer>
  );
};

const MapHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  position: relative;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  box-shadow: 0px 2px 2px 0px #0000001a;
  &::after {
    content: "";
    width: 10px;
  }
`;

const H2 = styled.h2`
  position: absolute;
  font-family: NotoSansMediumWOFF, sans-serif, Arial;
  font-weight: 700;
  left: 50%;
  transform: translateX(-50%);
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: space-between;
  width: 24rem;
  select {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 8px;
    font-size: 12px;
  }
`;

const BuyListButton = styled.button`
  border-radius: 8px;
  width: 89px;
  height: 30px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default ZzanHeader;
