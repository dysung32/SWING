import React, { useState } from 'react';
import { MyPageWrapper, MyPageHistoryHeader } from '../styles/MyPageEmotion';
import { HistoryContentContainer } from '../styles/HistoryEmotion';
import { GameTitle, CommonInput, CommonBtn, PlayerProfile } from '../styles/CommonEmotion';
import { H1, H3, H5, H6, P1, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

function History() {
  const historyList = [
    {
      date: '2023.03.27',
      title: '나랑 같이 놀 사람',
      rank: 2,
    },
    {
      date: '2023.03.27',
      title: '공부합시다',
      rank: 3,
    },
    {
      date: '2023.03.26',
      title: '놀자아',
      rank: 1,
    },
    {
      date: '2023.03.25',
      title: '오빠 차 있어?',
      rank: 2,
    },
    {
      date: '2023.03.23',
      title: '빠삥빠삥 지뢰찾기',
      rank: 1,
    },
    {
      date: '2023.03.20',
      title: '취뽀하고 싶다',
      rank: 1,
    },
    {
      date: '2023.03.20',
      title: '뽀삐야 나랑 놀자',
      rank: 1,
    },
    {
      date: '2023.03.19',
      title: '스피두들 할 사람?',
      rank: 1,
    },
    {
      date: '2023.03.16',
      title: '응 내가 일등이야',
      rank: 1,
    },
    {
      date: '2023.03.05',
      title: '빨리 들어와.',
      rank: 1,
    },
  ];

  return (
    <>
      <MyPageWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2} align='center'>
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
