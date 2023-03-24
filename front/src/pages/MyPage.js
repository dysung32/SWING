import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MyPageWrapper,
  MyPageContentContainer,
  MyPageMainConatiner,
  MyPageSideConatiner,
  MyPageProfileConatiner,
  MyPageIntroConatiner,
  MyPageHistoryConatiner,
  MyPageHistoryHeader,
  MyPageHistoryList,
  FileInput,
  MyPageProfileImg,
  MyPageProfileNickname,
  MyPageProfileCoupon,
  CouponImg,
} from '../styles/MyPageEmotion';
import Coupon from '../assets/coupon.png';
import {
  GameTitle,
  CommonInput,
  CommonBtn,
  PlayerProfile,
} from '../styles/CommonEmotion';
import { H1, H3, H5, H6, P1, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';

import { Image, PencilSquare } from 'react-bootstrap-icons';

function MyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [displayNickname, setDisplayNickname] = useState(true);
  const [tempNickname, setTempNickname] = useState('');
  const [alertNickname, setAlertNickname] = useState(false);
  const nickName = 'Sanghwa';
  const coupon = 3;
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

  useEffect(() => setNickname(nickName), []);

  const renderList = historyList.map((history, idx) => {
    return (
      <MyPageHistoryList key={idx} onClick={() => navigate(`/history/${idx}`)}>
        <P1 color={colors.gameBlue500}>{history.date}</P1>
        <P1 color={colors.gameBlue500}>{history.title}</P1>
        <P1 color={colors.gameBlue500}>{history.rank}등</P1>
      </MyPageHistoryList>
    );
  });

  const toggleNickname = () => {
    if (alertNickname) return;
    setDisplayNickname((prev) => !prev);
    saveNickname();
  };

  const changeNickname = (e) => {
    console.log(e.target.value);
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(e.target.value)) {
      setAlertNickname(true);
    } else {
      setAlertNickname(false);
      setTempNickname(e.target.value);
    }
  };

  const saveNickname = () => {
    setAlertNickname(false);
    if (tempNickname !== '') {
      setNickname(tempNickname);
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!alertNickname) {
        toggleNickname();
        saveNickname();
      }
    }
  };
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
              <H3>Hi, {nickname}!</H3>
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
          <MyPageSideConatiner>
            <MyPageProfileConatiner>
              <MyPageProfileImg>
                <PlayerProfile
                  src='http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRSM-bLdlw42S0tP6jHNppEhfDDU2nwKRL9UzKv7Mx6uOay9N4RsJLJmst9VIxAOckx'
                  width='12'
                  height='12'
                />
                <label htmlFor='file'>
                  <FileInput>
                    <Image />
                  </FileInput>
                </label>
                <input
                  type='file'
                  name='file'
                  id='file'
                  style={{ display: 'none' }}
                />
              </MyPageProfileImg>
              <MyPageProfileNickname>
                {displayNickname ? (
                  <>
                    <P1 margin=' 0.35rem 0'>{nickname}</P1>
                    <PencilSquare
                      style={{
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        margin: '0.55rem 0',
                      }}
                      onClick={toggleNickname}
                    />
                  </>
                ) : (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <CommonInput
                        width='70%'
                        font='1'
                        type='text'
                        name='nickname'
                        id='nickname'
                        onChange={changeNickname}
                        onKeyDown={handleOnKeyDown}
                      />
                      <CommonBtn
                        height='42'
                        border='none'
                        color={colors.studyBlue400}
                        font='1'
                        fontColor={colors.white}
                        hoverColor={colors.studyBlue500}
                        padding='0 1rem '
                        onClick={toggleNickname}
                      >
                        확인
                      </CommonBtn>
                    </div>
                    {alertNickname ? (
                      <SmText margin='0.5rem 0' color='red'>
                        특수문자는 제외해주세요
                      </SmText>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </MyPageProfileNickname>
            </MyPageProfileConatiner>
            <MyPageProfileCoupon>
              <CouponImg src={Coupon} alt='coupon image' />
              <H6>보유 재도전 쿠폰: {coupon}장</H6>
            </MyPageProfileCoupon>
            <CommonBtn
              height='42'
              border='none'
              color={colors.gray400}
              font='1.25'
              fontColor={colors.white}
              hoverColor={colors.gray500}
              padding='0.5rem 1.5rem '
            >
              회원탈퇴
            </CommonBtn>
          </MyPageSideConatiner>
        </MyPageContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
