import { useRef } from 'react';
import {
  PlayerProfile,
  SideLeaderBoardBackground,
  SideLeaderBoardSingleBox,
  SideLeaderBoardWrapper,
} from '../styles/CommonEmotion';

function SideLeaderBoard(props) {
  const outSection = useRef();

  const renderRank = (rank) => {
    if (rank === 1) {
      return '1st';
    } else if (rank === 2) {
      return '2nd';
    } else if (rank === 3) {
      return '3rd';
    } else {
      return `${rank}th`;
    }
  };

  return (
    <>
      {props.modalShow ? (
        <SideLeaderBoardBackground
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              console.log('모달 외부공간 클릭!');
              props.setModalShow(false);
            }
          }}
        >
          <SideLeaderBoardWrapper>
            <div className='title'>LEADERBOARD</div>
            {props.rankers.map((ranker, idx) => {
              return (
                <SideLeaderBoardSingleBox>
                  <div className='rank'>{renderRank(idx + 1)}</div>
                  <PlayerProfile src={ranker.profileImageUrl} width={3.5} height={3.5} alt='profile' />
                  <div className='nickname'>{ranker.nickname}</div>
                  <div className='score'>{ranker.score}</div>
                </SideLeaderBoardSingleBox>
              );
            })}
          </SideLeaderBoardWrapper>
        </SideLeaderBoardBackground>
      ) : null}
    </>
  );
}

export default SideLeaderBoard;
