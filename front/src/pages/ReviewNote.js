import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewNoteWrapperColor, 
  ReviewNoteWrapper, 
  ReviewBtnContainer,
  WrongThingBox,
  WrongBox,
  ThingMean,
 } from '../styles/ReviewNoteEmotion';
import { CommonBtn } from '../styles/CommonEmotion';
import { H2,H3 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import { CheckCircle, CheckCircleFill } from 'react-bootstrap-icons';
import Pagination from '../components/PaginatorBar';
import  axios  from 'axios';
import { API_URL } from '../config';

function ReviewNote() {
  const navigate = useNavigate();

  const wordArray = [["apple","사과","a round fruit with red, yellow, or green skin and firm white flesh"], 
  ["dentist","치과 의사","a person whose job is to care for people's teeth"], 
  ["swing","(전후좌우로) 흔들리다[흔들다]","to move backward and forward or from side to side while hanging from something"],
  ["this", "이것","thing sdfajksdkfjadjhkga"],
  ["is", "이것","thing sdfajksdkfjadjhkga"],
  ["a", "이것","thing sdfajksdkfjadjhkga"],];

  const sentenceArray = [["a man is riding a bicycle", "남자가 자전거를 타고 있다"],
  ["adfdjfk;adsjfn dsfjkld; dfjkl;a", "ㅁㅇ러ㅏㅗㅁ어ㅗ ㅁㅇ러ㅏㅣㅗㅁㄹ ㅏ"],
  ["adfasdfasdfsadfasd","aㄴㅇㄹㄴㅇㄻㄴㄹㄴㅇㄹ"],
  ["a man is riding a bicycle", "남자가 자전거를 타고 있다"],
  ["adfdjfk;adsjfn dsfjkld; dfjkl;a", "ㅁㅇ러ㅏㅗㅁ어ㅗ ㅁㅇ러ㅏㅣㅗㅁㄹ ㅏ"],
  ["adfasdfasdfsadfasd","aㄴㅇㄹㄴㅇㄻㄴㄹㄴㅇㄹ"],
  ["a man is riding a bicycle", "남자가 자전거를 타고 있다"],
  ["adfdjfk;adsjfn dsfjkld; dfjkl;a", "ㅁㅇ러ㅏㅗㅁ어ㅗ ㅁㅇ러ㅏㅣㅗㅁㄹ ㅏ"],
  ["adfasdfasdfsadfasd","aㄴㅇㄹㄴㅇㄻㄴㄹㄴㅇㄹ"],
];

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [Ppage, setPpage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [wordReview, setwordReview] = useState(true);
  const [wordChecked, setWordChecked] = useState(Array(wordArray.length).fill(false));

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_URL}/note/word/red/0`,
    })
    .then((res) => {
      setPosts(res.data.wordNoteList);
    })
    .catch((err) => {
      console.log(err);
    })
  })

  useEffect(() => {
    const newOffset = ((page - 1) + 5*(Ppage - 1)) * limit;
    setOffset(newOffset);
  }, [page, Ppage]);

  const ToggleVersion = () => {
    if(wordReview){
      setLimit(4);
      setPosts(sentenceArray);
      setwordReview(false);
      setPage(1);
      setPpage(1);
      setOffset(0);
    }
    else{
      setLimit(3);
      setPosts(wordArray);
      setwordReview(true);
      setPage(1);
      setPpage(1);
      setOffset(0);
    }
  }

  const startTest = () => {
    if(wordReview){
      navigate('/test-word');
    }
    else{
      navigate('/test-sentence');
    }
  };

  // 단어 셀프체크 부분 토글 함수
  const ToggleCheck = (idx) => {
    let copy = [...wordChecked];
    copy[idx] = !copy[idx];
    setWordChecked(copy);
    console.log(wordChecked); 
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
              onClick = {ToggleVersion}
              font={1.5}
              width= "7.5rem"
              height= {55}
              border= {"2px solid" + colors.studyBlue300}
              fontColor = {colors.studyBlue300}
              shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              disabled={wordReview===true? "page" : null}
              >단어</CommonBtn>
              <CommonBtn color={colors.white} 
              onClick = {ToggleVersion}
              font={1.5}
              width= "7.5rem"
              height= {55}
              border= {"2px solid" + colors.studyBlue300}
              fontColor = {colors.studyBlue300}
              shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              disabled={wordReview===false? "page" : null}
              >문장</CommonBtn>
            </div>
            <CommonBtn color={colors.studyYellow400} 
            onClick = {startTest}
            width= "14.8rem"
            font={1.5}
            height= {55}
            border= "none"
            shadow = {"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >복습 테스트 시작</CommonBtn>
          </ReviewBtnContainer>
          <WrongBox>
            {posts.slice(offset, offset + limit).map((item, idx) => (
              <WrongThingBox key={idx}>
                <H3 margin="0rem 0rem 1rem 0rem">{item[0]}</H3>
                <ThingMean margin={wordReview===true ? 1 : 0}>
                  {item[1]}
                </ThingMean>
                <div className='thingMean'
                display={ wordReview===true ? "block" : "none" }>
                  {item[2]}
                </div>
                <div className='checkBtn'>
                  {
                    wordChecked[idx+(page-1)*limit] === true?
                    <CheckCircleFill onClick={() => ToggleCheck(idx)} color={colors.studyBlue300} />
                    :<CheckCircle onClick={() => ToggleCheck(idx)}/>
                  }
                </div>
              </WrongThingBox>
            ))}
          </WrongBox>

          <Pagination
          total = {posts.length}
          limit = {limit}
          page = {page}
          Ppage = {Ppage}
          setPage = {setPage}
          setPpage = {setPpage}/>
        </ReviewNoteWrapperColor>
      </ReviewNoteWrapper>
    </>
  );
}

export default ReviewNote;
