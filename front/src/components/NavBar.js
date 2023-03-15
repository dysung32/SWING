import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import roundLogo from '../assets/swing_round_logo.png';

function NavBar() {
  const navigate = useNavigate();
  const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 10%;
    position: absolute;
  `;
  const LogoRouter = styled.img`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    cursor: pointer;
  `;
  const NavItems = styled.h4`
    cursor: pointer;
  `;

  const onClickLogo = () => {
    navigate('/', { replace: true });
  };

  const onClickSentency = () => {
    navigate('/sentency', { replace: true });
  };
  const onClickHifive = () => {
    navigate('/hi-five', { replace: true });
  };
  const onClickSpeedoodle = () => {
    navigate('/speedoodle', { replace: true });
  };
  const onClickLogIn = () => {
    navigate('/login', { replace: true });
  };
  const onClickMyPage = () => {
    navigate('/my-page', { replace: true });
  };

  const onClickReviewNote = () => {
    navigate('/review-note', { replace: true });
  };
  return (
    <Nav>
      <NavItems onClick={onClickSentency}>Sentency</NavItems>
      <NavItems onClick={onClickHifive}>Hi-Five</NavItems>
      <NavItems onClick={onClickSpeedoodle}>Speedoodle</NavItems>
      <LogoRouter src={roundLogo} alt='logo' onClick={onClickLogo} size='7rem' />
      <NavItems onClick={onClickLogIn}> LogIn</NavItems>
      <NavItems onClick={onClickMyPage}>MyPage</NavItems>
      <NavItems onClick={onClickReviewNote}>ReviewNote</NavItems>
    </Nav>
  );
}

export default NavBar;
