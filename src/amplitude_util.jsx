import { init, track, setUserId, reset } from '@amplitude/analytics-browser';

const API_KEY = '2eb40f7cdcfb1bc9a9258300ca9ad5e7';

export const initAmplitude = () => {
  init(API_KEY);
};

// eventProperties = 객체(버전, 페이지등의 정보)를 같이 보내줌
export const logEvent = (eventName, eventProperties) => {
  track(eventName, eventProperties);
};

// AmplitudeId = 디바이스 id
// 디바이스 id의 맹점을 보완하고자 userId 도입 = setUserId
export const setAmplitudeUserId = (userId) => {
  setUserId(userId);
};

// resetAmplitude = 디바이스 id, userId 모두 초기화
// 로그아웃에 넣기
export const resetAmplitude = () => {
  reset();
};
