import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GameContainer,
  RoundHeader,
  CanvasContainer,
  Keyword,
  BtnContainer,
} from '../styles/SpeedoodleGameEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';
import { AlarmFill } from 'react-bootstrap-icons';
import { CommonBtn } from '../styles/CommonEmotion';
import { API_URL, AI_API_URL } from '../config';
import axios from 'axios';

function SpeedoodleGame(props) {
  const navigate = useNavigate();
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(milliseconds) > 0) {
        setMilliseconds(parseInt(milliseconds) - 1);
      }
      if (parseInt(milliseconds) === 0) {
        if (parseInt(seconds) === 0) {
          clearInterval(countdown);
          getAnswer();
        } else {
          setSeconds(parseInt(seconds) - 1);
          setMilliseconds(99);
        }
      }
    }, 10);
    return () => clearInterval(countdown);
  }, [seconds, milliseconds]);

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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
  }, []);

  const getAnswer = () => {
    const canvas  = canvasRef.current;
    canvas.toBlob((blob) => {
      const formdata = new FormData();
      formdata.append('answer', blob);
      const url = URL.createObjectURL(blob);

      axios.post(`${AI_API_URL}/doodle/check`, formdata, {
        headers: {
          'Content-Type':'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    })
  };

  const getPosition = (e) => {
    return { X: e.offsetX, Y: e.offsetY };
  };

  const initDraw = (e) => {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(e) };
    ctx.lineTo(pos.X, pos.Y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(e) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  };

  const finishDraw = () => {
    pos = { drawable: false, X: -1, Y: -1 };
  };

  const resetCanvas = () => {
    canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  const exitGame = () => {
    navigate('/speedoodle');
  };
  return (
    <>
      <GameContainer>
        <RoundHeader>
          <H4>Round 1</H4>
          <span style={{ display: 'flex' }}>
            <AlarmFill style={{ fontSize: '30px', marginRight: '0.5rem' }} />
            <H5>
              {seconds}:{milliseconds < 10 ? `0${milliseconds}` : milliseconds}
            </H5>
          </span>
        </RoundHeader>

        <CanvasContainer>
          <Keyword>
            <H4 align='center'>키워드</H4>
          </Keyword>
          <canvas ref={canvasRef} style={{}}></canvas>
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
