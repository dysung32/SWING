import { useState } from 'react';
import { colors } from '../styles/ColorPalette';
import { CommonBtn, CommonInput } from '../styles/CommonEmotion';
import { H2 } from '../styles/Fonts';
import { SingleWordTestContainer, TestContentContainer, TestWrapper, WordMeaning } from '../styles/TestEmotion';

function WordTest() {
  const [wordList, setWordList] = useState([
    { word: 'apple', meaning: 'a round fruit with red, yellow, or green skin and firm white flesh' },
    { word: 'dentist', meaning: `a person whose job is to care for people's teeth` },
    { word: 'swing', meaning: 'to move backward and forward or from side to side while hanging from something' },
    { word: 'amazing', meaning: 'causing great surprise or wonder, causing amazement' },
    {
      word: 'chocolate',
      meaning:
        'a food that is made from cacao beans and that is eaten as candy or used as a flavoring ingredient in other sweet foods',
    },
  ]);

  return (
    <>
      <TestWrapper>
        <H2>단어 복습 테스트</H2>
        <TestContentContainer>
          {wordList.map((word, index) => {
            return (
              <SingleWordTestContainer>
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
                />
              </SingleWordTestContainer>
            );
          })}
        </TestContentContainer>
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
      </TestWrapper>
    </>
  );
}

export default WordTest;
