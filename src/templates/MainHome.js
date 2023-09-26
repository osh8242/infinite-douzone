// 김진 서연
// 메인 홈페이지
// 임시로 위치만 잡아두었음 -> 나중에 요소 추가 및 예쁘게 수정할 예정
// 상단의 Header는 로그인 여부에 따라 바뀌도록 수정

import React from "react";
// import wehago_backImg from "../styles/img/wehago_backImg.jpg";
import imageLogoWhite from "../styles/img/wehago_logo-white.png";
import "../styles/mainHome.css";

function MainHome() {
  return (
    <>
      <div className="background">
        <div id="mainPageTopHeader-BackGround">
          <div id="mainPageTopHeader">
            <a href="/" id="logo">
              <img src={imageLogoWhite} alt="Logo" style={{ width: "124px" }} />
            </a>
            <div id="mainPageTopHeaderContents">
              <a href="/" className="colorWhite">
                HOME
              </a>
              <a href="/" className="colorWhite">
                서비스소개
              </a>
              <div id="signUpSignInBtn">
                <a href="/signIn">회원가입</a>
                <a href="/signUp">로그인</a>
              </div>
            </div>
          </div>
        </div>
        {/* <img
          id="mainHome-backgroundImage"
          src={wehago_backImg}
          alt="Wehago Background"
        /> */}
        <div className="textBox">
          <p className="NIXGONFONTS p-24">
            기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
          </p>
          <p className="Jost p-48">WEHAGO</p>
          <p className="NIXGONFONTS p-16">
            업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
            전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
          </p>
        </div>
      </div>
      {/* 하단 4가지 메뉴 이동 버튼 */}
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
