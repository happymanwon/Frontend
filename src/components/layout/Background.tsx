import styled from "styled-components";
import sejongImg from "@/assets/images/sejong-img.png";

const Background = () => {
  return (
    <BackgroundStyle>
      <HeaderLogo>
        <img src={sejongImg} alt="세종 로고" width={77} height={77} />
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
