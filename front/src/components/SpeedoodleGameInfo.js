import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  GameInfoContainer,
  RoomTitle,
  RoomInfoContainer,
  RoomInfo,
  Chat,
  GameExplain,
  GameModeContainer,
  GameMode,
  BtnContainer,
} from '../styles/SpeedoodleGameInfoEmotion';
import SpeedoodleGame from '../components/SpeedoodleGame';
import { CommonBtn } from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';

function SpeedoodleGameInfo(props) {
  const navigate = useNavigate();
  const [isHardMode, setIsHardMode] = useState(false);

  // 모드 변경
  const onClickEasyMode = () => {
    setIsHardMode(false);
  };
  const onClickHardMode = () => {
    setIsHardMode(true);
  };

  // 시작버튼 눌렀을 때
  const handleGameStart = () => {
    props.setIsGameStart(true);
  };

  const exitRoom = () => {
    navigate('/speedoodle');
  };
  return (
    <>
      <GameInfoContainer>
        {props.start ? (
          <SpeedoodleGame></SpeedoodleGame>
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
                      isHardMode ? 'none' : `3px solid ${colors.gameBlue500}`
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
                      isHardMode ? `3px solid ${colors.gameBlue500}` : 'none'
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
                    >
                      <P1 align='center'>초대하기</P1>
                    </CommonBtn>
                    <CommonBtn
                      color={colors.gray200}
                      q
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
              <Chat></Chat>
            </RoomInfoContainer>
          </div>
        )}
      </GameInfoContainer>
    </>
  );
}
export default SpeedoodleGameInfo;
