import styled from 'styled-components';

const Background = () => {
  return (
    <BackgroundStyle></BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  background-image: url(https://cdn.pet-friends.co.kr/resources/pc/img/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
  position: fixed;
  width: 100vw;
`

export default Background;