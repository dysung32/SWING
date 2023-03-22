import { useEffect, useRef, useState } from 'react';
import { colors } from '../styles/ColorPalette';
import { CommonBtn, CommonInput } from '../styles/CommonEmotion';
import { H2 } from '../styles/Fonts';
import { SingleWordTestContainer, TestWrapper, WordMeaning, WordTestContentContainer } from '../styles/TestEmotion';

function WordTest() {
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

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);

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
    console.log(result);
    // 결과 모달 활성화
    console.log('답안 제출!');
  };

  // 단어 복습 테스트 점수 계산하는 함수
  const calcScore = () => {
    let score = 0;
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i] === wordList[i].word) {
        score += 1;
      }
    }
    return score;
  };

  // useEffect(() => {
  //   input1.current?.focus();
  // }, []);

  return (
    <>
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
                  ref={() => `input${index + 1}`}
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
