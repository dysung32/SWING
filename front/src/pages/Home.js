import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import {
  HomeWrapper,
  HomeHeroContainer,
  HomeSentencyContainer,
  HomeHiFiveContainer,
  HomeSpeedoodleContainer,
  Divider,
  HeroScrollMsg,
  HeroScrollIconContainer,
  HeroScrollIconAni,
  UserInfoBox,
  UserCouponBox,
  UserBtnBox,
  HomeRankBtn,
  HeroIntroBox,
  HeroGif,
  GlowingBtn,
  GameInfoContainer,
} from '../styles/HomeEmotion';
import { H1, H3, H4, H5 } from '../styles/Fonts';
import { Mouse, ChevronDoubleDown, TrophyFill } from 'react-bootstrap-icons';
import { CommonBtn, GameTitle, PlayerProfile } from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { CouponImg } from '../styles/MyPageEmotion';

import alarm from '../assets/alarm.png';
import Coupon from '../assets/main_coupon.svg';
import {
  API_URL,
  BasicProfile,
  setCookie,
  getCookie,
  delCookie,
} from '../config';
import IsLogin from '../auth/IsLogin';
import CheckAccessNRefresh from '../auth/CheckAccessNRefresh';
import axios from 'axios';
import SideLeaderBoard from '../components/SideLeaderBoard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [sentencyRankShow, setSentencyRankShow] = useState(false);
  const [hifiveRankShow, setHifiveRankShow] = useState(false);

  const [rankers, setRankers] = useState([]);
  const [myRank, setMyRank] = useState([]);

  const [successRefresh, setSuccessRefresh] = useState(false);
  const [passAccess, setPassAccess] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const sentencySwiperRef = useRef();
  const hifiveSwiperRef = useRef();

  const [scrollIndex, setScrollIndex] = useState(1);
  const DIVIDER_HEIGHT = 5;
  const scrollRef = useRef();

  const getCouponCnt = () => {
    axios
      .get(`${API_URL}/user/${user.userId}`, {
        headers: {
          'Access-Token': getCookie('accessToken'),
        },
      })
      .then((res) => {
        console.log(res);
        setCoupon(() => res.data.user.coupon);
      });
  };

  const handleSentencyRankBtn = async () => {
    if (!user) {
      alert('로그인 후 랭킹 조회가 가능합니다.');
      navigate('/login');
      return;
    }
    await axios
      .get(`${API_URL}/sentency/${user.userId}`, {
        headers: {
          'Access-Token': getCookie('accessToken'),
        },
      })
      .then((res) => {
        console.log('sentency 랭킹 불러오기');
        console.log(res.data);
        setRankers(res.data.sentencyRankList.slice(0, 7));
        setMyRank(res.data.sentencyRankList.pop());
      })
      .catch((err) => {
        console.log(`sentency 랭킹 호출 중 오류 발생!`);
      });
    setSentencyRankShow(true);
  };

  const handleFiveRankBtn = async () => {
    if (!user) {
      alert('로그인 후 랭킹 조회가 가능합니다.');
      navigate('/login');
      return;
    }
    await axios
      .get(`${API_URL}/five/${user.userId}`, {
        headers: {
          'Access-Token': getCookie('accessToken'),
        },
      })
      .then((res) => {
        console.log('hifive 랭킹 불러오기');
        console.log(res.data);
        setRankers(res.data.fiveRankList.slice(0, 7));
        setMyRank(res.data.fiveRankList.pop());
      })
      .catch((err) => {
        console.log(`Hifive 랭킹 호출 중 오류 발생!`);
      });
    setHifiveRankShow(true);
  };

  CheckAccessNRefresh(getCouponCnt, coupon);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const scrollTop = window.scrollY;
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh.
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 hero -> sentency
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> speedoodle
          window.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 4);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 hero-> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> sentency
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        }
      }
    };
    const scrollRefCurrent = scrollRef.current;
    scrollRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      scrollRefCurrent.removeEventListener('wheel', wheelHandler);
      // setPassAccess(() => false);
      // setSuccessRefresh(() => false);
    };
  }, []);

  return (
    <>
      <HomeWrapper ref={scrollRef}>
        {IsLogin() ? (
          <UserInfoBox>
            <div className='flex userInfo'>
              <PlayerProfile
                width={5}
                height={5}
                src={user.profileImageUrl}
                onClick={() => navigate('/my-page')}
              />
              <div className='nickname'>{user.nickname}</div>
            </div>
            <UserCouponBox>
              <CouponImg src={Coupon} alt='coupon' width={3.5} />
              <div className='couponInfo'>
                쿠폰 <span className='couponCnt'>{coupon}</span>
              </div>
            </UserCouponBox>
            <UserBtnBox>
              <CommonBtn
                color={colors.studyPink200}
                hoverColor={colors.studyPink300}
                font={1}
                padding='0.5rem 1rem'
                onClick={() => navigate('/review-note')}
              >
                오답노트
              </CommonBtn>
              <CommonBtn
                color={colors.studyBlue100}
                hoverColor={colors.studyBlue200}
                font={1}
                padding='0.5rem 1rem'
                onClick={() => navigate('/history')}
              >
                히스토리
              </CommonBtn>
            </UserBtnBox>
          </UserInfoBox>
        ) : null}

        <HomeHeroContainer>
          <HeroIntroBox>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '50%',
                height: '100%',
                zIndex: '1',
              }}
            >
              <p
                style={{
                  fontSize: '1.5vw',
                  fontWeight: 'bold',
                  color: `${colors.gameBlue500}`,
                  margin: '0',
                }}
              >
                Study With Image N Game
              </p>
              <p
                style={{
                  fontSize: '5vw',
                  fontWeight: 'bold',
                  color: `${colors.gameBlue500}`,
                  margin: '0',
                }}
              >
                SWING
              </p>
              <p
                style={{
                  fontSize: '1.2vw',
                  fontWeight: '400',
                  color: `${colors.gameBlue500}`,
                  wordBreak: 'keep-all',
                }}
              >
                SWING은 즐겁게 영어 공부하고 싶은 당신을 위해 탄생했습니다. AI와
                함께 세가지 이미지 게임으로 놀면서 영어를 공부할 수 있다니 참
                재밌을 것 같지 않나요? 단어, 작문을 활용한 게임으로 영어 공부에
                몰입하고, 혼자 하는 공부가 지겨울 땐 친구들과의 그림 대결도
                즐겨보세요!
              </p>
            </div>

            <HeroGif />
          </HeroIntroBox>
          <HeroScrollMsg>
            <H4>Scroll Down for Games</H4>
            <HeroScrollIconContainer>
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: '36px' }} />
              </HeroScrollIconAni>
              <Mouse
                style={{
                  fontSize: '48px',
                  padding: '0.5rem',
                }}
              />
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: '36px' }} />
              </HeroScrollIconAni>
            </HeroScrollIconContainer>
          </HeroScrollMsg>
        </HomeHeroContainer>
        <Divider style={{ backgroundColor: `${colors.gameBlue100}` }}></Divider>
        <HomeSentencyContainer>
          <GameInfoContainer>
            <H1
              color={colors.white}
              outline={colors.gameBlue500}
              outlineWeight={2}
            >
              SENTENCY
            </H1>
            <HomeRankBtn onClick={handleSentencyRankBtn}>
              <div className='text'>Click!!</div>
              <TrophyFill className='trophy' />
            </HomeRankBtn>
            <SideLeaderBoard
              modalShow={sentencyRankShow}
              setModalShow={setSentencyRankShow}
              rankers={rankers}
              myRank={myRank}
            />
            <Swiper
              modules={[Navigation, Pagination]}
              className='slideContainer'
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                sentencySwiperRef.current = swiper;
              }}
            >
              <SwiperSlide className='slide'>
                <H3>
                  <img src={alarm} alt='warning' className='warningEmoji' />
                  게임 유의사항
                  <img src={alarm} alt='warning' className='warningEmoji' />
                </H3>
                <div className='warningBox'>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>총 life 개수는 5개입니다.</H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>
                      보유하고 있는 쿠폰이 있다면 추가 시도가 가능합니다.
                      <br />
                      쿠폰은 복습테스트를 통해 획득이 가능합니다.
                    </H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>
                      유사도 검사는 AI가 문장 구조 및 단어 스펠링이 아닌 문장의
                      의미를 기반으로 측정합니다.
                    </H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>
                      오답이더라도 일부 단어가 정답 문장의 단어와 위치까지
                      일치할 경우, 해당 단어는 유저에게 공개됩니다.
                    </H4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229963030-255665ed-bbdc-49fe-a865-ec3025cb9329.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>1.</H4>
                  <H4 className='desc'>
                    게임이 시작되면 한 장의 랜덤 이미지와 해당 이미지를 설명하는
                    한글 문장이 유저에게 주어집니다.
                  </H4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229963137-df7003a1-54a7-48fe-acd0-376257b6ec55.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>2.</H4>
                  <H4 className='desc'>
                    유저는 주어진 이미지와 문장의 단어 수를 참고하여 본문을
                    맞춰야 합니다.
                  </H4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229958895-5395af6c-a765-4050-8dde-512d2923cbb5.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>3.</H4>
                  <H4 className='desc'>
                    유저가 입력한 문장과 정답을 비교하여 문장유사도가 90% 이상일
                    경우 정답으로 처리가 됩니다.
                  </H4>
                </div>
              </SwiperSlide>
            </Swiper>
            <GlowingBtn onClick={() => navigate('/sentency')}>PLAY</GlowingBtn>
          </GameInfoContainer>
        </HomeSentencyContainer>
        <Divider style={{ backgroundColor: `${colors.gameBlue200}` }}></Divider>
        <HomeHiFiveContainer>
          <GameInfoContainer>
            <H1
              color={colors.white}
              outline={colors.gameBlue500}
              outlineWeight={2}
            >
              HI-FIVE
            </H1>
            <HomeRankBtn onClick={handleFiveRankBtn}>
              <div className='text'>Click!!</div>
              <TrophyFill className='trophy' />
            </HomeRankBtn>
            <SideLeaderBoard
              modalShow={hifiveRankShow}
              setModalShow={setHifiveRankShow}
              rankers={rankers}
              myRank={myRank}
            />
            <Swiper
              modules={[Navigation, Pagination]}
              className='slideContainer'
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                hifiveSwiperRef.current = swiper;
              }}
            >
              <SwiperSlide className='slide'>
                <H3>
                  <img src={alarm} alt='warning' className='warningEmoji' />
                  게임 유의사항
                  <img src={alarm} alt='warning' className='warningEmoji' />
                </H3>
                <div className='warningBox'>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>hi-five는 하루에 1번만 도전이 가능합니다.</H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>hi-five에서는 쿠폰 사용이 불가능합니다.</H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>
                      AI가 동의어를 고려하여 유사도가 85% 이상인 경우 정답으로
                      처리합니다.
                    </H4>
                  </div>
                  <div className='flex'>
                    <H4 className='order'>•</H4>
                    <H4>
                      유저가 입력한 단어와 정답의 유사도가 40% 이상 85% 미만인
                      물체가 있으면 해당 물체를 좌우로 흔들어 힌트를 줍니다.
                    </H4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229980262-df5544ed-0eef-4c6c-8a07-f7b367ed8d81.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>1.</H4>
                  <H4 className='desc'>
                    게임이 시작되면 5장의 랜덤 물체 이미지가 겹쳐진 상태로
                    유저에게 주어집니다.
                  </H4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229980852-1661d1b1-ca23-4045-a7b4-b325795dd7a4.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>2.</H4>
                  <H4 className='desc'>
                    유저는 각각의 물체 이미지를 영어로 맞춰야 합니다.
                  </H4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='slide'>
                <H3>게임 진행 방법</H3>
                <img
                  className='how-to-img'
                  src={
                    'https://user-images.githubusercontent.com/55757379/229980852-1661d1b1-ca23-4045-a7b4-b325795dd7a4.png'
                  }
                  alt='img'
                />
                <div className='flex'>
                  <H4 className='order'>3.</H4>
                  <H4 className='desc'>
                    5개의 물체를 모두 맞히면 게임이 종료됩니다.
                  </H4>
                </div>
              </SwiperSlide>
            </Swiper>
            <GlowingBtn onClick={() => navigate('/hi-five')}>PLAY</GlowingBtn>
          </GameInfoContainer>
        </HomeHiFiveContainer>
        <Divider style={{ backgroundColor: `${colors.gameBlue200}` }}></Divider>
        <HomeSpeedoodleContainer></HomeSpeedoodleContainer>
      </HomeWrapper>
    </>
  );
}

export default Home;
