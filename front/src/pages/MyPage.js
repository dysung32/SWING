import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  MyPageWrapper,
  MyPageContentContainer,
  MyPageMainConatiner,
  MyPageSideConatiner,
  MyPageProfileConatiner,
  MyPageIntroConatiner,
  MyPageHistoryConatiner,
  HistoryHeader,
  MyPageHistoryList,
  FileInput,
  MyPageProfileNickname,
  MyPageProfileCoupon,
  CouponImg,
  MyPageProfile,
  NickNameEditBox,
  EditBtnBox,
} from "../styles/MyPageEmotion";
import MyPageSwing from "../assets/mypage_swing.png";
import Coupon from "../assets/coupon.svg";
import { GameTitle, CommonBtn } from "../styles/CommonEmotion";
import { H1, H2, H3, H5, H6, P1 } from "../styles/Fonts";
import { colors } from "../styles/ColorPalette";

import { PencilSquare } from "react-bootstrap-icons";
import ModalClosable from "../components/ModalClosable";
import { BasicProfile } from "../config";

function MyPage() {
  const navigate = useNavigate();

  const nickNameRef = useRef();

  const [nickname, setNickname] = useState("");
  const [nicknameRegExpTest, setNicknameRegExpTest] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const tmpnickName = "Player1";
  const coupon = 3;
  const historyList = [
    {
      date: "2023.03.01",
      title: "나랑 같이 놀 사람",
      rank: 2,
    },
    {
      date: "2023.03.02",
      title: "공부합시다",
      rank: 3,
    },
    {
      date: "2023.03.03",
      title: "놀자아",
      rank: 1,
    },
    {
      date: "2023.03.05",
      title: "A405",
      rank: 2,
    },
    {
      date: "2023.03.07",
      title: "SSAFY 8기",
      rank: 1,
    },
    {
      date: "2023.03.07",
      title: "SSAFY 8기",
      rank: 1,
    },
    {
      date: "2023.03.07",
      title: "SSAFY 8기",
      rank: 1,
    },
  ];

  const [profileEditModalShow, setProfileEditModalShow] = useState(false);

  useEffect(() => {
    setNickname(tmpnickName);
  }, []);

  const renderList = historyList.map((history, idx) => {
    return (
      <MyPageHistoryList
        key={idx}
        onClick={() =>
          navigate(`/history/${idx}`, {
            state: { date: history.date, rank: history.rank },
          })
        }>
        <P1 color={colors.gameBlue500}>{history.date}</P1>
        <P1 color={colors.gameBlue500}>{history.title}</P1>
        <P1 color={colors.gameBlue500}>{history.rank}등</P1>
      </MyPageHistoryList>
    );
  });

  const changeNickname = () => {
    const changedNickname = nickNameRef.current.value;
    console.log(changedNickname);
    const regExp = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,30}$/g;
    if (regExp.test(changedNickname)) {
      console.log("유효성 검사 통과");
      setNicknameRegExpTest(true);
    } else {
      console.log("유효성 검사 통과 실패");
      setNicknameRegExpTest(false);
    }
  };

  return (
    <>
      <ModalClosable
        modalShow={profileEditModalShow}
        setModalShow={setProfileEditModalShow}>
        <H2 padding="0 0 3rem 0">프로필 수정</H2>
        <label htmlFor="file">
          <FileInput imgSrc={BasicProfile}>
            <PencilSquare />
          </FileInput>
        </label>
        <input type="file" name="file" id="file" style={{ display: "none" }} />
        <NickNameEditBox>
          <div className="flex">
            <input
              ref={nickNameRef}
              onChange={changeNickname}
              className="inputBox"
              defaultValue={nickname}
              placeholder="닉네임을 입력하세요."
            />
            <CommonBtn
              width={"7.5rem"}
              font={1.1}
              fontWeight={700}
              color={colors.studyBlue100}
              hoverColor={"#98A9F0"}
              margin="0 0 0 0.5rem">
              중복 확인
            </CommonBtn>
          </div>

          <div className="msg">
            {nicknameRegExpTest === undefined ? (
              ""
            ) : nicknameRegExpTest && confirmed ? (
              <div className="allowed">사용 가능한 닉네임입니다.</div>
            ) : (
              <div className="denied">
                한글, 영어, 숫자 가능 (2자-30자) / 특수문자, 공백 포함 불가능
              </div>
            )}
          </div>
        </NickNameEditBox>
        <EditBtnBox>
          <CommonBtn
            width="7.5rem"
            height={55}
            margin="0 2rem 0 0"
            color={colors.gray500}
            hoverColor={"#888"}
            font={1.2}
            fontColor={colors.white}
            onClick={() => setProfileEditModalShow(false)}>
            취소
          </CommonBtn>
          <CommonBtn
            width="7.5rem"
            height={55}
            color={colors.studyBlue300}
            hoverColor={colors.studyBlue400}
            font={1.2}
            fontColor={colors.white}>
            확인
          </CommonBtn>
        </EditBtnBox>
      </ModalClosable>
      <MyPageWrapper>
        <GameTitle>
          <H1
            color={colors.white}
            outline={colors.gameBlue500}
            outlineWeight={2}
            align="center">
            마이페이지
          </H1>
        </GameTitle>
        <MyPageContentContainer>
          <MyPageMainConatiner>
            <MyPageIntroConatiner>
              <div className="flex-column">
                <H3>Hi, {nickname}!</H3>
                <P1 padding="0.5rem 0 0 0">
                  <span className="swing-bold">SWING</span>을 즐기고 계신가요?{" "}
                  <br /> 마이페이지에서는 예전 SpeeDoodle의 기록을 보기 위한{" "}
                  <br /> 히스토리와 회원님의 정보를 수정하기 위한 프로필이
                  있습니다.
                </P1>
              </div>
              <img src={MyPageSwing} className="swingImg" alt="img" />
            </MyPageIntroConatiner>
            <MyPageHistoryConatiner>
              <HistoryHeader>
                <H5 color={colors.gameBlue500}>날짜</H5>
                <H5 color={colors.gameBlue500}>방제목</H5>
                <H5 color={colors.gameBlue500}>등수</H5>
              </HistoryHeader>
              {renderList}
              <div className="more-list-nav">
                <H6 onClick={() => navigate("/history")}>+ 더보기</H6>
              </div>
            </MyPageHistoryConatiner>
          </MyPageMainConatiner>
          <MyPageSideConatiner>
            <MyPageProfileConatiner>
              <MyPageProfile src={BasicProfile} />
              <MyPageProfileNickname>
                <div className="nickname">{nickname}</div>
                <CommonBtn
                  width={"7rem"}
                  height={32}
                  color={colors.studyBlue100}
                  hoverColor={"#98A9F0"}
                  font={1}
                  onClick={() => setProfileEditModalShow(true)}>
                  프로필 편집
                </CommonBtn>
              </MyPageProfileNickname>
            </MyPageProfileConatiner>
            <MyPageProfileCoupon>
              <CouponImg src={Coupon} alt="coupon" width={4} />
              <H5>{coupon}장</H5>
            </MyPageProfileCoupon>
            <CommonBtn
              height="42"
              border="none"
              color={colors.gray400}
              font="1.25"
              fontColor={colors.white}
              hoverColor={colors.gray500}
              padding="0.5rem 1.5rem ">
              회원탈퇴
            </CommonBtn>
          </MyPageSideConatiner>
        </MyPageContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
