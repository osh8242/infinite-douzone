// 김진 서연
// 메인 홈페이지
// 임시로 위치만 잡아두었음 -> 나중에 요소 추가 및 예쁘게 수정할 예정
// 상단의 Header는 로그인 여부에 따라 바뀌도록 수정

import React from "react";
// import wehago_backImg from "../styles/img/wehago_backImg.jpg";
import imageLogoWhite from "../styles/img/wehago_logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faFileInvoice,
  faSackDollar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/mainHome.scss";
import "../styles/fonts.css";

function MainHome() {
  return (
    <div id="mainHomePage">
      <div id="mainPageTopHeader-BackGround">
        <div id="mainPageTopHeader">
          <a href="/">
            <img src={imageLogoWhite} alt="Logo" style={{ width: "124px" }} />
          </a>
          <div id="mainPageTopHeaderContents" className="SUITE">
            <a href="#page1" className="colorWhite">
              HOME
            </a>
            <a href="#page2" className="colorWhite">
              서비스소개
            </a>
            {/* 로그인 시 로그아웃만 보이게 */}
            <div id="signUpSignInBtn">
              <a href="/signUn">회원가입</a>
              <a href="/login">로그인</a>
              <a href="/">로그아웃</a>
            </div>
          </div>
        </div>
      </div>
      <div id="page1">
        <div className="background">
          {/* <img
          id="mainHome-backgroundImage"
          src={wehago_backImg}
          alt="Wehago Background"
        /> */}
          <div className="textBox">
            <p className="NIXGON p-24">
              기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
            </p>
            <p className="Jost p-48">WEHAGO</p>
            <p className="NIXGON p-16">
              업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
              전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
            </p>
          </div>
        </div>
        {/* 하단 4가지 메뉴 이동 버튼 */}
        <div className="menuBtnList SUITE">
          <div>
            <a href="/er" className="menuBtn er">
              <FontAwesomeIcon icon={faUserPlus} />
            </a>
            <p>사원등록</p>
          </div>
          <div>
            <a href="/hr" className="menuBtn hr">
              <FontAwesomeIcon icon={faAddressCard} />
            </a>
            <p>인사관리등록</p>
          </div>
          <div>
            <a href="/lc" className="menuBtn lc">
              <FontAwesomeIcon icon={faFileInvoice} />
            </a>
            <p>표준근로계약서</p>
          </div>
          <div>
            <a href="/si" className="menuBtn si">
              <FontAwesomeIcon icon={faSackDollar} />
            </a>
            <p>급여자료입력</p>
          </div>
        </div>
        <a href="#!" id="leftArrowBtn">
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </a>
        <a href="#!" id="leftArrowBtn-animation">
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </a>
        <a href="#!" id="rightArrowBtn">
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </a>
        <a href="#!" id="rightArrowBtn-animation">
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </a>
      </div>
      <div id="page2"></div>
    </div>
  );
}

export default MainHome;
