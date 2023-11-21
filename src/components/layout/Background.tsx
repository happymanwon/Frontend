import styled from "styled-components";

const Background = () => {
  return (
    <BackgroundStyle>
      <HeaderLogo>
        <img src="/logo.svg" />
      </HeaderLogo>
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  background-color: #fcfdff;
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
  position: fixed;
  width: 100vw;
`;

const HeaderLogo = styled.div`
  display: none;

  @media (min-width: 1024px) {
    margin-top: 10px;
    margin-left: 10px;
    display: block;
  }
`;

export default Background;
