import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  GameInfoContainer,
  RoomTitle,
  RoomInfoContainer,
  RoomInfo,
  Chat,
  ChattingContainer,
  ChattingInputContainer,
  ChatInput,
  GameExplain,
  GameModeContainer,
  GameMode,
  BtnContainer,
} from '../styles/SpeedoodleGameInfoEmotion';
import SpeedoodleGame from '../components/SpeedoodleGame';
import { CommonBtn, CommonInput } from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';
import { AI_API_URL, API_URL } from '../config';

import { SendFill } from 'react-bootstrap-icons';
function SpeedoodleGameInfo(props) {
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);
  const [isMode, setIsMode] = useState('');
  const [bgColor, setBgColor] = useState(null);
  const [limits, setLimits] = useState('');

  useEffect(() => {
    getRoomDetail();
  }, []);

  const getRoomDetail = () => {
    // 룸상세 정보 가져오는 axios
    // axios.get(API_URL)
  };

  // 모드 변경
  const onClickEasyMode = () => {
    setIsMode(0);
    setLimits(2);
  };
  const onClickHardMode = () => {
    setIsMode(1);
    setLimits(3);
  };

  const linkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다. 초대할 친구에게 링크를 공유하세요!');
  };

  // 시작버튼 눌렀을 때
  const handleGameStart = () => {
    handleChangeMode();
    setTimeout(() => {
      props.setIsGameStart(true);
      setBgColor(`${colors.gameBlue100}`);
    }, 2000);
  };

  //방 나가기
  const exitRoom = () => {
    navigate('/speedoodle');
  };
  // 보낼 메세지 저장해놓기
  const saveMessage = (e) => {
    props.setChatInput(e.target.value);
  };
  // 저장해둔 메세지 보내기
  const sendMessage = () => {
    if(props.chatInput !== ''){
      props.SendMessage();
      props.setChatInput('');
    }
  };

  //모드 변경 api 전달
  const handleChangeMode = () => {
    // axios.put(`${API_URL}/doodle/room/}`);

    console.log(isMode, limits);
  };
  return (
    <>
      <GameInfoContainer color={bgColor}>
        {props.start ? (
          <SpeedoodleGame
            style={{ width: '100%', height: '100%' }}
            isMode={isMode}
            limits={limits}
          ></SpeedoodleGame>
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <RoomTitle>
              <H5 align='center' color={colors.gameBlue500}>
                제목이 들어갈 자리입니다.
              </H5>
            </RoomTitle>
            <RoomInfoContainer>
              <RoomInfo>
                <GameExplain>
                  <H5 align='center' color={colors.gameBlue500}>
                    게임 설명
                  </H5>
                  <P2
                    align='center'
                    color={colors.gameBlue500}
                    style={{ wordBreak: 'keep-all' }}
                  >
                    라운드 별로 키워드가 주어지고, 시간내에 AI가 키워드를 맞추면
                    성공하는 게임입니다. 라운드는 총 5라운드로 구성되어 있으며,
                    가장 적은 시간으로 5문제를 성공시킨 유저가 1등을 차지하게
                    됩니다. <br />
                    (AI가 키워드를 맞추지 못했을 경우 각 모드의 제한시간이
                    기록이 됩니다.)
                  </P2>
                </GameExplain>
                <GameModeContainer>
                  <GameMode
                    fontColor={colors.gameBlue500}
                    color={colors.gameBlue100}
                    border={
                      isMode === 1 ? 'none' : `3px solid ${colors.gameBlue500}`
                    }
                    onClick={onClickEasyMode}
                  >
                    <H6 align='center'>EASY MODE</H6>
                    <P2 align='center' style={{ wordBreak: 'keep-all' }}>
                      EASY MODE는 키워드가 영단어로 제시됩니다.
                      <br /> 제한시간 20초
                    </P2>
                  </GameMode>
                  <GameMode
                    fontColor={colors.gameBlue500}
                    color={colors.gamePink200}
                    border={
                      isMode === 1 ? `3px solid ${colors.gameBlue500}` : 'none'
                    }
                    onClick={onClickHardMode}
                  >
                    <H6 align='center'>HARD MODE</H6>
                    <P2 align='center'>
                      HARD MODE는 키워드가 영영사전의 뜻으로 제시됩니다. <br />
                      제한시간 30초
                    </P2>
                  </GameMode>
                </GameModeContainer>
                <BtnContainer>
                  <div style={{ width: '60%' }}>
                    <CommonBtn
                      color={colors.gameYellow100}
                      fontColor={colors.gameBlue500}
                      width='100%'
                      font='0.75'
                      padding='0.5rem 0'
                      margin='0 0 1rem 0'
                      onClick={linkCopy}
                    >
                      <P1 align='center'>초대하기</P1>
                    </CommonBtn>
                    <CommonBtn
                      color={colors.gray200}
                      fontColor={colors.gray400}
                      width='100%'
                      font='0.75'
                      padding='0.5rem 0'
                      onClick={exitRoom}
                    >
                      <P1 align='center'>나가기</P1>
                    </CommonBtn>
                  </div>
                  <CommonBtn
                    color={colors.gameBlue500}
                    fontColor={colors.white}
                    width='calc(40% - 1rem)'
                    font='0.75'
                    onClick={handleGameStart}
                  >
                    <H4 align='center'>시작하기</H4>
                  </CommonBtn>
                </BtnContainer>
              </RoomInfo>
              <Chat>
                <ChattingContainer useRef={chatWindowRef}>
                  {
                    props.chatData.map((item,idx) => {
                      return (
                        <P2 key={idx}>{item[0]}: {item[1]}</P2>
                      )
                    })
                  }
                </ChattingContainer>
                <ChattingInputContainer>
                  <ChatInput onChange={saveMessage} 
                  value={props.chatInput} 
                  onKeyDown={(e) => e.key==='Enter'&&sendMessage()}/>
                  <button
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      color: `${colors.gameBlue500}`,
                    }}
                    onClick={sendMessage}

                  >
                    <SendFill />
                  </button>
                </ChattingInputContainer>
              </Chat>
            </RoomInfoContainer>
          </div>
        )}
      </GameInfoContainer>
    </>
  );
}
export default SpeedoodleGameInfo;
