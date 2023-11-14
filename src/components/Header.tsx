import styled from "styled-components";
import Geolocation from "@/components/Geolocation";

const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <Geolocation />
      <InputWrapper>
        <input
          type="text"
          placeholder="단돈 만원대로 이용 가능한 갓성비 착한가게를 검색해보세요."
        />
        <button type="submit">검색</button>
      </InputWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  margin-left: 56%;
  position: fixed;
  top: 0;

  @media (max-width: 1024px) {
    margin-left: 0px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 417px;
  input {
    width: calc(100% - 60px);
  }
  button {
    width: 60px;
  }
`;

export default Header;
