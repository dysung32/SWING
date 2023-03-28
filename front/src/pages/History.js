import React, { useState } from 'react';
import { MyPageWrapper, HistoryHeader } from '../styles/MyPageEmotion';
import { HistoryContent, HistoryContentContainer, SingleHistoryList } from '../styles/HistoryEmotion';
import { GameTitle, CommonInput, CommonBtn, PlayerProfile } from '../styles/CommonEmotion';
import { H1, H3, H5, H6, P1, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();
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

  const renderHistoryList = historyList.map((history, idx) => {
    return (
      <SingleHistoryList key={idx} onClick={() => navigate(`/history/${idx}`)}>
        <div className='history-date'>{history.date}</div>
        <div className='history-title'>{history.title}</div>
        <div className='history-rank'>{history.rank}등</div>
      </SingleHistoryList>
    );
  });

  return (
    <>
      <MyPageWrapper>
        <GameTitle>
          <H1 color={colors.white} outline={colors.gameBlue500} outlineWeight={2} align='center'>
            게임 히스토리
          </H1>
        </GameTitle>
        <div className='desc'>최근 10건</div>
        <HistoryContentContainer>
          <HistoryHeader border>
            <div className='date'>날짜</div>
            <div className='roomname'>방제목</div>
            <div className='rank'>등수</div>
          </HistoryHeader>
          <HistoryContent>{renderHistoryList}</HistoryContent>
        </HistoryContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default History;
