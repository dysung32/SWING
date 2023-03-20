import styled from '@emotion/styled';

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
`;

const ScorePoint = styled.span`
  font-size: 2rem;
  color: white;
`;

const LifePoint = styled.span`
`;

const AnswertotalContainer = styled.div`
  grid-column: 10/13;
  grid-row: 1/10;
`;

const AnswerText = styled.span`
  font-size: 2rem;
  color: white;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ModalContent {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 61%;
    padding: 0px 6rem 0px 6rem;
    box-sizing: content-box;
  }
`;

export const TemporaryRanking = styled.div`
  width: 27.5%;
  height: 100%;
  border-radius: 2rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => props.color};
`;

export const HifiveStatistics = styled.div`
  width: 48.5%;
  height: 100%;
  border-radius: 2rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
`;


export { HifiveWrapper,
  HifiveContainer,
  AnswerContainer,
  ProblemContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  ScorePoint,
  LifePoint,
  AnswertotalContainer,
  AnswerText,
  InputContainer,
};
