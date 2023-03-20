import React, { useState } from 'react';
import { HifiveWrapper,
  HifiveContainer,
  ProblemContainer,
  AnswerContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  ScorePoint,
  LifePoint,
  AnswertotalContainer,
  AnswerText,
  InputContainer,
  ModalContainer,
  HifiveStatistics,
  TemporaryRanking } from "../styles/HifiveEmotion"
import { CommonInput, 
  CommonBtn, 
  CommonModalBackdrop, 
  CommonModalView,
  GameTitle } from "../styles/CommonEmotion"
import { H1 } from "../styles/Fonts"
import { colors } from "../styles/ColorPalette"

function Hifive() {

  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = (e) => {
    setIsOpen(!isOpen)
  };

  return (
    <>
      <HifiveWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2}>Hi-five</H1>
        </GameTitle>
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
            <CommonInput height={74} font={2} border={'none'} padding={'1rem 2rem'}/>
            <CommonBtn width="22%" height={74} font={2} color={colors.gameBlue100} hoverColor="#516AD3">입력</CommonBtn>
          </InputContainer>
        </HifiveContainer>
        <CommonModalBackdrop>
          <CommonModalView width="67%" height="80%">
            <ModalContainer>
              <GameTitle>
                <H1 color={colors.gamePink500}>SUCCESS</H1>
              </GameTitle>
              <div className='ModalContent'>
                <TemporaryRanking>
                  rank
                </TemporaryRanking>
                <HifiveStatistics color={colors.gameBlue200}>
                  ok
                </HifiveStatistics>
              </div>
            </ModalContainer>
          </CommonModalView>
        </CommonModalBackdrop>
      </HifiveWrapper>
    </>
  );
}

export default Hifive;
