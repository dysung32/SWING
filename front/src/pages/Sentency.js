import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  RetryModalContainer,
  SentencyContentContainer,
  SentencyGameNav,
  SentencyInputContainer,
  SentencyScoreContainer,
  SentencyTranslationContainer,
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

  const inputRef = useRef();

  const [resultModalShow, setResultModalShow] = useState(false);
  const [retryModalShow, setRetryModalShow] = useState(false);

  const [life, setLife] = useState(5);
  const [score, setScore] = useState(0);
  const [remains, setRemains] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [engSentence, setEngSentence] = useState('');
  const [korSentence, setKorSentence] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [inputArray, setInputArray] = useState(new Array(wordArray.length).fill(''));
  const [finalSentence, setFinalSentence] = useState('');

  const renderLife = (life) => {
    const lifeArray = [];
    for (let idx = 0; idx < life; idx++) {
      lifeArray.push(<HeartFill key={idx} className='heart' />);
    }

    return lifeArray;
  };

  const renderWordList = () => {
    const wordBoxArray = [];
    for (let idx = 0; idx < wordArray.length; idx++) {
      wordBoxArray.push(
        <WordBox key={idx} width={wordArray[idx].length * 2} spacing={wordArray[idx].length}>
          {inputArray[idx]}
        </WordBox>,
      );
    }
    return wordBoxArray;
  };

  const handleRetryModal = () => {
    // 목숨 수 초기화
    setLife(5);
    setResultModalShow(false); // 기존 모달 닫고
    setRetryModalShow(true); // 다시 시도 status true 처리
  };

  const handleRetry = () => {
    // 쿠폰 사용하는 API 보내고
    // 게임 RETRY

    setRemains(remains + 1);
    setRetryModalShow(false);
    navigate('/sentency');
  };

  const handleSubmit = () => {
    let inputSentence = inputRef.current.value;
    // 입력 문장에 온점을 포함하고 있으면
    if (inputSentence.slice(-1) === '.') {
      inputSentence = inputSentence.slice(0, -1); // 온점 삭제해주기
    }
    const tmpWordArray = inputSentence.split(' ');
    if (tmpWordArray.length !== wordArray.length) {
      alert('제시된 문장의 단어 수와 동일한 문장을 입력해주세요.');
      return;
    } else {
      let cnt = 0;
      for (let i = 0; i < tmpWordArray.length; i++) {
        if (tmpWordArray[i].toLowerCase() === wordArray[i].toLowerCase()) {
          cnt += 1;
          inputArray[i] = wordArray[i];
        } else {
          inputArray[i] = '';
        }
      }
      console.log(cnt);
      setInputArray([...inputArray]);
      if (cnt === wordArray.length) {
        // 성공 모달 띄우고 다음 문제로 넘어가거나
        console.log('성공!');
        setScore(score + 1);
        // 빈 칸에 채워진 단어 지우기
        // setInputArray(new Array(wordArray.length).fill(''));
        // // input창 초기화
        // inputRef.current.value = '';
        // setRemains(remains - 1);
        // 바로 다음 문제 넘어가기
        return;
      } else {
        if (life > 0) {
          setLife(life - 1);
        }
      }
    }
  };

  useEffect(() => {
    // 빈 칸에 채워진 단어 지우기
    setInputArray(new Array(wordArray.length).fill(''));
    // input창 초기화
    inputRef.current.value = '';
    axios
      .get('http://j8a405.p.ssafy.io:8080/api/sentency', {
        // headers: {
        //   'Access-Token': '',
        // },
      })
      .then((res) => {
        if (remains > 0) {
          setImageURL(res.data.sentence.sentenceImageUrl);
          console.log(res.data.sentence);
          let engSentence = res.data.sentence.content;
          if (engSentence.slice(-1) !== '.') {
            engSentence += '.';
          }
          const korSentence = res.data.sentence.meaningKr;
          if (engSentence.includes('In this picture,')) {
            let filteredEngSentence = engSentence.substring(17);
            engSentence = filteredEngSentence.charAt(0).toUpperCase() + filteredEngSentence.slice(1);
            console.log(engSentence);
          }
          if (engSentence.includes('Image of')) {
            let filteredEngSentence = engSentence.substring(9);
            engSentence = filteredEngSentence.charAt(0).toUpperCase() + filteredEngSentence.slice(1);
            console.log(engSentence);
          }
          setEngSentence(engSentence);
          setKorSentence(korSentence);
          setWordArray(engSentence.slice(0, -1).split(' '));
        }
      });
  }, [score, remains]);

  useEffect(() => {
    axios
      .get('http://j8a405.p.ssafy.io:8080/api/user/sentency/1', {
        // headers: {
        //   'Access-Token': '',
        // },
      })
      .then((res) => {
        console.log(res.data);
        setRemains(res.data.sentencyCnt);
        console.log('sentency 남은 기회 ' + remains);
        // 남은 기회가 없다면
        if (remains === 0) {
          // 재도전 쿠폰 사용할지에 대한 모달 띄워주기
          setRetryModalShow(true);
        }
      });
  }, []);

  useEffect(() => {
    if (life === 0) {
      setFinalSentence(
        inputRef.current.value.slice(-1) === '.' ? inputRef.current.value + ' ' : inputRef.current.value + '. ',
      );
      setResultModalShow(true);
    }
  });

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
          <div className='retrySubInfo'>재도전 쿠폰은 복습 테스트를 통해 획득이 가능합니다.</div>
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
              <H4>점수: {score}점</H4>
              <H4>오늘의 시도 횟수: 2회</H4>
              <H4>오늘의 최고 점수: 8점</H4>
            </div>
            <div className='sentencyAnswerBox'>
              <H4>오답 정리</H4>
              <H4 color={'#FF0000'}>
                {/* inputRef에 따라 다르게 보여주기 */}
                {finalSentence}
                (X)
              </H4>
              <H4 color={colors.gameBlue300}>{engSentence} (O)</H4>
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
        <div className='scroll'>
          <SentencyGameNav>
            <H3 color={colors.white}>SCORE: {score}</H3>
            <div className='heart-container'>{renderLife(life)}</div>
          </SentencyGameNav>
          <SentencyContentContainer>
            <img src={imageURL} className='sentencyImg' alt='quizImg' />
            <div className='flex-column contentRight'>
              <SentencyTranslationContainer>
                <H4 color={colors.white}>{korSentence}</H4>
              </SentencyTranslationContainer>
              <div className='wordListCenter'>
                <WordListContainer>
                  {renderWordList()}
                  <span className='finishDot'>.</span>
                </WordListContainer>
              </div>
            </div>
          </SentencyContentContainer>
          <SentencyInputContainer>
            <CommonInput
              maxWidth={'720px'}
              height={55}
              flexGrow={1}
              font={1.5}
              border={'none'}
              padding={'1rem'}
              ref={inputRef}
            />
            <CommonBtn
              height={55}
              font={1.5}
              color={colors.gameBlue300}
              fontColor={colors.white}
              border={'none'}
              padding={'12px 36px'}
              margin={'0 0 0 1rem'}
              onClick={handleSubmit}
            >
              SUBMIT
            </CommonBtn>
          </SentencyInputContainer>
        </div>
      </SentencyWrapper>
    </>
  );
}

export default Sentency;
