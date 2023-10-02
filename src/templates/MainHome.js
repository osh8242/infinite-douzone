// 김진 서연
// 메인 홈페이지
import React, { useEffect } from "react";
import wehago_backImg from "../styles/img/wehago_backImg.jpg";
import erIntro from "../styles/img/erIntro.png";
import hrIntro from "../styles/img/hrIntro.png";
import lrIntro from "../styles/img/lrIntro.png";
import siIntro from "../styles/img/siIntro.png";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileInvoice,
  faSackDollar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imageLogoWhite from "../styles/img/wehago_logo-white.png";
import "../styles/mainHome.scss";
import "../styles/fonts.css";
import { useLogin } from "../Login/LoginProvider";

const slides = [
  {
    background: wehago_backImg, //main
    content: (
      <div>
        <p className="NIXGONFONTS p-24">
          기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
        </p>
        <p className="Jost p-48">WEHAGO</p>
        <p className="NIXGONFONTS p-16">
          업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
          전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
        </p>
      </div>
    ),
  },
  {
    background: erIntro, //사원등록
    content: (
      <div>
        <p className="NIXGONFONTS p-24" style={{ color: "black" }}>
          사원등록 페이지에 대한 정보 넣으면 됨
        </p>
      </div>
    ),
  },
  {
    background: hrIntro, //인사관리등록
    content: (
      <div>
        <p className="NIXGONFONTS p-24" style={{ color: "black" }}>
          인사관리등록 정보 넣으면 됨
        </p>
      </div>
    ),
  },
  {
    background: lrIntro, //표준근로계약서
    content: (
      <div>
        <p className="NIXGONFONTS p-24" style={{ color: "black" }}>
          표준근로계약서 정보 넣으면 됩니다
        </p>
      </div>
    ),
  },
  {
    background: siIntro, //급여자료입력
    content: (
      <div>
        <p className="NIXGONFONTS p-24" style={{ color: "black" }}>
          급여자료 입력에 대한 정보
        </p>
      </div>
    ),
  },
];

function MainHome() {
  const { loginInfo = "", updateToken, updateLoginInfo } = useLogin();

  console.log(updateToken);
  console.log(updateLoginInfo);
  const navigate = useNavigate();
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
  const [btnByState, setBtnByState] = useState(
    localStorage.getItem("userInfo") != null ? "로그아웃" : "로그인"
  );
  const [hrefState, setHrefState] = useState(
    userInfoObject != null ? "/" : "/login"
  );
  const [userName, setUserName] = useState(
    userInfoObject ? userInfoObject.userName : "비회원"
  );
  const location = useLocation();
  const isMainPage = location.pathname === "/"; // 현재 경로가 메인 페이지인지 확인

  // let userToken = localStorage.getItem("token");
  // let userTokenObject = JSON.parse(userToken);

  function onClickLoginHandler(e) {
    console.log("click hanglder!");
    if (localStorage.getItem("userInfo") != null) {
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

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // const toggleProfileDropdown = () => {
  //   setShowProfileDropdown(!showProfileDropdown);
  // };

  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 효과
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // 10초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="mainPageTopHeader-BackGround" className="SUITE p-12">
        <div id="mainPageTopHeader">
          <a href="/">
            <img src={imageLogoWhite} alt="Logo" style={{ width: "124px" }} />
          </a>
          <div id="mainPageTopHeaderContents">
            <a href="#page1" className="colorWhite">
              HOME
            </a>
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
          </div>
          {/* <div>사원등록을 손쉽게</div>
          <div>인사관리를 한눈에</div>
          <div>표준근로계약서 작성도 꼼꼼하게</div>
          <div>급여자료 입력도 간편하게</div> */}
        </div>
        {/* 하단 4가지 메뉴 이동 버튼 */}
        <div className="menuBtnList SUITE p-12">
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
        <a href="#!" id="leftArrowBtn">
          <FontAwesomeIcon icon={faCircleArrowLeft} onClick={prevSlide} />
        </a>
        <a href="#!" id="leftArrowBtn-animation">
          <FontAwesomeIcon icon={faCircleArrowLeft} onClick={prevSlide} />
        </a>
        <a href="#!" id="rightArrowBtn">
          <FontAwesomeIcon icon={faCircleArrowRight} onClick={nextSlide} />
        </a>
        <a href="#!" id="rightArrowBtn-animation">
          <FontAwesomeIcon icon={faCircleArrowRight} onClick={nextSlide} />
        </a>
      </div>
      <div id="page2"></div>
    </>
  );
}
export default MainHome;
