import styled from '@emotion/styled';
import roundLogo from '../assets/swing_round_logo.png';

const RoundLogo = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: center / contain no-repeat url(${roundLogo});
  box-sizing: border-box;
  cursor: pointer;
`;

const CommonInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.font / 2}rem;
  border: ${(props) => props.border};
  font-size: ${(props) => props.font}rem;
  background: white;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
`;

const CommonBtn = styled.button`
  width: ${(props) => props.width};
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
  margin: ${(props) => props.margin};
  box-sizing: border-box;
`;

export const GameTitle = styled.div`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

export { RoundLogo, CommonInput, CommonBtn };
