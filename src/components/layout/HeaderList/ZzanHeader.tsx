import styled from "styled-components";
import Geolocation from "@/components/Geolocation";

const ZzanHeader: React.FC = () => {
  return (
    <MapHeaderContainer>
      <H2>짠처리</H2>
      <SelectBoxContainer>
        <Geolocation />
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
  select {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 8px;
    font-size: 12px;
  }
`;

export default ZzanHeader;
