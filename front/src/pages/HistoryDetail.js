import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from "react-bootstrap-icons";
import { colors } from "../styles/ColorPalette";
import { CommonBtn, GameTitle, PlayerProfile } from "../styles/CommonEmotion";
import { H1 } from "../styles/Fonts";
import {
  GameRoundNav,
  HistoryContent,
  HistoryContentContainer,
  HistoryPictureContainer,
  Picture,
  SinglePicContainer,
  UserInfoBox,
  UserNickName,
} from "../styles/HistoryEmotion";
import { MyPageWrapper } from "../styles/MyPageEmotion";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HistoryDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState(location.state.date);
  const [rank, setRank] = useState(location.state.rank);

  const [picDatas, setPicDatas] = useState([
    {
      imgURL:
        "https://post-phinf.pstatic.net/20150407_97/feltboy_1428374893081kRw1D_JPEG/mug_obj_201504071148148504.jpg?type=w1080",
      profileImg:
        "https://i1.daumcdn.net/thumb/C276x260/?fname=https://t1.daumcdn.net/cfile/tistory/2261AA46582D467B3C",
      nickname: "뽀삐",
    },
    {
      imgURL:
        "https://post-phinf.pstatic.net/MjAxOTA0MDFfMTM3/MDAxNTU0MDgyNDkyODYx.IHB9TFO3DbU00HTJsNV0BomoB9fsbCb2qhmu8uImNEYg.o8JWsn8mV2NtAkGeDZTdq58YLWxr-kkwwjltnJETRc4g.PNG/2019-04-01_10%3B34%3B23.PNG?type=w1200",
      profileImg:
        "https://i1.sndcdn.com/artworks-000660689140-c2xvj9-t500x500.jpg",
      nickname: "초코",
    },
    {
      imgURL:
        "https://post-phinf.pstatic.net/20150407_207/feltboy_14283748926599iAs5_JPEG/mug_obj_201504071148141012.jpg?type=w1080",
      profileImg:
        "https://st.kakaocdn.net/product/gift/product/20220315105300_af4e5d0a834e401d89c3ffba4613dded.jpg",
      nickname: "해피",
    },
    {
      imgURL:
        "https://post-phinf.pstatic.net/20150407_81/feltboy_1428374893035aYUrQ_JPEG/mug_obj_20150407114814337.jpg?type=w1080",
      profileImg:
        "https://i.insider.com/587a4f33ee14b6a07b8b543d?width=1700&format=jpeg&auto=webp",
      nickname: "마리오",
    },
    {
      imgURL:
        "https://post-phinf.pstatic.net/MjAxOTA0MDFfMTcx/MDAxNTU0MDc4NzQ5ODcx.2xBa3uOKImewg0_uowIGIJ5YvGyKecB5kkbMY7_io4Yg.SpGYxlMSuR1LfhW3bAo_SrKxt_nRTd1okl6n03YZDQ4g.PNG/2019-04-01_09%3B18%3B18.PNG?type=w1200",
      profileImg: "https://pbs.twimg.com/media/EXuXrv4UcAAyt4h.jpg",
      nickname: "햄토리",
    },
    {
      imgURL:
        "https://mblogthumb-phinf.pstatic.net/MjAxODA0MTBfNTYg/MDAxNTIzMzcwMjEzMzY4.fEmZ2VHgT-QZTtSOG0WXxSndJZNmUyinXwN0eK2e9P8g.a6I8K648amVQqJmJKREfSy4l00PcYyOuy5EmepQfKN0g.JPEG.xiipego/%EC%97%90%ED%8E%A0%ED%83%91_11.jpg?type=w800",
      profileImg:
        "https://simg.nicepng.com/png/small/866-8660165_super-smash-bros-ultimate-luigi.png",
      nickname: "루이지",
    },
  ]);

  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperRef = useRef();

  const renderPics = picDatas.map((pic, index) => {
    return (
      <SinglePicContainer key={index}>
        <Picture src={pic.imgURL} />
        <UserInfoBox>
          <PlayerProfile
            src={pic.profileImg}
            width={3}
            maxWidth={3}
            height={3}
            className="profile"
          />
          <UserNickName>{pic.nickname}</UserNickName>
          <CommonBtn
            width={"5rem"}
            minWidth={"3.5rem"}
            height={45}
            font={1.1}
            color={colors.gameYellow200}
            hoverColor={colors.gameYellow300}
            fontColor={colors.gameBlue500}
            fontWeight={700}
            className="save-btn">
            저장
          </CommonBtn>
        </UserInfoBox>
      </SinglePicContainer>
    );
  });

  // useEffect(() => {
  //   if (swiperRef.current.activeIndex === 0) {
  //     console.log("첫번째!");
  //     return;
  //   }
  // });

  return (
    <>
      <MyPageWrapper>
        <GameTitle>
          <H1
            color={colors.white}
            outline={colors.gameBlue500}
            outlineWeight={2}
            align="center">
            {date} 일자 게임 | 랭킹: {rank}등
          </H1>
        </GameTitle>
        <div className="flex history-btn">
          <CommonBtn
            color={colors.gamePink200}
            fontColor={colors.gameBlue500}
            fontWeight={700}
            font={1.1}
            padding="0.5rem 1rem"
            margin="0 0 0.5rem 0"
            onClick={() => navigate("/history")}>
            목록으로
          </CommonBtn>
        </div>
        <HistoryContentContainer>
          <HistoryContent>
            <GameRoundNav>
              {leftHover ? (
                <CaretLeftFill
                  className="left"
                  ref={navigationPrevRef}
                  onClick={() => swiperRef.current.slidePrev()}
                  onMouseLeave={() => setLeftHover(false)}
                />
              ) : (
                <CaretLeft
                  className="left"
                  onMouseEnter={() => setLeftHover(true)}
                />
              )}
              <div className="roundNum">ROUND 1</div>
              {rightHover ? (
                <CaretRightFill
                  className="right"
                  ref={navigationNextRef}
                  onClick={() => swiperRef.current.slideNext()}
                  onMouseLeave={() => setRightHover(false)}
                />
              ) : (
                <CaretRight
                  className="right"
                  onMouseEnter={() => setRightHover(true)}
                />
              )}
            </GameRoundNav>
            <HistoryPictureContainer
              onMouseEnter={() => swiperRef.current.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.autoplay.start()}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={1}
                autoplay={{
                  delay: 5000, // 5초에 한번씩 자동 재생
                  disableOnInteraction: true,
                }}
                navigation={{
                  // 버튼 사용자 지정
                  nextEl: navigationNextRef.current,
                  prevEl: navigationPrevRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.update();
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper">
                {/* 1라운드 */}
                <SwiperSlide className="slideContainer">
                  {renderPics}
                </SwiperSlide>
                {/* 2라운드 */}
                <SwiperSlide className="slideContainer">
                  {renderPics}
                </SwiperSlide>
                {/* 3라운드 */}
                <SwiperSlide className="slideContainer">
                  {renderPics}
                </SwiperSlide>
                {/* 4라운드 */}
                <SwiperSlide className="slideContainer">
                  {renderPics}
                </SwiperSlide>
                {/* 5라운드 */}
                <SwiperSlide className="slideContainer">
                  {renderPics}
                </SwiperSlide>
              </Swiper>
            </HistoryPictureContainer>
            {/* {renderPics} */}
          </HistoryContent>
        </HistoryContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default HistoryDetail;
