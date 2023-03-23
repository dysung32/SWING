import React, { useState } from 'react';
import {
  SpeedoodleWrapper,
  SpeedoodleContentContainer,
  InputContainer,
  SelectInput,
  RoomContainer,
  Room,
  RoomTitleContainer,
  RoomOtherInfoContainer,
  RoomIconContainer,
} from '../styles/SpeedoodleEmotion';
import { GameTitle, CommonInput, CommonBtn } from '../styles/CommonEmotion';
import { H1, H4, H5, P1, P2, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import Pagination from '../components/PaginatorBar';
import {
  ArrowClockwise,
  AwardFill,
  PersonFill,
  LockFill,
} from 'react-bootstrap-icons';

function Speedoodle() {
  const [activeMode, setActiveMode] = useState('MODE');
  const options = [
    { value: 'roomNum', name: '방번호' },
    { value: 'title', name: '방제목' },
  ];

  const modeOptions = [
    { value: 'ALL', name: 'ALL' },
    { value: 'EASY', name: 'EASY' },
    { value: 'HARD', name: 'HARD' },
  ];

  const roomList = [
    {
      mode: 'EASY',
      name: '나랑 놀사람 들어와',
      roomId: 123,
      leaderId: '행복한초코',
      currentMember: 2,
      closed: false,
      code: null,
    },
    {
      mode: 'HARD',
      name: '나랑 놀사람 들어와!!',
      roomId: 125,
      leaderId: '귀여운뽀삐',
      currentMember: 4,
      closed: true,
      code: '012345',
    },
    {
      mode: 'HARD',
      name: '저는 진심입니다',
      roomId: 121,
      leaderId: '데이비드',
      currentMember: 3,
      closed: false,
      code: null,
    },
    {
      mode: 'EASY',
      name: '재밌는 스피두들',
      roomId: 127,
      leaderId: '쪼안나',
      currentMember: 3,
      closed: true,
      code: '111111',
    },
    {
      mode: 'EASY',
      name: '한판만 하고 잘게요',
      roomId: 128,
      leaderId: '맹지니',
      currentMember: 2,
      closed: false,
      code: null,
    },
    {
      mode: 'HARD',
      name: '나 이겨보셈',
      roomId: 111,
      leaderId: '인두목',
      currentMember: 3,
      closed: true,
      code: '123445',
    },
    {
      mode: 'HARD',
      name: 'welcome to speedoodle',
      roomId: 116,
      leaderId: 'Amily',
      currentMember: 2,
      closed: false,
      code: null,
    },
    {
      mode: 'EASY',
      name: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
      roomId: 119,
      leaderId: 'SSAFY8th',
      currentMember: 5,
      closed: false,
      code: null,
    },
  ];

  const inputOption = options.map((option, idx) => (
    <option value={option.value} key={idx}>
      {option.name}
    </option>
  ));

  const modeOption = modeOptions.map((option, idx) => (
    <option value={option.value} key={idx}>
      {option.name}
    </option>
  ));

  const rooms = roomList?.map((room) => (
    <Room
      color={room.mode === 'EASY' ? colors.gameBlue100 : colors.gamePink200}
      key={room.roomId}
    >
      <H4 align='center'>{room.mode}</H4>
      <RoomTitleContainer>
        <P2 align='center'>방번호 [{room.roomId}]</P2>
        <P1 align='center'>{room.name}</P1>
      </RoomTitleContainer>
      <RoomOtherInfoContainer>
        <RoomIconContainer>
          <AwardFill />
          <P2 margin='0 0 0 1rem'>{room.leaderId}</P2>
        </RoomIconContainer>
        <RoomIconContainer>
          <PersonFill />
          <P2 margin='0 0 0 1rem'>{room.currentMember} / 6</P2>
        </RoomIconContainer>
      </RoomOtherInfoContainer>
      <CommonBtn
        width='100%'
        padding='0.5rem 0'
        color={colors.white}
        fontColor={colors.gameBlue500}
        border='none'
        font='1'
      >
        {room.closed ? (
          <LockFill style={{ fontSize: '24px' }} />
        ) : (
          <H5 align='center'>ENTER</H5>
        )}
      </CommonBtn>
    </Room>
  ));

  const handleChangeMode = (e) => {
    setActiveMode(() => e.target.value);
  };

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
        <SpeedoodleContentContainer>
          <InputContainer>
            <span>
              <SelectInput>{inputOption}</SelectInput>
              <CommonInput
                minWidth='32vw'
                height='55'
                font='1.2'
                padding='0 1rem'
                border={'none'}
                placeholder='방번호/방제목을 입력하세요.'
              />
              <CommonBtn
                height='55'
                font='1.5'
                fontColor={colors.gameBlue500}
                color={colors.white}
                padding='0.75rem 2rem'
                margin='0 0 0 1rem'
                border={'none'}
              >
                Search
              </CommonBtn>
            </span>
            <SelectInput onChange={handleChangeMode} value={activeMode}>
              {modeOption}
            </SelectInput>

            <CommonBtn
              width='55px'
              font='1.5'
              fontColor={colors.gameBlue500}
              color={colors.white}
              border={'none'}
            >
              <ArrowClockwise style={{ fontSize: '30px' }} />
            </CommonBtn>
            <CommonBtn
              height='55'
              font='1.5'
              fontColor={colors.gameBlue500}
              color={colors.gamePink200}
              padding='0.75rem 2rem'
              margin='0 0 0 1rem'
              border={'none'}
            >
              <H4>방만들기</H4>
            </CommonBtn>
          </InputContainer>

          <RoomContainer>{rooms}</RoomContainer>
        </SpeedoodleContentContainer>
        <Pagination
          total={42}
          limit={8}
          page={1}
          Ppage={1}
          setPage={1}
          setPpage={1}
        ></Pagination>
      </SpeedoodleWrapper>
    </>
  );
}

export default Speedoodle;
