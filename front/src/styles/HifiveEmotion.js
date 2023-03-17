import styled from '@emotion/styled';

const HifiveWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 9rem);
  background-color: #4F84FF;
  `;

const HifiveContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  column-gap: 2rem;
  padding-top: 2rem;
`;

const HifiveTitle = styled.h1`
  margin: 0;
  text-align: center;
  padding-top: 1rem;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;

  color: white;
  text-shadow: -1.5px 0 #0B2D7B, 0 1.5px #0B2D7B, 1.5px 0 #0B2D7B, 0 -1.5px #0B2D7B;
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
  grid-row: 12;
  display: flex;
  gap: 0.5rem;
`;


export { HifiveWrapper,
  HifiveContainer,
  HifiveTitle,
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
