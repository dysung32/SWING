import React, { createRef, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  RetryModalContainer,
  SentencyGameNav,
  SentencyImgContainer,
  SentencyInputContainer,
  SentencyScoreContainer,
  SentencyWrapper,
  WordBox,
  WordListContainer,
} from '../styles/SentencyEmotion';
import { GameTitle, CommonInput, CommonBtn } from '../styles/CommonEmotion';
import { H1, H2, H3, H4 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

import Bike from '../assets/bike.jpg';
import Coupon from '../assets/coupon.png';
import { HeartFill } from 'react-bootstrap-icons';
import ModalBasic from '../components/ModalBasic';
import LeaderBoard from '../components/LeaderBoard';

function Sentency() {
  const navigate = useNavigate();

  const [resultModalShow, setResultModalShow] = useState(false);
  const [retryModalShow, setRetryModalShow] = useState(false);

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

  const openResultModalHandler = () => {
    setResultModalShow(true);
  };

  const handleRetryModal = () => {
    setResultModalShow(false); // 기존 모달 닫고
    setRetryModalShow(true); // 다시 시도 status true 처리
  };

  const handleRetry = () => {
    // 쿠폰 사용하는 API 보내고
    // 게임 RETRY
    setRetryModalShow(false);
    navigate('/sentency');
  };

  return (
    <>
      {/* Sentency 재시도 모달 */}
      <ModalBasic modalShow={retryModalShow} setModalShow={setRetryModalShow}>
        <H2 color={colors.gamePink500}>도전 횟수 소진</H2>
        <RetryModalContainer>
          <div className='retryInfo'>
            일일 도전 횟수를 모두 사용하셨습니다.
            <br />
            재도전 쿠폰을 사용해 추가 도전하시겠습니까?
          </div>
          <div className='retrySubInfo'>재도전 쿠폰은 복습 테스트를 통과하면 얻을 수 있습니다.</div>
          <img src={Coupon} className='coupon' alt='coupon' />
          <H4>보유 재도전 쿠폰: 3장</H4>
          <div className='flex retryBtns'>
            <CommonBtn
              padding={'1rem 3rem'}
              color={colors.gray500}
              fontColor={colors.white}
              font={1.5}
              border={'none'}
              margin={'0 5rem 0 0'}
              onClick={() => navigate('/')}
            >
              취소
            </CommonBtn>
            <CommonBtn
              padding={'1rem 3rem'}
              color={colors.gameBlue500}
              fontColor={colors.white}
              font={1.5}
              border={'none'}
              onClick={handleRetry}
            >
              확인
            </CommonBtn>
          </div>
        </RetryModalContainer>
      </ModalBasic>
      {/* Sentency 결과 모달 */}
      <ModalBasic modalShow={resultModalShow} setModalShow={setResultModalShow}>
        <H1 color={colors.gamePink500}>FAILED</H1>
        <SentencyScoreContainer>
          <LeaderBoard />
          <div className='flex-column sentencyResult'>
            <div className='sentencyScoreBox'>
              <H4>점수: 5점</H4>
              <H4>오늘의 시도 횟수: 2회</H4>
              <H4>오늘의 최고 점수: 8점</H4>
            </div>
            <div className='sentencyAnswerBox'>
              <H4>오답</H4>
              <H4 color={'#FF0000'}>Dog is eating river. (X)</H4>
              <H4 color={colors.gameBlue300}>A dog is drinking water from the river. (O)</H4>
            </div>
          </div>
        </SentencyScoreContainer>
        <div className='flex'>
          <CommonBtn
            padding={'1rem 4rem'}
            color={colors.gamePink500}
            fontColor={colors.white}
            font={1.5}
            border={'none'}
            margin={'0 5rem 0 0'}
            onClick={handleRetryModal}
          >
            재시도
          </CommonBtn>
          <CommonBtn
            padding={'1rem 4rem'}
            color={colors.gameBlue300}
            fontColor={colors.white}
            font={1.5}
            border={'none'}
            onClick={() => navigate('/')}
          >
            메인 페이지
          </CommonBtn>
        </div>
      </ModalBasic>
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
          <img src={Bike} className='sentencyImg' alt='quizImg' />
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
            onClick={openResultModalHandler}
          >
            SUBMIT
          </CommonBtn>
        </SentencyInputContainer>
      </SentencyWrapper>
    </>
  );
}

export default Sentency;
