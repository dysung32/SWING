import { useState } from 'react';
import ModalBasic from '../components/ModalBasic';
import { colors } from '../styles/ColorPalette';
import { CommonBtn, CommonInput } from '../styles/CommonEmotion';
import { H1, H2, H3, H4 } from '../styles/Fonts';
import {
  SingleWordTestContainer,
  TestContainer,
  TestModalTitle,
  TestWrapper,
  WordMeaning,
  WordTestContentContainer,
} from '../styles/TestEmotion';
import Coupon from '../assets/coupon.png';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

function WordTest() {
  const navigate = useNavigate();
  const [wordList, setWordList] = useState([
    {
      word: 'apple',
      meaning: 'a round fruit with red, yellow, or green skin and firm white flesh',
    },
    {
      word: 'dentist',
      meaning: `a person whose job is to care for people's teeth`,
    },
    {
      word: 'swing',
      meaning: 'to move backward and forward or from side to side while hanging from something',
    },
    {
      word: 'amazing',
      meaning: 'causing great surprise or wonder, causing amazement',
    },
    {
      word: 'chocolate',
      meaning:
        'a food that is made from cacao beans and that is eaten as candy or used as a flavoring ingredient in other sweet foods',
    },
  ]);

  const [inputList, setInputList] = useState(['', '', '', '', '']);
  const [correctList, setCorrectList] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [resultModalShow, setResultModalShow] = useState(false);

  const onChangeInput = async (e) => {
    let index = e.target.id.slice(-1);
    inputList[index - 1] = e.target.value;
    await setInputList([...inputList]);
  };

  const handleSubmit = () => {
    // 5개 답안 모두 입력했다면 (유효성 검사)
    // 5개 답안 모두 입력해줘야 submit 가능
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i] === '') {
        const el = document.getElementById(`input${i + 1}`);
        el.focus();
        alert('5개의 답안을 모두 입력해주세요!');
        return;
      }
    }
    // 단어 5개 모두 입력했다면
    // 점수 계산 함수 호출
    const result = calcScore();
    setScore(result);
    // 결과 모달 활성화
    setResultModalShow(true);
    console.log('답안 제출!');
  };

  // 단어 복습 테스트 점수 계산하는 함수
  const calcScore = () => {
    let score = 0;
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i] === wordList[i].word) {
        correctList[i] = true;
        setCorrectList([...correctList]);
        score += 1;
      }
    }
    return score;
  };

  const handleContinue = () => {
    setResultModalShow(false);
    // 다음 문제 불러오는 axios 코드
    // input 다 지우고
    for (let i = 0; i < inputList.length; i++) {
      const el = document.getElementById(`input${i + 1}`);
      el.value = '';
    }
    // setWordList 새로 해주기
    setCorrectList([false, false, false, false, false]);
    navigate('/test-word');
  };

  const handleExit = () => {
    setResultModalShow(false);
    navigate('/review-note', { state: true }); // 종료 누르면 오답노트로 navigate
  };

  return (
    <>
      <ModalBasic modalShow={resultModalShow} setModalShow={setResultModalShow}>
        <TestModalTitle>
          {score === 5 ? (
            <>
              <object
                type='image/svg+xml'
                data='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23fe5671" fill-opacity="0" d="M12 20L20.5 11V7L17 5.5L12 7L7 5.5L3.5 7V11L12 20Z"%3E%3Canimate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.5s" values="0%3B1"%2F%3E%3C%2Fpath%3E%3Cpath fill="none" stroke="%23fe5671" stroke-dasharray="30" stroke-dashoffset="30" stroke-linecap="round" stroke-width="2" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30%3B0"%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
                className='resultEmoji'
              ></object>
              <H1 color={colors.gamePink400}>SUCCESS</H1>
              <object
                type='image/svg+xml'
                data='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23fe5671" fill-opacity="0" d="M12 20L20.5 11V7L17 5.5L12 7L7 5.5L3.5 7V11L12 20Z"%3E%3Canimate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.5s" values="0%3B1"%2F%3E%3C%2Fpath%3E%3Cpath fill="none" stroke="%23fe5671" stroke-dasharray="30" stroke-dashoffset="30" stroke-linecap="round" stroke-width="2" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30%3B0"%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
                className='resultEmoji'
              ></object>
            </>
          ) : (
            <>
              <object
                type='image/svg+xml'
                data='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cg stroke="%23fe5671" stroke-linecap="round" stroke-width="2"%3E%3Cpath fill="%23fe5671" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60%3B0"%2F%3E%3Canimate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0%3B0.3"%2F%3E%3C%2Fpath%3E%3Cpath fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8%3B0"%2F%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                className='resultEmoji'
              ></object>
              <H1 color={colors.gamePink500}>FAILED</H1>
              <object
                type='image/svg+xml'
                data='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cg stroke="%23fe5671" stroke-linecap="round" stroke-width="2"%3E%3Cpath fill="%23fe5671" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60%3B0"%2F%3E%3Canimate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0%3B0.3"%2F%3E%3C%2Fpath%3E%3Cpath fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8%3B0"%2F%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                className='resultEmoji'
              ></object>
            </>
          )}
        </TestModalTitle>
        <TestContainer>
          {score === 5 ? (
            <>
              <img src={Coupon} className='coupon' alt='coupon' />
              <H4>재도전 쿠폰 적립 +1</H4>
            </>
          ) : (
            <>
              <H3>정답 갯수</H3>
              <H3>{score} / 5</H3>
              <div className='flex resultItemBox'>
                {correctList.map((item, index) => {
                  console.log(item);
                  return (
                    <div className='flex' key={index}>
                      <H4>문제 {index + 1}</H4>
                      {item ? (
                        <div className='resultIcon correct'>
                          <CheckCircleFill />
                        </div>
                      ) : (
                        <div className='resultIcon wrong'>
                          <XCircleFill />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </TestContainer>
        <div className='flex'>
          <CommonBtn
            padding={'1rem 3rem'}
            font={1.5}
            color={colors.gameBlue300}
            fontColor={colors.white}
            border={'none'}
            margin={'0 4rem 0 0'}
            onClick={handleContinue}
          >
            계속
          </CommonBtn>
          <CommonBtn
            padding={'1rem 3rem'}
            font={1.5}
            color={colors.gamePink400}
            fontColor={colors.white}
            border={'none'}
            onClick={handleExit}
          >
            종료
          </CommonBtn>
        </div>
      </ModalBasic>
      <TestWrapper>
        <H2>단어 복습 테스트</H2>
        <WordTestContentContainer>
          {wordList.map((word, index) => {
            return (
              <SingleWordTestContainer key={index}>
                <CommonBtn
                  width={'8rem'}
                  minWidth={'8rem'}
                  height={55}
                  color={index % 2 === 0 ? colors.studyPink300 : colors.studyBlue200}
                  font={1.5}
                  fontColor={colors.white}
                  border={'none'}
                  shadow={'4px 4px 4px rgba(0, 0, 0, 0.25)'}
                  tabIndex={-1}
                >
                  문제 {index + 1}
                </CommonBtn>
                <WordMeaning>{word.meaning}</WordMeaning>
                <CommonInput
                  width={'16rem'}
                  height={55}
                  padding={'0 1rem'}
                  border={`3px solid ${colors.gray300}`}
                  font={1.5}
                  id={`input${index + 1}`}
                  onChange={onChangeInput}
                />
              </SingleWordTestContainer>
            );
          })}
        </WordTestContentContainer>
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
      </TestWrapper>
    </>
  );
}

export default WordTest;
