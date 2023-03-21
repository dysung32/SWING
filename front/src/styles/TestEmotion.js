import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 0 10%;
  padding-top: 9rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
`;

export const TestContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0 2rem 0;
`;

export const SingleWordTestContainer = styled.div`
  display: flex;
  padding-bottom: 2rem;
`;

export const WordMeaning = styled.div`
  flex-grow: 1;
  padding: 0 2rem;
  font-size: 1.5rem;
  font-weight: 700;
`;
