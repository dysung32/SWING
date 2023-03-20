import React, { useState } from 'react';
import { ReviewNoteWrapperColor, 
  ReviewNoteWrapper, 
  ReviewBtnContainer,
  WrongWordBox,
  WordBox, } from '../styles/ReviewNoteEmotion';
import { GameTitle, CommonBtn } from '../styles/CommonEmotion';
import { H1,H2,H3 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import { CheckCircle, CheckCircleFill } from 'react-bootstrap-icons';

function ReviewNote() {
  const lifeArray = [];
  let nowWPage = 1;
  let nowSPage = 1;
  let maxWPage = 1;
  let maxSPage = 1;

  const wordArray = [["apple","사과","a round fruit with red, yellow, or green skin and firm white flesh"], 
  ["dentist","치과 의사","a person whose job is to care for people's teeth"], 
  ["swing","(전후좌우로) 흔들리다[흔들다]","to move backward and forward or from side to side while hanging from something"]];

  const [wordChecked, setWordChecked] = useState([false]*3);

  const renderWordList = (wordArray) => {
    const nowList = [];
    for(let i=(nowWPage-1)*3;i<maxWPage*3;i++) {
      nowList.push(wordArray[i]);
    }
    return nowList;
  }

  const toggleCheck = (idx) => {
    if(wordChecked[idx]) {
      wordChecked[idx] = false;
      setWordChecked(wordChecked);
    } else {
      wordChecked[idx] = true;
      setWordChecked(wordChecked);
    }
  }

  return (
    <>
      <ReviewNoteWrapper>
        <ReviewNoteWrapperColor>
          <div className="noteTitle">
            <H2 color={colors.black}>My오답노트</H2>
          </div>
          <ReviewBtnContainer>
            <div className='selectButton'>
              <CommonBtn color={colors.white} 
              font={1.5}
              width= "7.5rem"
              height= {55}
              border= {"2px solid" + colors.studyBlue300}
              fontColor = {colors.studyBlue300}
              shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              >단어</CommonBtn>
              <CommonBtn color={colors.white} 
              font={1.5}
              width= "7.5rem"
              height= {55}
              border= {"2px solid" + colors.studyBlue300}
              fontColor = {colors.studyBlue300}
              shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              >문장</CommonBtn>
            </div>
            <CommonBtn color={colors.studyYellow400} 
            width= "14.8rem"
            font={1.5}
            height= {55}
            border= "none"
            shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >복습 테스트 시작</CommonBtn>
          </ReviewBtnContainer>
          <WordBox>
            {renderWordList(wordArray).map((item,idx) => (
              <WrongWordBox key={idx}>
                <H3>{item[0]}</H3>
                <div className='wordMean'>
                  {item[1]}
                </div>
                <div className='wordMean'>
                  {item[2]}
                </div>
                <div className='checkBtn'>
                  {
                    wordChecked[idx] === true?
                    <CheckCircleFill color={colors.studyBlue300} />
                    :<CheckCircle />
                  }
                </div>
              </WrongWordBox>
            ))}
          </WordBox>
          
        </ReviewNoteWrapperColor>
      </ReviewNoteWrapper>
    </>
  );
}

export default ReviewNote;
