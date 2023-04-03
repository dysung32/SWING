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
  const [user, setUser] = useRecoilState(userState);

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
      .get(`${API_URL}/doodle/room/info/${room_id}`)
      .then((res) => {
        if (res.status === 200) {
          setGameRoomInfo(() => res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      publisher: user.nickname,
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

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ''; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  const preventGoBack = () => {
    window.history.pushState(null, '', window.location.href);
  };

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
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
                leader={gameRoomInfo?.roomInfo.leaderNickname}
                data={gameRoomInfo?.chatUserList}
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
