// 김진 서연
// 메인 홈페이지
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faFileInvoice,
  faInfinity,
  faSackDollar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../Login/LoginProvider";
import { getLogFunction } from "../model/useLog";
import "../styles/fonts.css";
import wehago_backImg from "../styles/img/skyscraper-2561415_1280.jpg";
import wehago_backImg2 from "../styles/img/presentation1.jpg";
import imageLogoWhite from "../styles/img/wehago_logo-white.png";
import "../styles/mainHome.scss";

const slides = [
  {
    background: wehago_backImg, //main
    content: (
      <div>
        <div>
          <p className="NIXGON p-24">
            기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
          </p>
          <p className="KangWonBold bold p-52">INFINITE DOUZONE</p>
          <p className="NIXGON p-16">
            업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
            전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
          </p>
          {/* 하단 4가지 메뉴 이동 버튼 */}
        </div>
        {/* <div
          className="menuBtnList NIXGON p-14 semi-bold"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            // position: "absolute",
            // bottom: "120px",
            flexDirection: "row",
            gap: "36px",
            textAlign: "center",
            color: "white",
          }}
        >
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
            <p>급여관리</p>
          </div>
        </div> */}
      </div>
    ),
  },
  // {
  //   background: wehago_backImg2, //main2
  //   content: (
  //     <div style={{ width: "100vw" }}>
  //       <div
  //         style={{
  //           backgroundColor: "rgb(57, 63, 80)",
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItem: "center",
  //           justifyContent: "center",
  //           width: "45%",
  //           height: "100vh",
  //           marginLeft: "55%",
  //           marginTop: "16%",
  //           // borderRadius: "16px",
  //         }}
  //       >
  //         <p className="KangWonBold bold p-48">SMART I-10</p>
  //         <p className="NIXGON bold p-16">
  //           사원등록, 인사관리, 근로계약서, 급여자료 입력기능
  //         </p>
  //         <p className="NIXGON bold p-16">
  //           사원 데이터 입력, 조회, 수정, 삭제 기능과 <br />
  //           계약서 작성 및 급여관리 기능
  //         </p>
  //       </div>
  //     </div>
  //   ),
  // },
];

function MainHome() {
  const logout = getLogFunction();
  const { loginInfo = "", updateToken, updateLoginInfo } = useLogin();

  const navigate = useNavigate();
  // const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));

  let userInfoObject;

  try {
    userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
  } catch (error) {
    console.error("Parsing error:", error);
    userInfoObject = {};
  }

  const [btnByState, setBtnByState] = useState(
    userInfoObject != null ? "로그아웃" : "로그인"
  );
  const [hrefState, setHrefState] = useState(
    userInfoObject != null ? "/" : "/login"
  );
  const [userName, setUserName] = useState(
    userInfoObject ? userInfoObject.userName : "비회원"
  );
  const location = useLocation();
  const isMainPage = location.pathname === "/"; // 현재 경로가 메인 페이지인지 확인

  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 효과
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  //   }, 7000); // 10초마다 슬라이드 변경

  //   return () => clearInterval(interval);
  // }, []);

  function onClickLoginHandler(e) {
    console.log("click hanglder!");
    // if (localStorage.getItem("userInfo") != null) {
    if (btnByState === "로그아웃") {
      console.log("local 값 잇서?");
      setBtnByState("로그인");
      setHrefState("/login");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
      setUserName("비회원");
    } else {
      setHrefState("/login");
      setBtnByState("로그아웃");
      navigate("/login");
    }
  }

  return (
    <>
      <div id="mainPageTopHeader-BackGround" className="SUITE p-12">
        <div id="mainPageTopHeader">
          {/* logo */}
          <a href="/" className="Cabin p-20 bold">
            D<span className="icon-text ex-bold">O</span>
            UZ
            <span className="icon-text ex-bold">O</span>
            NE
            <FontAwesomeIcon
              icon={faInfinity}
              className="p-24 bold icon-infinity"
            />
          </a>
          <div id="mainPageTopHeaderContents">
            <a href="#page1" className="colorWhite">
              HOME
            </a>{" "}
            <a href="#page2" className="colorWhite">
              서비스소개
            </a>
            {/* 로그인 여부에 따라 버튼 토글 */}
            <div id="signUpSignInBtn">
              {!userInfoObject && <a href="/signup">회원가입</a>}
              <a href={hrefState} onClick={onClickLoginHandler}>
                {btnByState}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="page1">
        {/* 슬라이드 효과 div 나열 */}
        <div>
          <div
            className="background"
            style={{
              backgroundImage: `url(${slides[currentSlide].background})`,
            }}
          >
            <div className="textBox">{slides[currentSlide].content}</div>

            {/* 하단 4가지 메뉴 이동 버튼 */}
            <div className="menuBtnList NIXGON p-14 semi-bold">
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
                <p>급여관리</p>
              </div>
            </div>
          </div>
        </div>

        {/* 좌우 슬라이드용 버튼 */}
        {/* <a href="#!" id="leftArrowBtn">
          <FontAwesomeIcon icon={faChevronLeft} onClick={prevSlide} />
        </a>
        <a href="#!" id="leftArrowBtn-animation">
          <FontAwesomeIcon icon={faChevronLeft} onClick={prevSlide} />
        </a>
        <a href="#!" id="rightArrowBtn">
          <FontAwesomeIcon icon={faChevronRight} onClick={nextSlide} />
        </a>
        <a href="#!" id="rightArrowBtn-animation">
          <FontAwesomeIcon icon={faChevronRight} onClick={nextSlide} />
        </a> */}
      </div>
      {/* <div id="page2">
        <div id="page2-content">
          <div id="page2-title" className="Jost p-32">
            INFINITE SERVICE
          </div>
          <div id="page2-item1">
            <div className="page2-item1-service">사원등록</div>
            <div className="page2-item1-service">인사관리</div>
            <div className="page2-item1-service">계약서작성</div>
            <div className="page2-item1-service">급여관리</div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default MainHome;
