import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ResultSentenceWrapper,
  RetryModalContainer,
  SentencyContentContainer,
  SentencyGameNav,
  SentencyInputContainer,
  SentencyLoadingBox,
  SentencyScoreContainer,
  SentencyTranslationContainer,
  SentencyWrapper,
  WordBox,
  WordListContainer,
} from '../styles/SentencyEmotion';
import { GameTitle, CommonInput, CommonBtn } from '../styles/CommonEmotion';
import { H1, H2, H3, H4 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

import Coupon from '../assets/coupon.png';
import { HeartFill } from 'react-bootstrap-icons';
import ModalBasic from '../components/ModalBasic';
import LeaderBoard from '../components/LeaderBoard';
import { AI_API_URL, API_URL } from '../config';
import Loading from '../components/Loading';

function Sentency() {
  const navigate = useNavigate();

  const inputRef = useRef();
  const nextRef = useRef();
  // userId는 추후에 recoil 설정 후 삭제 예정
  const [userId, setUserId] = useState('black');

  const [resultModalShow, setResultModalShow] = useState(false);
  const [retryModalShow, setRetryModalShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);

  const [life, setLife] = useState(5);
  const [score, setScore] = useState(0);
  const [similarity, setSimilarity] = useState(0);
  const [remains, setRemains] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [engSentence, setEngSentence] = useState('');
  const [korSentence, setKorSentence] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [inputArray, setInputArray] = useState(new Array(wordArray.length).fill(''));
  const [finalSentence, setFinalSentence] = useState('');

  const [myRank, setMyRank] = useState();
  const [othersRank, setOthersRank] = useState();

  const [modalLoading, setModalLoading] = useState(false);

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

  const onEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const onEnterNext = (e) => {
    if (e.key === 'Enter') {
      handleNextQuiz();
    }
  };

  // 새로운 게임 콘텐츠 가져오는 함수
  const getQuizContent = () => {
    // 유사도 0으로 초기화
    setSimilarity(0);
    axios
      .get(`${API_URL}/sentency`, {
        // headers: {
        //   'Access-Token': '',
        // },
      })
      .then((res) => {
        // 새로운 이미지 설정
        setImageURL(res.data.sentence.sentenceImageUrl);
        // 빈 칸에 채워진 단어 지우기
        setInputArray(new Array(wordArray.length).fill(''));
        // input창 초기화
        inputRef.current.value = '';
        console.log(res.data.sentence);
        let engSentence = res.data.sentence.content;
        if (engSentence.slice(-1) !== '.') {
          engSentence += '.';
        }
        const korSentence = res.data.sentence.meaningKr;
        // In this picture, 삭제 필터링
        if (engSentence.includes('In this picture,')) {
          let filteredEngSentence = engSentence.substring(17);
          engSentence = filteredEngSentence.charAt(0).toUpperCase() + filteredEngSentence.slice(1);
          console.log(engSentence);
        }
        // Image of 삭제 필터링
        if (engSentence.includes('Image of')) {
          let filteredEngSentence = engSentence.substring(9);
          engSentence = filteredEngSentence.charAt(0).toUpperCase() + filteredEngSentence.slice(1);
          console.log(engSentence);
        }
        // 새로운 영어 문장 설정
        setEngSentence(engSentence);
        // 새로운 한글 번역 문장 설정
        setKorSentence(korSentence);
        // 새로운 빈칸 array 설정
        setWordArray(engSentence.slice(0, -1).split(' '));
      });
  };

  const handleRetry = () => {
    if (remains > 1) {
      console.log('도전 횟수가 아직 남아있다!');
      // console.log(remains);
      setLife(5);
      setRemains(remains - 1);
      getQuizContent();
      setResultModalShow(false);
    } else {
      setResultModalShow(false);
      setRetryModalShow(true);
    }
  };

  const handleUseCoupon = () => {
    if (coupon > 0) {
      // 쿠폰 사용하는 API 보내고
      axios
        .put(`${API_URL}/user/coupon/${userId}/${coupon - 1}`, null, {
          // headers: {
          //   'Access-Token': '',
          // },
        })
        .then((res) => {
          console.log(res);
          console.log('쿠폰 사용 요청 완료');
          setCoupon(coupon - 1);
          // 임시로 remains 1로 변경
          setRemains(remains + 1);
          setLife(5);
          setScore(0);
          setRetryModalShow(false);
          getQuizContent();
        });
    } else {
      alert('쿠폰이 부족하여 재도전이 불가능합니다.');
    }
  };

  const handleSubmit = async () => {
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
      const similar = await calcSimilarity();
      // 정확히 일치하는 단어 세팅해주기
      for (let i = 0; i < tmpWordArray.length; i++) {
        if (tmpWordArray[i].toLowerCase() === wordArray[i].toLowerCase()) {
          inputArray[i] = wordArray[i];
        } else {
          inputArray[i] = '';
        }
      }
      setInputArray([...inputArray]);
      if (similar >= 85) {
        // 성공 모달 띄우고 다음 문제로 넘어가거나
        console.log('성공!');
        setScore(score + 1);
        setFinalSentence(
          inputRef.current.value.slice(-1) === '.' ? inputRef.current.value + ' ' : inputRef.current.value + '. ',
        );
        inputRef.current.blur();
        setSuccessModalShow(true);
        // 바로 다음 문제 넘어가기
        setTimeout(() => {
          nextRef.current.focus();
        }, 200);
        return;
      } else {
        if (life > 0) {
          setLife(life - 1);
        }
      }
    }
  };

  // 유사도 검사 함수
  const calcSimilarity = async () => {
    console.log('유사도 검사 실시!');
    let inputSentence = inputRef.current.value;
    let similarity = 0;
    await axios
      .get(`${AI_API_URL}/sentency/check`, {
        params: {
          solution: engSentence, // 정답 문장
          answer: inputSentence, // 유저 입력 문장
        },
        // headers: {
        //   'Access-Token': '',
        // },
      })
      .then((res) => {
        console.log(res);
        similarity = parseInt(res.data.similarity * 100);
        setSimilarity(similarity);
      });
    return similarity;
  };

  const handleNextQuiz = async () => {
    await getQuizContent();
    await setSuccessModalShow(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/sentency/black`, {
        // headers: {
        //   'Access-Token': '',
        // },
      })
      .then((res) => {
        console.log(res.data);
        setRemains(res.data.sentencyCnt);
        setCoupon(res.data.coupon);

        if (res.data.sentencyCnt > 0) {
          getQuizContent();
          // 하루 sentency 횟수 차감 API
          axios
            .put(`${API_URL}/user/sentency/${userId}/${res.data.sentencyCnt - 1}`, null, {
              // headers: {
              //   'Access-Token': '',
              // },
            })
            .then((res) => {
              console.log(res);
            });
        }
        // 남은 기회가 없다면
        else if (res.data.sentencyCnt === 0) {
          // 재도전 쿠폰 사용할지에 대한 모달 띄워주기
          console.log('하루 도전 횟수를 모두 사용하였습니다.');
          setRetryModalShow(true);
        }
      });
  }, []);

  useEffect(() => {
    if (life === 0) {
      setModalLoading(true);
      // 결과 전송 API
      const sendSentencyResult = async (userId) => {
        await axios
          .put(`${API_URL}/sentency/${userId}/${score}`, null, {
            // headers: {
            //   'Access-Token': '',
            // },
          })
          .then((res) => {
            console.log('sentency 결과 전송 완료');
            console.log(res);
          });
      };

      const getSentencyRank = async (userId) => {
        await axios
          .get(`${API_URL}/sentency/${userId}`, {
            // headers: {
            //   'Access-Token': '',
            // },
          })
          .then((res) => {
            console.log('랭킹 불러오기');
            console.log(res);
            const allRanks = res.data.sentencyRankList;
            const myRank = allRanks.pop();
            setOthersRank(allRanks);
            setMyRank(myRank);
          });
      };

      sendSentencyResult('black');
      // 결과 저장하고 setTimeout 걸어서 랭킹 가져오기
      setTimeout(() => {
        getSentencyRank('black');
      }, 1000);
      // 마지막 기회였다면
      if (remains === 1) {
        setRemains(0);
      }
      // 마지막 입력 문장 설정
      setFinalSentence(
        inputRef.current.value.slice(-1) === '.' ? inputRef.current.value + ' ' : inputRef.current.value + '. ',
      );
      // 결과 모달 보여주기
      setResultModalShow(true);

      setTimeout(() => {
        setModalLoading(false);
      }, 1000);
    }
  }, [life]);

  return (
    <>
      {/* Sentency 성공 모달 */}
      <ModalBasic modalShow={successModalShow} setModalShow={setSuccessModalShow}>
        <H1 color={colors.gamePink500}>SUCCESS</H1>
        <H3 padding={'3rem 0'}>유사도: {similarity}%</H3>
        <ResultSentenceWrapper>
          <div className='flex-column mine'>
            <H4>나의 문장</H4>
            <H4>{finalSentence}</H4>
          </div>
          <div className='flex-column quiz'>
            <H4>정답 문장</H4>
            <H4>{engSentence}</H4>
          </div>
        </ResultSentenceWrapper>
        <CommonBtn
          padding={'1rem 3rem'}
          color={colors.gameBlue500}
          fontColor={colors.white}
          font={1.5}
          border={'none'}
          ref={nextRef}
          onClick={handleNextQuiz}
          onKeyPress={onEnterNext}
        >
          NEXT
        </CommonBtn>
      </ModalBasic>
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
          <H4>보유 재도전 쿠폰: {coupon}장</H4>
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
              onClick={handleUseCoupon}
            >
              확인
            </CommonBtn>
          </div>
        </RetryModalContainer>
      </ModalBasic>
      {/* Sentency 결과 모달 */}
      <ModalBasic modalShow={resultModalShow} setModalShow={setResultModalShow}>
        {modalLoading ? (
          <SentencyLoadingBox>
            <H4 color={colors.black} padding='0 0 3rem 0'>
              게임 결과를 불러오는 중입니다...
            </H4>
            <Loading />
          </SentencyLoadingBox>
        ) : (
          <>
            <H1 color={colors.gamePink500}>FAILED</H1>
            <SentencyScoreContainer>
              {modalLoading ? null : <LeaderBoard others={othersRank} mine={myRank} />}
              <div className='flex-column sentencyResult'>
                <div className='sentencyScoreBox'>
                  <H4>점수: {score}점</H4>
                  {myRank !== undefined ? <H4>오늘의 최고 점수: {myRank.score}점</H4> : null}
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
                onClick={handleRetry}
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
                홈으로
              </CommonBtn>
            </div>
          </>
        )}
      </ModalBasic>
      <SentencyWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2}>
            SENTENCY
          </H1>
        </GameTitle>
        {remains > 0 ? (
          <div className='sentencyContentContainer'>
            <SentencyGameNav>
              <div className='flex'>
                <H3 color={colors.white}>SCORE: {score},</H3>
                <H3 color={colors.white} margin={'0 0 0 1rem'}>
                  SIMILARITY: {similarity}%
                </H3>
              </div>
              <div className='heart-container'>{renderLife(life)}</div>
            </SentencyGameNav>
            <SentencyContentContainer>
              <img src={imageURL} className='sentencyImg' alt='img' />
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
                onKeyPress={onEnterSubmit}
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
        ) : null}
      </SentencyWrapper>
    </>
  );
}

export default Sentency;
