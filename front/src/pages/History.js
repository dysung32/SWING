import React, { useState } from "react";
import { MyPageWrapper, HistoryHeader } from "../styles/MyPageEmotion";
import {
  HistoryContent,
  HistoryContentContainer,
  SingleHistoryList,
} from "../styles/HistoryEmotion";
import { GameTitle } from "../styles/CommonEmotion";
import { H1 } from "../styles/Fonts";
import { colors } from "../styles/ColorPalette";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

function History() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [historyList, setHistoryList] = useState([]);

  const renderHistoryList = historyList.map((history, idx) => {
    return (
      // api 연결 후엔 key값 history id로 설정하기
      <SingleHistoryList
        key={idx}
        onClick={() =>
          navigate(`/history/${idx}`, {
            state: { date: history.date, rank: history.rank },
          })
        }>
        <div className="history-date">{history.date}</div>
        <div className="history-title">{history.title}</div>
        <div className="history-rank">{history.rank}등</div>
      </SingleHistoryList>
    );
  });

  const getHistoryList = async () => {
    await axios
      .get(`${API_URL}/doodle/history/${user.userId}`, {
        headers: {
          "Access-Token":
            "Ry7rohoVUjw3GA5W1GC3DaJ5Rzfec8-S2SHOE8xcnlh-VbeDGJr-Hu4t2mN2LuE-3nzucAo9cuoAAAGHLCzlKw&state=8_bprj_QaKc6mIzvlC972kiYByGkGAQT8ym9hvYNl9A%3D",
        },
      })
      .then((res) => {
        console.log(res);
        setHistoryList(res.data.gameHistoryList);
      });
  };

  useState(() => {
    getHistoryList();
  }, []);

  return (
    <>
      <MyPageWrapper>
        <GameTitle>
          <H1
            color={colors.white}
            outline={colors.gameBlue500}
            outlineWeight={2}
            align="center">
            게임 히스토리
          </H1>
        </GameTitle>
        <div className="desc">최근 10건</div>
        <HistoryContentContainer>
          <HistoryHeader border>
            <div className="date">날짜</div>
            <div className="roomname">방제목</div>
            <div className="rank">등수</div>
          </HistoryHeader>
          <HistoryContent>
            {historyList.length > 0 ? (
              renderHistoryList
            ) : (
              <div className="no-history">히스토리 목록이 없습니다.</div>
            )}
          </HistoryContent>
        </HistoryContentContainer>
      </MyPageWrapper>
    </>
  );
}

export default History;
