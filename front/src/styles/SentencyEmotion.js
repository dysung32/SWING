import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const SentencyWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh + 9rem);
  padding: 0 10%;
  padding-top: 9rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
  background: linear-gradient(to top right, rgba(236, 61, 89, 0.5), rgba(22, 86, 233, 0.5));
`;

export const SentencyImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;

  .sentencyImg {
    height: 20rem;
  }

  .heart {
    color: ${colors.gamePink500};
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

export const SentencyGameNav = styled.div`
  display: flex;
  justify-content: space-between;

  .heart-container {
    display: flex;
    align-items: center;
  }
`;

export const WordListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2rem;

  .finishDot {
    color: ${colors.white};
    height: 3rem;
    font-size: 2rem;
    line-height: 5rem;
  }
`;

export const WordBox = styled.span`
  width: ${(props) => `${props.width}rem`};
  height: 3rem;
  border-bottom: 3px solid ${colors.white};
  color: ${colors.white};
  margin-right: 1rem;
  font-size: 2rem;
  line-height: 3rem;
  letter-spacing: ${(props) => (props.length > 1 ? '0.3rem' : 'initial')};
  text-align: center;
`;

export const SentencyInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SentencyScoreContainer = styled.div`
  display: flex;
  padding: 2rem 0;

  .sentencyResult {
    padding-left: 2rem;
  }

  .sentencyScoreBox,
  .sentencyAnswerBox {
    padding: 2rem;
    border-radius: 1rem;
    border: 2px solid ${colors.gameBlue300};
  }

  .sentencyScoreBox {
    margin-bottom: 1rem;
  }
`;

export const RetryModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .retryInfo {
    padding-top: 2rem;
    padding-bottom: 1rem;
    font-size: 1.5rem;
  }

  .retrySubInfo {
    color: ${colors.gray500};
    padding-bottom: 2rem;
  }

  .coupon {
    width: 10rem;
  }

  .retryBtns {
    padding-top: 3rem;
  }
`;
