// 김진
// 메인 홈페이지
// 임시로 위치만 잡아두었음 -> 나중에 요소 추가 및 예쁘게 수정할 예정
// 상단의 Header는 로그인 여부에 따라 바뀌도록 수정

import React from "react";

function MainHome() {
  return (
    <>
      <div
        style={{
          height: "64vh",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(57, 63, 80)",
        }}
      >
        <h3 style={{ color: "white" }}>SMART A 10</h3>
        <h2 style={{ color: "white" }}>
          기업의 회계 및 인사 업무를 관리할 수 있는 스마트한 SMART A 10
        </h2>
      </div>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <a
          href="/er"
          style={{
            width: "16vw",
            minWidth: "100px",
            height: "10vh",
            display: "flex",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 1px lightgray",
            borderRadius: "2px",
            background: "rgba(240,240,240,0.5)",
            color: "gray",
            fontSize: "1.2em",
          }}
        >
          사원등록
        </a>
        <a
          href="/hr"
          style={{
            width: "16vw",
            minWidth: "100px",
            height: "10vh",
            display: "flex",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 1px lightgray",
            borderRadius: "2px",
            background: "rgba(240,240,240,0.5)",
            color: "gray",
            fontSize: "1.2em",
          }}
        >
          인사관리등록
        </a>
        <a
          href="/si"
          style={{
            width: "16vw",
            minWidth: "100px",
            height: "10vh",
            display: "flex",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 1px lightgray",
            borderRadius: "2px",
            background: "rgba(240,240,240,0.5)",
            color: "gray",
            fontSize: "1.2em",
          }}
        >
          급여관리
        </a>
        <a
          href="/lc"
          style={{
            width: "16vw",
            minWidth: "100px",
            height: "10vh",
            display: "flex",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 1px lightgray",
            borderRadius: "2px",
            background: "rgba(240,240,240,0.5)",
            color: "gray",
            fontSize: "1.2em",
          }}
        >
          표준근로계약서
        </a>
      </div>
    </>
  );
}

export default MainHome;
