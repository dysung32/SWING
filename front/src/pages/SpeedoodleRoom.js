import React, { useState } from 'react';

import { SpeedoodleWrapper } from '../styles/SpeedoodleEmotion';
import {
  SpeedoodleRoomContainer,
  UserInfoContainer,
  GameInfoContainer,
} from '../styles/SpeedoodleRoomEmotion';
import { GameTitle, CommonInput, CommonBtn } from '../styles/CommonEmotion';
import { H1, H2, H4, H5, P1, P2, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import ModalBasic from '../components/ModalBasic';

function SpeedoodleRoom() {
  return (
    <>
      <SpeedoodleWrapper>
        <GameTitle>
          <H1
            color={colors.white}
            outline={colors.gameBlue500}
            outlineWeight={2}
            align='center'
          >
            SPEEDOODLE
          </H1>
        </GameTitle>
        <SpeedoodleRoomContainer>
          <UserInfoContainer></UserInfoContainer>
          <GameInfoContainer></GameInfoContainer>
        </SpeedoodleRoomContainer>
      </SpeedoodleWrapper>
    </>
  );
}

export default SpeedoodleRoom;
