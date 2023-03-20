import styled from '@emotion/styled';
import { colors } from './ColorPalette';
import gridnote from '../assets/gridnote.jpg';

export const ReviewNoteWrapper = styled.div`
  background-image: url(${gridnote});
`;

export const ReviewNoteWrapperColor = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  padding-top: 9rem;
  box-sizing: border-box;
  background-color: rgba(129, 147, 221, 0.1);

  .selectButton {
    display: flex;
    gap: 1.5rem;
  }

  .noteTitle {
    padding-bottom: 2rem;
  }
`;

export const WordBox = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

export const ReviewBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrongWordBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
   margin-bottom: 1rem;
  gap: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${colors.white};
  padding: 1rem 2rem 1rem 2rem;
  box-sizing: border-box;

  .wordMean {
    font-size: 24px;
  }

  .checkBtn {
    font-size: 2.5rem;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;