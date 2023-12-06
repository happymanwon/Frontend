export const shareKakao = () => {
  const { Kakao, location } = window;
  Kakao.Link.sendScrap({
    requestUrl: location.href,
  });
};
