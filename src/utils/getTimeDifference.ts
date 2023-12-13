export function getTimeDifference(createdAt) {
  const currentDate = new Date();
  const postDate: Date = new Date(createdAt);
  const timeDifference: number = currentDate.getTime() - postDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  } else if (hours >= 1) {
    return `${hours}시간 전`;
  } else if (minutes >= 1) {
    return `${minutes}분 전`;
  } else {
    return "방금";
  }
}
