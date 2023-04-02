import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { SpeedoodleWrapper } from '../styles/SpeedoodleEmotion';
import SpeedoodleUser from '../components/SpeedoodleUser';
import SpeedoodleGameInfo from '../components/SpeedoodleGameInfo';
import { SpeedoodleRoomContainer } from '../styles/SpeedoodleRoomEmotion';
import { GameTitle } from '../styles/CommonEmotion';
import { H1, H2, H4, H5, P1, P2, SmText } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { noWait } from 'recoil';
import { API_URL, getCookie } from '../config';
import { useRecoilState } from 'recoil';
import { userState, speedoodleGameState } from '../recoil';

function SpeedoodleRoom() {
  const [gameRoomInfo, setGameRoomInfo] = useState({});
  const [chatInput, setChatInput] = useState('');
  const [isGameStart, setIsGameStart] = useRecoilState(speedoodleGameState);
  const [chatData, setChatData] = useState([]);
  const userImg =
    'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRSM-bLdlw42S0tP6jHNppEhfDDU2nwKRL9UzKv7Mx6uOay9N4RsJLJmst9VIxAOckx';

  const defaultUser = [
    {
      userId: 'red',
      nickname: '행복한초코',
      profileImgUrl: userImg,
      leader: true,
    },
    {
      userId: 'black',
      nickname: '귀여운뽀삐',
      profileImgUrl: userImg,
      leader: false,
    },
    {
      userId: 'mint',
      nickname: '맹지니',
      profileImgUrl: userImg,
      leader: false,
    },
    {
      userId: 'pink',
      nickname: '인두목',
      profileImgUrl: userImg,
      leader: false,
    },
    {
      userId: 'yellow',
      nickname: '데이비드',
      profileImgUrl: userImg,
      leader: false,
    },
    {
      userId: 'blue',
      nickname: '쪼안나',
      profileImgUrl: userImg,
      leader: false,
    },
  ];

  const gameStartUser = [
    {
      userId: 'red',
      nickname: '행복한초코',
      profileImgUrl: userImg,
      leader: true,
      time: '00:23:58',
    },
    {
      userId: 'black',
      nickname: '귀여운뽀삐',
      profileImgUrl: userImg,
      leader: false,
      time: '00:27:28',
    },
    {
      userId: 'mint',
      nickname: '맹지니',
      profileImgUrl: userImg,
      leader: false,
      time: '00:21:53',
    },
    {
      userId: 'pink',
      nickname: '인두목',
      profileImgUrl: userImg,
      leader: false,
      time: '00:18:28',
    },
    {
      userId: 'yellow',
      nickname: '데이비드',
      profileImgUrl: userImg,
      leader: false,
      time: '00:19:22',
    },
    {
      userId: 'blue',
      nickname: '쪼안나',
      profileImgUrl: userImg,
      leader: false,
      time: '00:29:38',
    },
  ];

  // const sock = new SockJS(`${API_URL}/speedoodle/room`);

  // stomp.reconnect_delay(1000);
  const stompRef = useRef(null);
  const roomUrl = new URL(window.location.href).pathname.split('/');
  const lengthUrl = roomUrl.length;
  const room_id = roomUrl[lengthUrl - 1];

  // room 랜더를 위해 불러오는 api

  useEffect(() => {
    getRoomInfo();
  }, []);

  const getRoomInfo = async () => {
    await axios
      .get(`${API_URL}//doodle/room/info/${room_id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setGameRoomInfo(() => res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log('save', gameRoomInfo);
  }, [gameRoomInfo]);

  // const handleGameRoomInfo = async (info) => {
  //   setGameRoomInfo(info);
  // };

  const stompConnect = () => {
    try {
      const stomp = Stomp.over(function () {
        return new SockJS(`${API_URL}/speedoodle/room`);
      });
      stomp.connect({}, (message) => {
        console.log(message);
        console.log('STOMP connection established');
        stomp.subscribe(
          `/sub/${room_id}`,
          (Ms) => {
            const msObj = JSON.parse(Ms.body);
            setChatData((chatData) => [
              ...chatData,
              [msObj.publisher, msObj.message],
            ]);
          },
          {}
        );
      });
      stompRef.current = stomp;
    } catch (error) {
      console.log(error);
    }
  };

  const stompDisconnect = () => {
    try {
      stompRef.disconnect(() => {
        stompRef.unsubscribe(`sub/${room_id}`);
      }, {});
    } catch (error) {}
  };

  const SendMessage = () => {
    // stomp.debug = null;
    const data = {
      roomId: room_id,
      publisher: `user/${room_id}`,
      message: chatInput,
    };
    if (stompRef.current?.connected) {
      console.log(stompRef.current.connected);
      stompRef.current.send('/pub/send', {}, JSON.stringify(data));
    } else {
      console.log(stompRef.current.connected);
      console.log('STOMP connection is not open');
    }
  };

  useEffect(() => {
    if (!stompRef.current) {
      stompConnect();
    }

    console.log(stompRef.current.connected);
    return () => {};
  }, []);

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
          {gameRoomInfo?.roomInfo ? (
            <>
              <SpeedoodleUser
                data={isGameStart ? gameStartUser : defaultUser}
              ></SpeedoodleUser>

              {isGameStart ? (
                <SpeedoodleGameInfo
                  gameInfo={gameRoomInfo.roomInfo}
                  // start={isGameStart}
                  // setIsGameStart={setIsGameStart}
                  roomId={room_id}
                ></SpeedoodleGameInfo>
              ) : (
                <SpeedoodleGameInfo
                  gameInfo={gameRoomInfo.roomInfo}
                  // start={isGameStart}
                  // setIsGameStart={setIsGameStart}
                  SendMessage={SendMessage}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  chatData={chatData}
                  // isMode={isMode}
                ></SpeedoodleGameInfo>
              )}
            </>
          ) : (
            <>loading중</>
          )}
        </SpeedoodleRoomContainer>
      </SpeedoodleWrapper>
    </>
  );
}

export default SpeedoodleRoom;
