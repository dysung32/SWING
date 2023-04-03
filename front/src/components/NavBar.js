import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userState, speedoodleGameState } from '../recoil';
import { useRecoilState } from 'recoil';
import { API_URL, getCookie, delCookie } from '.././config';

import { RoundLogo, PlayerProfile } from '../styles/CommonEmotion';
import { Nav, NavItemGroup, NavItem, NavSubItems, NavLeaderItem } from '../styles/NavEmotion';
import { H4, H6 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import { BasicProfile } from '../config';
import IsLogin from '../auth/IsLogin';
import ExitRoom from './ExitRoom';

function NavBar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [hoverGame, setHoverGame] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isGameStart, setIsGameStart] = useRecoilState(speedoodleGameState);

  useEffect(() => {
    setIsLogin(IsLogin());
  }, []);

  const onClickLogo = () => {
    const currentUrl = window.location.href;
    if (currentUrl.indexOf('speedoodle/room') !== -1) {
      const roomUrl = new URL(window.location.href).pathname.split('/');
      const lengthUrl = roomUrl.length;
      const roomId = roomUrl[lengthUrl - 1];
      setIsGameStart(false);
      axios
        .delete(`${API_URL}/doodle/room/leave/${roomId}/${user.userId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log('방퇴장합니다!');
          }
        })
        .catch((err) => console.error(err));
    }
    navigate('/');
  };

  // const exitRoom = () => {

  //   ExitRoom(roomId, user.userId);
  // };

  const onClickSentency = () => {
    if (isLogin) {
      navigate('/sentency');
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login');
    }
  };
  const onClickHifive = () => {
    if (isLogin) {
      navigate('/hi-five');
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login');
    }
  };
  const onClickSpeedoodle = () => {
    if (isLogin) {
      navigate('/speedoodle');
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login');
    }
  };
  const onClickLogIn = () => {
    navigate('/login');
  };
  const onClickMyPage = () => {
    navigate('/my-page');
  };

  const onClickReviewNote = () => {
    navigate('/review-note');
  };

  const Logout = async () => {
    // const currentUrl = window.location.href;
    // if (currentUrl.indexOf('localhost') == -1) {
    await axios
      .get(`${API_URL}/user/logout/${user.userId}`, {
        headers: {
          'Access-Token': getCookie('accessToken'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          delCookie('accessToken');
          delCookie('refreshToken');
          setUser('');
          setIsLogin(false);
          navigate('/');
        }
      })
      .catch((e) => console.error(e));
    // } else {
    //   await axios
    //     .get(`http://localhost:3000/user/logout/${user.userId}`, {
    //       headers: {
    //         'Access-Token': getCookie('accessToken'),
    //       },
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         delCookie('accessToken');
    //         delCookie('refreshToken');
    //         setUser('');
    //         setIsLogin(false);
    //         navigate('/');
    //       }
    //     })
    //     .catch((e) => console.error(e));
    // }
  };

  return (
    <Nav>
      <NavItemGroup onMouseLeave={() => setHoverGame(() => false)}>
        <NavLeaderItem
          onMouseEnter={() => {
            setHoverGame((prev) => true);
          }}
        >
          GAME
        </NavLeaderItem>
        <NavSubItems hover={hoverGame} top='70%' left='10%'>
          <NavItem onClick={onClickSentency}>
            <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
              Sentency
            </H4>
          </NavItem>
          <NavItem onClick={onClickHifive}>
            <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
              Hi-Five
            </H4>
          </NavItem>
          <NavItem onClick={onClickSpeedoodle}>
            <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
              Speedoodle
            </H4>
          </NavItem>
        </NavSubItems>
      </NavItemGroup>

      <RoundLogo alt='logo' onClick={onClickLogo} size='7rem' />
      {isLogin ? (
        <>
          <NavItemGroup
            onMouseLeave={() => setHoverProfile(() => false)}
            onMouseEnter={() => setHoverProfile(() => true)}
          >
            <PlayerProfile
              src={user.profileImageUrl}
              width='3'
              height='3'
              alt='user profile image'
              style={{ cursor: 'pointer' }}
              onClick={() => setHoverProfile(() => true)}
            />
            <NavSubItems hover={hoverProfile} top='70%' left='80%'>
              <NavItem onClick={onClickMyPage} padding='0.5rem 2rem'>
                <H6>MyPage</H6>
              </NavItem>
              <div
                style={{
                  width: '80%',
                  border: `1px solid ${colors.gray500}`,
                }}
              ></div>
              <NavItem onClick={onClickReviewNote} padding='0.5rem 2rem'>
                <H6>ReviewNote</H6>
              </NavItem>
              <div
                style={{
                  width: '80%',
                  border: `1px solid ${colors.gray500}`,
                }}
              ></div>
              <NavItem onClick={() => Logout()} padding='0.5rem 2rem'>
                <H6>LogOut</H6>
              </NavItem>
            </NavSubItems>
          </NavItemGroup>
        </>
      ) : (
        <NavItem onClick={onClickLogIn}>
          <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
            LogIn
          </H4>
        </NavItem>
      )}
    </Nav>
  );
}

export default NavBar;
