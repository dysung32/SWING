import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const HistoryContentContainer = styled.div`
  width: 100%;
  height: 75%;
  padding: 2rem;
  background-color: ${colors.white};
  border-radius: 1.5rem;
  box-sizing: border-box;
`;

export const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SingleHistoryList = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-bottom: 2px solid ${colors.gameBlue500};
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1.2rem;
  color: ${colors.gameBlue500};

  &:hover {
    background-color: #f4f6ff;
  }

  .history-date {
    flex: 0.4;
  }

  .history-title {
    flex: 0.5;
  }

  .history-rank {
    flex: 0.1;
    text-align: end;
  }
`;
