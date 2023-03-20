import React from 'react';
import {
  MyPageWrapper,
  MyPageContentContainer,
  MyPageMainConatiner,
  MyPageProfileConatiner,
  MyPageIntroConatiner,
  MyPageHistoryConatiner,
  MyPageHistoryHeader,
  MyPageHistoryList,
} from '../styles/MyPageEmotion';
import { GameTitle, CommonBtn } from '../styles/CommonEmotion';
import { H1, H3, H5, P1 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

function MyPage() {
  const nickName = 'Sanghwa';

  const historyList = [
    {
      date: '2023.03.01',
      title: '나랑 같이 놀 사람',
      rank: 2,
    },
    {
      date: '2023.03.02',
      title: '공부합시다',
      rank: 3,
    },
    {
      date: '2023.03.03',
      title: '놀자아',
      rank: 1,
    },
    {
      date: '2023.03.05',
      title: 'A405',
      rank: 2,
    },
    {
      date: '2023.03.07',
      title: 'SSAFY 8기',
      rank: 1,
    },
    {
      date: '2023.03.07',
      title: 'SSAFY 8기',
      rank: 1,
    },
    {
      date: '2023.03.07',
      title: 'SSAFY 8기',
      rank: 1,
    },
  ];

  const renderList = historyList.map((history) => {
    return (
      <MyPageHistoryList>
        <P1 color={colors.gameBlue500}>{history.date}</P1>
        <P1 color={colors.gameBlue500}>{history.title}</P1>
        <P1 color={colors.gameBlue500}>{history.rank}등</P1>
      </MyPageHistoryList>
    );
  });
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
        <MyPageContentContainer>
          <MyPageMainConatiner>
            <MyPageIntroConatiner>
              <H3>Hi, {nickName}!</H3>
              <P1>
                SWING을 즐기고 계신가요? <br /> 마이페이지에서는 예전
                SpeeDoodle의 기록을 보기 위한 <br /> 히스토리와 회원님의 정보를
                수정하기 위한 프로필이 있습니다.
              </P1>
            </MyPageIntroConatiner>
            <MyPageHistoryConatiner>
              <MyPageHistoryHeader>
                <H5 color={colors.gameBlue500}>날짜</H5>
                <H5 color={colors.gameBlue500}>방제목</H5>
                <H5 color={colors.gameBlue500}>등수</H5>
              </MyPageHistoryHeader>
              {renderList}
            </MyPageHistoryConatiner>
          </MyPageMainConatiner>
          <MyPageProfileConatiner></MyPageProfileConatiner>
        </MyPageContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
