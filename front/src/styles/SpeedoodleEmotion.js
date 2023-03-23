import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const SpeedoodleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 9rem 10% 1rem;
  background-color: ${colors.gameBlue300};
  box-sizing: border-box;
`;

export const SpeedoodleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75%;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectInput = styled.select`
  height: 55px;
  width: 8vw;
  padding-left: 1rem;
  margin-right: 1rem;
  font-size: 1.2rem;
  color: ${colors.gameBlue500};
  border-radius: 0.6rem;
  box-sizing: border-box;
`;

export const FilterBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  background-color: ${colors.white};
  border-radius: 0.75rem;
  box-sizing: border-box;
`;

export const RoomContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 1rem;
  height: 100%;
  margin-top: 1rem;
`;

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.color};
  color: ${colors.gameBlue500};
  border-radius: 1.5rem;
`;

export const RoomTitleContainer = styled.div`
  padding: 0.5rem;
  height: 34%;
  background-color: ${colors.white};
  border-radius: 1rem;
`;

export const RoomOtherInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RoomIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
