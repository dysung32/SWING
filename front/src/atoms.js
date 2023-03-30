import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userId',
  default: '',
});

export const userNicknameState = atom({ key: 'nickname', default: '' });

export const userImgState = atom({ key: 'profileImageUrl', default: '' });

export const sentencyCntState = atom({
  key: 'sentencyCnt',
  default: 0,
});

export const fiveCntState = atom({ key: 'fiveCnt', default: 0 });
