import styled from '@emotion/styled';
import roundLogo from '../assets/swing_round_logo.png';
import { colors } from './ColorPalette';

export const RoundLogo = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: center / contain no-repeat url(${roundLogo});
  box-sizing: border-box;
  cursor: pointer;
`;

export const CommonInput = styled.input`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.font / 2}rem;
  border: ${(props) => props.border};
  font-size: ${(props) => props.font}rem;
  background: white;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  flex-grow: ${(props) => props.flexGrow};
`;

export const CommonBtn = styled.button`
  // width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.font / 2}rem;
  border: ${(props) => props.border};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.color};
  font-size: ${(props) => props.font}rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  box-sizing: border-box;
`;

export const GameTitle = styled.div`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

export const CommonModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  top: 0%;
  position: absolute;
`;

export const CommonModalView = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  z-index: 1000;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border-radius: ${(props) => (props.font ? props.font / 2 : 0.5)}rem;
  box-sizing: border-box;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.div`
  position: absolute;
  padding: 3rem 5rem;
  text-align: center;
  background-color: ${colors.white};
  border-radius: 1rem;
`;
