import styled from "styled-components";

const Background = () => {
  return <BackgroundStyle></BackgroundStyle>;
};

const BackgroundStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
  position: fixed;
  width: 100vw;
`;

export default Background;
