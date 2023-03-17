import styled from '@emotion/styled';
import { colors } from './ColorPalette';
import gridnote from '../assets/gridnote.jpg';

export const ReviewNoteWrapper = styled.div`
  background-image: url(${gridnote});
`;

export const ReviewNoteWrapperColor = styled.div`
  display: flex;
  // align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  padding-top: 9rem;
  box-sizing: border-box;
  background-color: rgba(129, 147, 221, 0.1);
`;
