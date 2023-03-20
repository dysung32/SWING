import React, { useState } from 'react';
import { HifiveWrapper,
  HifiveContainer,
  ProblemContainer,
  AnswerContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  AnswertotalContainer,
  InputContainer,
  ModalContainer,
  HifiveStatistics,
  TemporaryRanking } from "../styles/HifiveEmotion"
import { CommonInput, 
  CommonBtn, 
  CommonModalBackdrop, 
  CommonModalView,
  GameTitle } from "../styles/CommonEmotion"
import { H1,H2, H3 } from "../styles/Fonts"
import { colors } from "../styles/ColorPalette"
import ModalBasic from "../components/ModalBasic"
import { HeartFill } from 'react-bootstrap-icons';

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
              <H3 color={colors.white}>SCORE:</H3>
              <div className='heart-container'>
                <HeartFill className='heart'/>
                <H3 color={colors.gamePink500}> X 10</H3>
              </div>
            </GameinfoContainer>
            <ProblemContainer></ProblemContainer>
          </ProblemtoalContainer>
          <AnswertotalContainer>
            <H3 color={colors.white} font={2} >ANSWERS</H3>
            <AnswerContainer></AnswerContainer>
          </AnswertotalContainer>
          <InputContainer>
            <CommonInput width="100%" height={74} font={2} border={'none'} padding={'1rem 2rem'}/>
            <CommonBtn width="22%" height={74} font={2} color={colors.gameBlue100} hoverColor="#516AD3">
              <H3 align={"center"}>입력</H3>
            </CommonBtn>
          </InputContainer>
        </HifiveContainer>
        {/* <CommonModalBackdrop>
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
                  <H2 color={colors.black}>통계</H2>
                  <div className='resultBox'>
                  </div>
                </HifiveStatistics>
              </div>
              <CommonBtn width="34.7%"
              height = {74} 
              font={2} 
              color={colors.gameYellow300}
              hoverColor={colors.gameYellow400}
              margin="3rem"
              border={"none"}>
                메인페이지
              </CommonBtn>
            </ModalContainer>
          </CommonModalView>
        </CommonModalBackdrop> */}
      </HifiveWrapper>
      {/* <ModalBasic>
        <ModalContainer>
          <GameTitle>
            <H1 color={colors.gamePink500}>SUCCESS</H1>
          </GameTitle>
          <div className='ModalContent'>
            <TemporaryRanking>
              rank
            </TemporaryRanking>
            <HifiveStatistics color={colors.gameBlue200}>
              <H2 color={colors.black}>통계</H2>
              <div className='resultBox'>
              </div>
            </HifiveStatistics>
          </div>
          <CommonBtn width="34.7%"
          height = {74} 
          font={2} 
          color={colors.gameYellow300}
          hoverColor={colors.gameYellow400}
          margin="3rem"
          border={"none"}>
            메인페이지
          </CommonBtn>
        </ModalContainer>
      </ModalBasic> */}
    </>
  );
}

export default Hifive;
