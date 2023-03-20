import styled from '@emotion/styled';
import { colors } from './ColorPalette';
import MyPageSwing from '../assets/mypage_swing.png';

export const MyPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  padding-top: 9rem;
  box-sizing: border-box;
  background-color: ${colors.studyBlue300};
`;

export const MyPageContentContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  width: 100%;
  height: 75%;
  box-sizing: border-box;
`;

export const MyPageMainConatiner = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 10;
  box-sizing: border-box;
`;

export const MyPageProfileConatiner = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 10;
  grid-column-end: 13;
  background-color: blue;
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const MyPageIntroConatiner = styled.div`
  widht: 100%;
  height: 30%;
  padding: 1.5rem;
  background-color: ${colors.white};
  background-image: url(${MyPageSwing});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right 10% bottom;
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const MyPageHistoryConatiner = styled.div`
  display: flex;
  flex-direction: column;
  widht: 100%;
  height: calc(70% - 2rem);
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: ${colors.white};
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const MyPageHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const MyPageHistoryList = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-bottom: 2px solid ${colors.gameBlue500};
  box-sizing: border-box;
`;
