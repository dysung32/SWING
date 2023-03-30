import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HifiveWrapper,
  HifiveContainer,
  ProblemContainer,
  AnswerContainer,
  GameinfoContainer,
  ProblemtoalContainer,
  AnswertotalContainer,
  InputContainer,
  HifiveModalContainer,
  HifiveStatistics,
  GameImage, } from "../styles/HifiveEmotion"
import { CommonInput, 
  CommonBtn, 
  GameTitle } from "../styles/CommonEmotion"
import { H1,H2, H3, H5 } from "../styles/Fonts"
import { colors } from "../styles/ColorPalette"
import ModalBasic from "../components/ModalBasic"
import { HeartFill } from 'react-bootstrap-icons';
import LeaderBoard from '../components/LeaderBoard';

function Hifive() {
  const navigate = useNavigate();

  const score = [100, 100, 100, 1];
  const [imageSet, setImageSet] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isVibrating, setIsVibrating] = useState(false);
  const [borderColor, setBorderColor] = useState("white");
  const [imageCheck, setImageCheck] = useState([[100,false],[100,false], [100,false], [100,false], [100,false]]);
  const [lifeStack, setLifeStack] = useState(5);
  const [answerStack, setAnswerStack] = useState([]);
  const [scoreStack, setScoreStack] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const [resultValue,setresultValue] = useState(); 

  // imageSet에 이미지를 저장
  useEffect(() => {
    getImage()
    .then((data) => {
      console.log(data.wordList);
      setImageSet(data.wordList);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  // 유저가 답을 작성하면 발생하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    getSimilarity()
    .then((data) => {
      handleAnswer(data.similarity);
    })
    setInputValue('');
  }

  // 유사도에 따라 달라진다. (0.4미만 틀이 흔들리고 빨개짐) (0.85미만 해당 사진이 흔들리고 틀이 빨개짐)
  // 0.85이상 정답 처리가 되며 사진이 사라지고 answer란에 적혀진다.
  const handleAnswer = (answers) => {
    let maxSimilar = 0;
    let maxKey = 0;
    for(let key in answers) {
      if(answers[key] > maxSimilar){
        maxSimilar = answers[key];
        maxKey = key;
      }
    }

    let temp = [...imageCheck];
    let tempSet = [...imageSet];
    maxKey = maxKey.replace(' ','_');
    console.log(maxKey);

    if(maxSimilar < 0.4) {
      setIsVibrating(true);
      setBorderColor(colors.gamePink500);
      
      if(lifeStack - 1 === 0){
        handleFailModal(tempSet);
      }else{
        setLifeStack(lifeStack-1);
      }

      temp.forEach(element => {
        element[0] = Math.ceil(element[0]*0.9);
      });
      setImageCheck(temp);

      const timeoutId = setTimeout(() => {
        setIsVibrating(false);
        setBorderColor("white");
      }, 500);

      return () => clearTimeout(timeoutId);
    }
    else if(maxSimilar < 0.85) {
      const idx = imageSet.findIndex(obj => obj.content === maxKey);
      temp[idx][1] = true;
      temp[idx][0] = Math.ceil(temp[idx][0]*maxSimilar);
      setImageCheck(temp);
      setBorderColor(colors.gamePink500);
      setLifeStack(lifeStack-1);

      const timeoutId = setTimeout(() => {
        temp[idx][1] = false;
        setImageCheck(temp);
        setBorderColor("white");
      }, 500);

      return () => clearTimeout(timeoutId);
    }
    else{
      console.log(maxSimilar);
      const idx = imageSet.findIndex(obj => obj.content === maxKey);
      const answer = tempSet.splice(idx, 1);
      const answerCheck = temp.splice(idx, 1);
      answerStack.push([answer[0].content, answer[0].meaningKr]);
      
      setScoreStack(scoreStack+answerCheck[0][0])
      setBorderColor(colors.gameBlue300);
      setImageSet(tempSet);
      setImageCheck(temp);
      
      if(imageSet.length - 1 === 0) {
        setresultValue(true);
      }

      const timeoutId = setTimeout(() => {
        setBorderColor("white");
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }

  //목숨이 다했을때 모달 띄우는 함수
  const handleFailModal = (tempSet) => {
    setWrongWords(tempSet);
    setresultValue(false);
  }

  // django로 api 호출을 하여 입력한 단어와 정답간에 유사도 판별
  async function getSimilarity() {
    try {

      let URL = "http://j8a405.p.ssafy.io:8000/api/five/check?";
      imageSet.forEach(element => {
        const content = element.content.replace('_',' ');        
        URL += `solution=${content}&`;
      });
      URL += `answer=${inputValue}`;
      // console.log(URL);
      const promise = await fetch(URL,{method: 'GET'});
      const data = await promise.json();
      return data;
    }
    catch (error) {
      console.log(error);
      throw new Error("Api 호출 실패");
    }
  }

  async function getImage() {
    try {
      const promise = await fetch("http://j8a405.p.ssafy.io:8080/api/five",{method: 'GET'});
      const data = await promise.json();
      return data;
    }
    catch (error) {
      console.log(error);
      throw new Error("Api 호출 실패");
    }
  }

  return (
    <>
      {/* 성공했을때 모달 */}
      <ModalBasic modalShow={resultValue===true}>
        <H1 color={colors.gamePink500}
        padding={"0rem 0rem 2rem 0rem"}>SUCCESS</H1>
        <HifiveModalContainer>
          <LeaderBoard/>
            <HifiveStatistics width={25} color={colors.gameBlue200}>
              <H2 color={colors.gameBlue500}>통계</H2>
              <div className='resultBox'>
                <div className='resultValue'>
                  <H3 color={colors.gameBlue500}>점수</H3>
                  <H3 color={colors.gameBlue500}>{scoreStack}점</H3>
                </div>
                <div className='resultValue'>
                <H3 color={colors.gameBlue500}>누적 점수</H3>
                <H3 color={colors.gameBlue500}>{score[1]}점</H3>
                </div>
                <div className='resultValue'>
                <H3 color={colors.gameBlue500}>정답률</H3>
                <H3 color={colors.gameBlue500}>{score[2]}%</H3>
                </div>
                <div className='resultValue'>
                  <H3 color={colors.gameBlue500}>연속 성공 횟수</H3>
                  <H3 color={colors.gameBlue500}>{score[3]}회</H3>
                </div>
              </div>
          </HifiveStatistics>
        </HifiveModalContainer>
        <CommonBtn width="34.7%"
        onClick={() => navigate('/')}
        height = {74} 
        font={2} 
        color={colors.gameYellow300}
        hoverColor={colors.gameYellow400}
        margin={"3rem 0rem 0rem 0rem"}
        border={"none"}>
          메인페이지
        </CommonBtn>
      </ModalBasic>
      <ModalBasic modalShow={resultValue===false}>
        <H1 color={colors.gamePink500}
        padding={"0rem 0rem 2rem 0rem"}>FAILED</H1>
        <HifiveModalContainer>
          <LeaderBoard/>
            <HifiveStatistics width={25} color={colors.gameBlue200}>
              <H2 color={colors.gameBlue500}>통계</H2>
              <div className='resultBox'>
                <div className='resultValue'>
                  <H3 color={colors.gameBlue500}>점수</H3>
                  <H3 color={colors.gameBlue500}>{scoreStack}점</H3>
                </div>
                <div className='resultValue'>
                <H3 color={colors.gameBlue500}>누적 점수</H3>
                <H3 color={colors.gameBlue500}>{score[1]}점</H3>
                </div>
                <div className='resultValue'>
                <H3 color={colors.gameBlue500}>정답률</H3>
                <H3 color={colors.gameBlue500}>{score[2]}%</H3>
                </div>
                <div className='resultValue'>
                  <H3 color={colors.gameBlue500}>연속 성공 횟수</H3>
                  <H3 color={colors.gameBlue500}>{score[3]}회</H3>
                </div>
              </div>
          </HifiveStatistics>
          {/* 실패했을 때의 모달 */}
          <HifiveStatistics width={12} color={colors.gameBlue200}>
            <H2 color={colors.gameBlue500}>오답</H2>
            <div className='resultBox'>
              {wrongWords.map((item, index) => {
                return (
                  <div className='resultValue' key={index}>
                    <H5 color={colors.gameBlue500}>{item.content}</H5>
                    <H5 color={colors.gameBlue500}>{item.meaningKr}</H5>
                  </div>
                )
              })}
            </div>
          </HifiveStatistics>
        </HifiveModalContainer>
        <CommonBtn width="34.7%"
        onClick={() => navigate('/')}
        height = {74} 
        font={2} 
        color={colors.gameYellow300}
        hoverColor={colors.gameYellow400}
        margin={"3rem 0rem 0rem 0rem"}
        border={"none"}>
          메인페이지
        </CommonBtn>
      </ModalBasic>
      <HifiveWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2}>Hi-five</H1>
        </GameTitle>
        <HifiveContainer>
          <ProblemtoalContainer>
            <GameinfoContainer>
              <H3 color={colors.white}>SCORE: {scoreStack}</H3>
              <div className='heart-container'>
                <HeartFill className='heart'/>
                <H3 color={colors.gamePink500}> X {lifeStack}</H3>
              </div>
            </GameinfoContainer>
            <ProblemContainer color={borderColor} vibration={isVibrating}>
              {
                imageSet.map((item, index) => {
                  return (
                    <GameImage 
                    key={index} 
                    src={item.wordImageUrl} 
                    alt={item}
                    opacity={(0.6 - 0.05*index)}
                    vibration={imageCheck[index][1]}
                    />
                  )
                })
              }
              {/* <object
              type='image/svg+xml'
              data='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="320" height="320" viewBox="0 0 24 24"%3E%3Cg fill="none" stroke="%2305bc02" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"%3E%3Cpath stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60%3B0"%2F%3E%3C%2Fpath%3E%3Cpath stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"%3E%3Canimate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14%3B0"%2F%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              className='correctEmoji'
              ></object> */}
            </ProblemContainer>
          </ProblemtoalContainer>
          <AnswertotalContainer>
            <H3 color={colors.white} font={2} >ANSWERS</H3>
            <AnswerContainer>
              {
                answerStack.map((answer, index) => {
                  return (
                    <div className='singleAnswer' key={index}>
                      <H5 color={colors.black}>{answer[0]}</H5>
                      <H5 color={colors.black}>{answer[1]}</H5>
                    </div>
                  )
                })
              }
            </AnswerContainer>
          </AnswertotalContainer>
          <InputContainer onSubmit={handleSubmit}>
            <CommonInput 
            width="80%"
            height={55}
            font={2}
            border={'none'} 
            padding={"0rem 1rem 0rem 1rem"}
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            autoFocus={true}/>
            <CommonBtn
            type="submit" 
            width="25%" 
            height={55} 
            font={2} 
            color={colors.gameBlue100} 
            hoverColor={colors.studyBlue200}>
              <H3 color={colors.black} align={"center"}>SUBMIT</H3>
            </CommonBtn>
          </InputContainer>
        </HifiveContainer>
      </HifiveWrapper>
    </>
  );
}

export default Hifive;
