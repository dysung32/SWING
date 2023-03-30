import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterval from '../hooks/useInterval';
import axios from 'axios';
import { AI_API_URL, API_URL } from '../config';

import {
  GameContainer,
  RoundHeader,
  CanvasContainer,
  Keyword,
  BtnContainer,
} from '../styles/SpeedoodleGameEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';
import { AlarmFill, Pause } from 'react-bootstrap-icons';
import { CommonBtn } from '../styles/CommonEmotion';
import Stopwatch from './Stopwatch';
import ReadyText from './ReadyText';
import ModalBasic from './ModalBasic';

function SpeedoodleGame(props) {
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [roundCnt, setRoundCnt] = useState(5);
  const [record, setRecord] = useState([]);
  const [finish, setFinish] = useState(false);
  const [resultModalShow, setResultModalShow] = useState(false);
  const [finalResultModalShow, setFinalResultModalShow] = useState(false);
  const [readyGame, setReadyGame] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  let canvasRef = useRef(null);
  let canvas;
  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
  };
  let ctx;

  useEffect(() => {
    canvas = canvasRef.current;
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
    canvas.setAttribute('width', window.innerWidth * 0.49);
    canvas.setAttribute('height', window.innerHeight * 0.4);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
  }, []);

  const getAnswer = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const formdata = new FormData();
      formdata.append('answer', blob);
      const url = URL.createObjectURL(blob);

      axios
        .post(`${AI_API_URL}/doodle/check`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const getPosition = (e) => {
    return { X: e.offsetX, Y: e.offsetY };
  };

  // 마우스를 눌렀을 때 실행하는 함수
  const initDraw = (e) => {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(e) };
    ctx.lineTo(pos.X, pos.Y);
    ctx.stroke();
  };

  // 마우스 누른 상태로 움직일 때 실행하는 함수(이걸로 그려짐)
  const draw = (e) => {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(e) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  };

  // 마우스를 떼거나, 마우스가 범위를 벗어났을 때 그림 그리는 걸 멈추는 함수
  const finishDraw = () => {
    pos = { drawable: false, X: -1, Y: -1 };
  };

  // 캔버스를 전체 지우는 함수
  const resetCanvas = () => {
    canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  // 제한시간 다 끝났을 때 결과 모달 여는 useEffect

  useEffect(() => {
    if (finish) {
      setTimeout(() => {
        handleResultModal();
      }, 1000);
    }
  }, [finish]);

  useEffect(() => {
    if (isFinal) {
      setTimeout(() => {
        handleFinalResultModal();
      }, 1000);
    }
  }, [isFinal]);

  // 결과 모달 여는 함수

  const handleResultModal = () => {
    setResultModalShow(true);
    setTimeout(() => {
      if (roundCnt === 1) {
        setTimeout(() => {
          setIsFinal(true);
        }, 2000);
      }
      setResultModalShow(false);

      if (roundCnt > 1) {
        setFinish(false);
        setRoundCnt((prev) => prev - 1);
        setTimeout(() => {
          setReadyGame(false);
        }, 1000);
      }
    }, 3000);
  };

  // 최종 결과 모달 여는 함수

  const handleFinalResultModal = () => {
    console.log('hi');
    setFinalResultModalShow(true);
    setTimeout(() => {
      setFinalResultModalShow(false);
      navigate('/speedoodle');
    }, 3000);
  };
  // readyText 가 끝났을 때 타이머 handle하는 함수
  useEffect(() => {
    if (readyGame) {
      handleRunning();
    }
  }, [readyGame]);

  // 게임 나가는 함수
  const exitGame = () => {
    navigate('/speedoodle');
  };

  // 타이머 작동 여부 함수
  const handleRunning = () => {
    setRunning((prev) => !prev);
  };

  return (
    <>
      {/* 각 라운드 결과 제공 모달 */}
      <ModalBasic
        modalShow={finalResultModalShow}
        setModalShow={setFinalResultModalShow}
      >
        <H2>최종결과</H2>
        <H4>1등 ***</H4>
        <div style={{ width: '24vw', height: '24vw' }}></div>
      </ModalBasic>
      <ModalBasic modalShow={resultModalShow} setModalShow={setResultModalShow}>
        <H2>Round {6 - roundCnt}</H2>
        <H4>1등 ***</H4>
        <div>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
                marginRight: '1rem',
              }}
            ></div>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
                marginRight: '1rem',
              }}
            ></div>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
              }}
            ></div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
                marginRight: '1rem',
              }}
            ></div>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
                marginRight: '1rem',
              }}
            ></div>
            <div
              style={{
                width: '7vw',
                height: '7vw',
                backgroundColor: 'skyblue',
              }}
            ></div>
          </div>
        </div>
        <P2>다른 유저들의 그림은 히스토리에서 다시 볼 수 있습니다.</P2>
      </ModalBasic>
      <GameContainer>
        <ReadyText
          readyGame={readyGame}
          setReadyGame={setReadyGame}
        ></ReadyText>
        <RoundHeader>
          {roundCnt > 0 ? <H4>Round {6 - roundCnt}</H4> : <H4></H4>}

          <span style={{ display: 'flex' }}>
            <AlarmFill style={{ fontSize: '30px', marginRight: '0.5rem' }} />
            {running ? (
              <Stopwatch
                running={running}
                seconds={props.limits}
                setRunning={setRunning}
                setRecord={setRecord}
                setFinish={setFinish}
              ></Stopwatch>
            ) : (
              <H5 color={colors.gameBlue500}>0: 00</H5>
            )}
          </span>
        </RoundHeader>

        <CanvasContainer>
          <Keyword>
            <H4 align='center'>키워드</H4>
          </Keyword>
          <canvas ref={canvasRef}></canvas>
        </CanvasContainer>
        <BtnContainer>
          <CommonBtn
            onClick={resetCanvas}
            color={colors.gameBlue300}
            fontColor={colors.white}
            padding='0.5rem 1.5rem'
            font='0.75'
            margin='0 2rem 0 0'
          >
            <P1>지우기</P1>
          </CommonBtn>
          <CommonBtn
            onClick={exitGame}
            color={colors.gray400}
            fontColor={colors.white}
            padding='0.5rem 1.5rem'
            font='0.75'
          >
            <P1>나가기</P1>
          </CommonBtn>
        </BtnContainer>
      </GameContainer>
    </>
  );
}
export default SpeedoodleGame;
