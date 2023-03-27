import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const MyPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  padding-top: 9rem;
  box-sizing: border-box;
  background-color: ${colors.studyBlue300};
`;

export const MyPageContentContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  width: 100%;
  height: 75%;
  box-sizing: border-box;
`;

export const MyPageMainConatiner = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 10;
  box-sizing: border-box;
`;

export const MyPageSideConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 10;
  grid-column-end: 13;
  background-color: ${colors.white};
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const MyPageProfileConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  box-sizing: border-box;
`;
export const MyPageProfileImg = styled.div`
  position: relative;
`;

export const FileInput = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: ${colors.gray300};
  color: ${colors.black};
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;
`;

export const MyPageProfileNickname = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;

  .nickname {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.studyBlue300};
    padding-right: 1rem;
  }
`;

export const MyPageProfileCoupon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CouponImg = styled.img`
  width: 25%;
  padding-right: 1rem;
  object-fit: contain;
`;

export const MyPageIntroConatiner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 30%;
  padding: 1rem 1.5rem;
  background-color: ${colors.white};
  border-radius: 1rem;
  box-sizing: border-box;
  overflow: hidden;

  .swingImg {
    width: 8rem;
    position: absolute;
    top: -10%;
    right: 15%;

    animation: swing ease-in-out 2s infinite alternate;
    transform-origin: 100% 0%;
  }

  @keyframes swing {
    0% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(-65deg);
    }
  }

  .swing-bold {
    font-weight: 700;
    color: ${colors.studyBlue300};
  }

  h3 {
    color: ${colors.gameYellow300};
  }
`;

export const MyPageHistoryConatiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(70% - 2rem);
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  background-color: ${colors.white};
  border-radius: 1rem;
  box-sizing: border-box;

  .more-list-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }

  .more-list-nav h6 {
    cursor: pointer;
    color: ${colors.studyBlue500};
  }
`;

export const MyPageHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: ${(props) => (props.border ? `2px solid ${colors.gameBlue500}` : '')};
  box-sizing: border-box;
`;
export const MyPageHistoryList = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-bottom: 2px solid ${colors.gameBlue500};
  cursor: pointer;
  box-sizing: border-box;
`;
