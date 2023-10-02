// 김진 서연
// 메인 홈페이지
// 임시로 위치만 잡아두었음 -> 나중에 요소 추가 및 예쁘게 수정할 예정
// 상단의 Header는 로그인 여부에 따라 바뀌도록 수정
import React from "react";
// import wehago_backImg from "../styles/img/wehago_backImg.jpg";
import imageLogoWhite from "../styles/img/wehago_logo-white.png";
import "../styles/mainHome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAddressCard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircleArrowLeft,
  faFileInvoice,
  faSackDollar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function MainHome() {
  const navigate = useNavigate();
  // const userInfoString = localStorage.getItem("userInfo");
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
  let userToken = localStorage.getItem("token");
  let userTokenObject = JSON.parse(userToken);
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
  console.log("------HEADER--------------");
  console.log(userInfoObject);
  console.log("TOKEN: " + userTokenObject);
  console.log("------HEADER--------------");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  return (
    <>
      <div id="mainPageTopHeader-BackGround">
        <div id="mainPageTopHeader">
          <a href="/">
            <img src={imageLogoWhite} alt="Logo" style={{ width: "124px" }} />
          </a>
          <div id="mainPageTopHeaderContents">
            <a href="#page1" className="colorWhite">
              HOME
            </a>
            <div id="mainPageTopHeaderContents">
              <a href="/" className="colorWhite">
                HOME
              </a>
              <a href="/" className="colorWhite">
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
      </div>
      <div id="page1">
        <div className="background">
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
        <div className="menuBtnList">
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
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </a>
        <a href="#!" id="leftArrowBtn-animation">
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </a>
      </div>
      <div id="page2"></div>
    </>
  );
}
export default MainHome;
