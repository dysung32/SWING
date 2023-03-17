import styled from '@emotion/styled';
import roundLogo from '../assets/swing_round_logo.png';

const RoundLogo = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: center / contain no-repeat url(${roundLogo});
  box-sizing: border-box;
  cursor: pointer;
`;

export default RoundLogo;
