import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoundLogo } from '../styles/CommonEmotion';
import { Nav, NavItems } from '../styles/NavEmotion';

function NavBar() {
  const navigate = useNavigate();

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
  return (
    <Nav>
      <NavItems onClick={onClickSentency}>Sentency</NavItems>
      <NavItems onClick={onClickHifive}>Hi-Five</NavItems>
      <NavItems onClick={onClickSpeedoodle}>Speedoodle</NavItems>
      <RoundLogo alt='logo' onClick={onClickLogo} size='7rem' />
      <NavItems onClick={onClickLogIn}> LogIn</NavItems>
      <NavItems onClick={onClickMyPage}>MyPage</NavItems>
      <NavItems onClick={onClickReviewNote}>ReviewNote</NavItems>
    </Nav>
  );
}

export default NavBar;
