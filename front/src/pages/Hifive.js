import React from 'react';
import { HifiveWrapper,
  HifiveContainer,
  HifiveTitle,
  ProblemContainer,
  AnswerContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  ScorePoint,
  LifePoint,
  AnswertotalContainer,
  AnswerText,
  InputContainer } from "../styles/HifiveEmotion"
import { CommonInput, CommonBtn } from "../styles/CommonEmotion"

function Hifive() {
  return (
    <>
      <HifiveWrapper>
      <HifiveTitle>HI-FIVE</HifiveTitle>
        <HifiveContainer>
          <ProblemtoalContainer>
            <GameinfoContainer>
              <ScorePoint>Score: </ScorePoint>
              <LifePoint></LifePoint>
            </GameinfoContainer>
            <ProblemContainer></ProblemContainer>
          </ProblemtoalContainer>
          <AnswertotalContainer>
            <AnswerText>Answers</AnswerText>
            <AnswerContainer></AnswerContainer>
          </AnswertotalContainer>
          <InputContainer>
            <CommonInput width="75%" height="74"/>
            <CommonBtn width="22%" height="74" color='#CDDCFF' hoverColor="#516AD3" font="2">입력</CommonBtn>
          </InputContainer>
        </HifiveContainer>
      </HifiveWrapper>
    </>
  );
}

export default Hifive;
