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

function Sentency() {
  const [life, setLife] = useState(5);
  const [wordArray, setWordArray] = useState(['A', 'man', 'is', 'riding', 'a', 'bike']);

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

  return (
    <>
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
          >
            SUBMIT
          </CommonBtn>
        </SentencyInputContainer>
      </SentencyWrapper>
    </>
  );
}

export default Sentency;
