import React, { useState } from 'react';
import axios from 'axios';
import {
  SentencyGameNav,
  SentencyImgContainer,
  SentencyInputContainer,
  SentencyWrapper,
  WordBox,
  WordListContainer,
} from '../styles/SentencyEmotion';
import { GameTitle, CommonInput, CommonBtn } from '../styles/CommonEmotion';
import { H1, H4 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

import Bike from '../assets/bike.jpg';
import { HeartFill } from 'react-bootstrap-icons';
import ModalBasic from '../components/ModalBasic';
import ModalClosable from '../components/ModalClosable';

function Sentency() {
  const [modalShow, setModalShow] = useState(false);
  const [life, setLife] = useState(5);
  const [wordArray, setWordArray] = useState(['A', 'man', 'is', 'riding', 'a', 'bike']);

  // axios.get('http://j8a405.p.ssafy.io:8000/api/test').then((res) => {
  //   console.log(res);
  // });

  const renderLife = (life) => {
    const lifeArray = [];
    for (let idx = 0; idx < life; idx++) {
      lifeArray.push(<HeartFill key={idx} className='heart' />);
    }

    return lifeArray;
  };

  const renderWordList = (wordArray) => {
    const wordBoxArray = [];
    for (let idx = 0; idx < wordArray.length; idx++) {
      wordBoxArray.push(
        <WordBox key={idx} width={wordArray[idx].length * 2.5} length={wordArray[idx].length}>
          {wordArray[idx]}
        </WordBox>,
      );
    }
    return wordBoxArray;
  };

  const openModalHandler = () => {
    setModalShow(true);
  };

  return (
    <>
      <ModalClosable modalShow={modalShow} setModalShow={setModalShow}>
        <div>HI MY NAME IS DAYEON</div>
      </ModalClosable>
      <SentencyWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2}>
            SENTENCY
          </H1>
        </GameTitle>
        <SentencyImgContainer>
          <SentencyGameNav>
            <H4 color={colors.white}>SCORE: 0</H4>
            <div className='heart-container'>{renderLife(life)}</div>
          </SentencyGameNav>
          <img src={Bike} className='sentencyImg' />
        </SentencyImgContainer>
        <WordListContainer>
          {renderWordList(wordArray)}
          <span className='finishDot'>.</span>
        </WordListContainer>
        <SentencyInputContainer>
          <CommonInput maxWidth={'720px'} height={55} flexGrow={1} font={1.5} border={'none'} padding={'1rem'} />
          <CommonBtn
            height={55}
            font={1.5}
            color={colors.gameBlue300}
            fontColor={colors.white}
            border={'none'}
            padding={'12px 36px'}
            margin={'0 0 0 1rem'}
            onClick={openModalHandler}
          >
            SUBMIT
          </CommonBtn>
        </SentencyInputContainer>
      </SentencyWrapper>
    </>
  );
}

export default Sentency;
