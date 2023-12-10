export const ShareKakao = () => {
  const { Kakao, location } = window;
  Kakao.Link.sendScrap({
    requestUrl: location.href,
  });
};
