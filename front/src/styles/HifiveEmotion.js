import styled from '@emotion/styled';
import { colors } from './ColorPalette';

const HifiveWrapper = styled.div`
  padding-top: 9rem;
  width: 100%;
  height: calc(100vh - 9rem);
  background-color: #4F84FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const HifiveContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  column-gap: 2rem;
`;

const ProblemtoalContainer = styled.div`
  grid-column: 1/10;
  grid-row: 1/10;
`;

const GameinfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .heart-container {
    display: flex;
    align-items: center;
  }

  .heart {
    color: ${colors.gamePink500};
    font-size: 2.1rem;
    margin-right: 1rem;
  }
`;

const AnswertotalContainer = styled.div`
  grid-column: 10/13;
  grid-row: 1/10;
`;

const AnswerContainer = styled.div`
  width: 100%;
  border: 1px solid #FFFFFF;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  height: 100%;
`;

const ProblemContainer = styled.div`
  width: 100%;
  border: 1px solid #FFFFFF;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  height: 100%;
`;

const InputContainer = styled.form`
  grid-column: 1/10;
  grid-row: 11;
  display: flex;
  gap: 0.5rem;
  padding-top: 2rem;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .ModalContent {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.5rem;
  }
`;

export const TemporaryRanking = styled.div`
  border-radius: 2rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => props.color};
`;

export const HifiveStatistics = styled.div`
  border-radius: 2rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => props.color};
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;

  .resultBox {
    display: flex;
    gap: 4rem;
    padding-top: 2rem;
  }
`;




export { HifiveWrapper,
  HifiveContainer,
  AnswerContainer,
  ProblemContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  AnswertotalContainer,
  InputContainer,
};
