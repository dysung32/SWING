import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userIdState = atom({
  key: 'userId',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userNicknameState = atom({
  key: 'nickname',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userImgState = atom({
  key: 'profileImageUrl',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const sentencyCntState = atom({
  key: 'sentencyCnt',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const fiveCntState = atom({
  key: 'fiveCnt',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
