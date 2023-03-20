import {
  LeaderBoardWrapper,
  MyRankContainer,
  PlayerInfo,
  PlayerName,
  PlayerProfile,
  PlayerScore,
  RankerContainer,
  RankListContainer,
  SinglePlayerContainer,
  SingleRankerContainer,
} from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { H5 } from '../styles/Fonts';

function LeaderBoard() {
  const myRankInfo = {
    rank: 2,
    profile: 'https://cdn-icons-png.flaticon.com/512/189/189533.png',
    name: '플레이어 1',
    score: 80,
  };
  const subRankers = [
    {
      rank: 4,
      profile:
        'https://lh3.googleusercontent.com/js_XKST6gTKYfudPTVMznmSGTKa82mINzymaOZwsad4EWv10TMh61HbO2yyvu3lz80MIfs5ZgUMZ4iYfOZ_Flpf8bcNIGD-hR4K4WKNVyQ',
      name: '플레이어 4',
      score: 75,
    },
    {
      rank: 5,
      profile:
        'https://mblogthumb-phinf.pstatic.net/20150203_145/hkjwow_1422965972209lH4KE_JPEG/%C4%AB%C5%E5%C7%C1%BB%E7_7.jpg?type=w210',
      name: '플레이어 5',
      score: 74,
    },
    {
      rank: 6,
      profile: 'https://www.ilbe.com/file/download/5118164998',
      name: '플레이어 6',
      score: 69,
    },
    {
      rank: 7,
      profile: 'https://image.idus.com/image/files/928b87f3980b4604a4813ac1583a65cd.jpg',
      name: '플레이어 7',
      score: 65,
    },
  ];

  return (
    <>
      <LeaderBoardWrapper>
        <RankerContainer>
          <div className='leaderboardTitle'>LEADERBOARD</div>
          <div className='rankersList'>
            <SingleRankerContainer>
              <PlayerProfile
                src='https://cdn-icons-png.flaticon.com/512/189/189533.png'
                width={4}
                height={4}
                margin='0 0 0.5rem 0'
              />
              {/* 메달 */}
              <PlayerName fontColor={colors.white} font={'10px'}>
                플레이어 1
              </PlayerName>
              <PlayerScore font={'1rem'}>80</PlayerScore>
            </SingleRankerContainer>
            <SingleRankerContainer>
              <PlayerProfile
                src='https://www4.minijuegosgratis.com/v3/games/thumbnails/230368_7_sq.jpg'
                width={6}
                height={6}
                margin='0 0 0.5rem 0'
              />
              {/* 메달 */}
              <PlayerName fontColor={colors.white} font={'16px'} fontWeight={700}>
                플레이어 3
              </PlayerName>
              <PlayerScore font={'20px'}>85</PlayerScore>
            </SingleRankerContainer>
            <SingleRankerContainer>
              <PlayerProfile
                src='https://is4-ssl.mzstatic.com/image/thumb/Purple126/v4/52/ac/8f/52ac8f4d-8587-9c5f-9a6e-7d7d12a62b58/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp'
                width={4}
                height={4}
                margin='0 0 0.5rem 0'
              />
              {/* 메달 */}
              <PlayerName fontColor={colors.white} font={'10px'}>
                플레이어 2
              </PlayerName>
              <PlayerScore font={'1rem'}>77</PlayerScore>
            </SingleRankerContainer>
          </div>
        </RankerContainer>
        <RankListContainer>
          {subRankers.map((subRanker) => {
            return (
              <SinglePlayerContainer margin={'0 0 0.5rem 0'}>
                <PlayerInfo>
                  <H5 color={colors.gameBlue400}>{subRanker.rank}</H5>
                  <PlayerProfile src={subRanker.profile} width={2.5} height={2.5} margin={0.5} />
                  <PlayerName font={'1rem'} fontWeight={500}>
                    {subRanker.name}
                  </PlayerName>
                </PlayerInfo>
                <PlayerScore font={'20px'}>{subRanker.score}</PlayerScore>
              </SinglePlayerContainer>
            );
          })}
        </RankListContainer>
        <MyRankContainer>
          <SinglePlayerContainer>
            <PlayerInfo>
              <H5 color={colors.gameBlue400}>{myRankInfo.rank}</H5>
              <PlayerProfile src={myRankInfo.profile} width={2.5} height={2.5} margin={0.5} />
              <PlayerName font={'1rem'} fontWeight={500}>
                {myRankInfo.name}
              </PlayerName>
            </PlayerInfo>
            <PlayerScore font={'20px'}>{myRankInfo.score}</PlayerScore>
          </SinglePlayerContainer>
        </MyRankContainer>
      </LeaderBoardWrapper>
    </>
  );
}

export default LeaderBoard;
