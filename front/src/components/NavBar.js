import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoundLogo, PlayerProfile } from '../styles/CommonEmotion';
import { Nav, NavItemGroup, NavItem, NavSubItems, NavLeaderItem } from '../styles/NavEmotion';
import { H4, H6 } from '../styles/Fonts';
import { colors } from '../styles/ColorPalette';
import { BasicProfile } from '../config';

function NavBar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [hoverGame, setHoverGame] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);

  const onClickLogo = () => {
    navigate('/');
  };

  const onClickSentency = () => {
    navigate('/sentency');
  };
  const onClickHifive = () => {
    navigate('/hi-five');
  };
  const onClickSpeedoodle = () => {
    navigate('/speedoodle');
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

  const changeIsLogin = () => {
    setIsLogin(() => true);
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
          <NavItem onClick={onClickLogIn}>
            <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
              LogIn
            </H4>
          </NavItem>
          <NavItemGroup
            onMouseLeave={() => setHoverProfile(() => false)}
            onMouseEnter={() => setHoverProfile(() => true)}
          >
            <PlayerProfile
              src={BasicProfile}
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
              <div style={{ width: '80%', border: `1px solid ${colors.gray500}` }}></div>
              <NavItem onClick={onClickReviewNote} padding='0.5rem 2rem'>
                <H6>ReviewNote</H6>
              </NavItem>
              <div style={{ width: '80%', border: `1px solid ${colors.gray500}` }}></div>
              <NavItem
                onClick={() => {
                  setIsLogin(() => false);
                }}
                padding='0.5rem 2rem'
              >
                <H6>LogOut</H6>
              </NavItem>
            </NavSubItems>
          </NavItemGroup>
        </>
      ) : (
        <NavItem onClick={changeIsLogin}>
          <H4 color={colors.white} outlineWeight='2' outline={colors.gameBlue500}>
            LogIn
          </H4>
        </NavItem>
      )}
    </Nav>
  );
}

export default NavBar;
