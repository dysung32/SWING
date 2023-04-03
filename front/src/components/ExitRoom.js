import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { speedoodleGameState } from '../recoil';
import { API_URL } from '../config';

function ExitRoom(roomId, userId) {
  const [isGameStart, setIsGameStart] = useRecoilState(speedoodleGameState);
  setIsGameStart(false);
  axios
    .delete(`${API_URL}/doodle/room/leave/${roomId}/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        console.log('방퇴장합니다!');
      }
    })
    .catch((err) => console.error(err));
}

export default ExitRoom;
