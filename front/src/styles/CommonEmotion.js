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
  border-radius: ${(props) => props.height / 3}px;
  font-size: ${(props) => props.font}px;
  background: white;
`;

const CommonBtn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.height / 3}px;
  background-color: ${(props) => props.color};
  font-size: ${(props) => props.font}rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;


export { RoundLogo, 
  CommonInput,
  CommonBtn
};
