import React, { useState } from 'react';
import { MyPageWrapper, MyPageHistoryHeader } from '../styles/MyPageEmotion';
import { HistoryContentContainer } from '../styles/HistoryEmotion';
import {
  GameTitle,
  CommonInput,
  CommonBtn,
  PlayerProfile,
} from '../styles/CommonEmotion';
import { H1, H3, H5, H6, P1, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

function History() {
  const historyList = [{ 'ROUND 1': [] }];

  return (
    <>
      <MyPageWrapper>
        <GameTitle>
          <H1
            color={colors.white}
            outline={colors.gameBlue500}
            outlineWeight={2}
            align='center'
          >
            마이페이지
          </H1>
        </GameTitle>
        <HistoryContentContainer>
          <MyPageHistoryHeader border>
            <H5 color={colors.gameBlue500}>날짜</H5>
            <H5 color={colors.gameBlue500}>방제목</H5>
            <H5 color={colors.gameBlue500}>등수</H5>
          </MyPageHistoryHeader>
        </HistoryContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default History;
