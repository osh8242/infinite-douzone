// 김진 서연
// 메인 홈페이지
// 임시로 위치만 잡아두었음 -> 나중에 요소 추가 및 예쁘게 수정할 예정
// 상단의 Header는 로그인 여부에 따라 바뀌도록 수정

import React from "react";
import wehago_backImg from "../styles/img/wehago_backImg.jpg";

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
          position: "relative",
        }}
      >
        <img
          src={wehago_backImg}
          alt="Wehago Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "30px",
            }}
          >
            기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
          </h2>
          <h1
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "70px",
              marginBottom: "20px",
            }}
          >
            WEHAGO
          </h1>
          <h3
            style={{
              color: "white",
              fontSize: "17px",
            }}
          >
            업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
            전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
          </h3>
        </div>
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
      </div>
    </>
  );
}

export default MainHome;
