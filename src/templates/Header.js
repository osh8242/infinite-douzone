// 작성자 : 오승환
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faPlus,
  faHome,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextModel from "../model/ContextModel";
import "../styles/header.css";
import SearchForm from "../components/AutoCompleteSearch";
import DropDownMenu from "./DropDown";
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import "../styles/fonts.css";

const Header = () => {
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

  function onClickLoginHandler(e) {
    if (localStorage.getItem("userInfo") != null) {
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
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div>
      {/* 메인 페이지 용 헤더 */}
      {/* {isMainPage && (
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
      )} */}

      {/* 사원등록/인사관리/급여자료입력/표준근로계약서 4개 메뉴에서 쓰이는 헤더 */}
      {!isMainPage && (
        <div id="topNotificationHeader" className="SUITE">
          <div id="topLeftNotificationHeader">
            <select id="companySelectForm" defaultValue={"douzone"}>
              <option id="douzone">더존비즈온</option>
            </select>
            <select id="periodSelectForm" defaultValue={"5"}>
              <option id="5">5기 2023.03.13~2023.10.17 (2023년도)</option>
              {/* <option id="4">4기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="3">3기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="2">2기 2023.03.13~2023.10.17 (2023년도)</option>
          <option id="1">1기 2023.03.13~2023.10.17 (2023년도)</option> */}
            </select>
          </div>
          <div id="topRightNotificationHeader">
            <SearchForm
              type="text"
              id="findMenuBar"
              placeholder={"찾고싶은 메뉴를 검색하세요"}
            />
            <div id="topHeaderButtonGroup" className="p-16">
              <button disabled className="backgroundBorderNone">
                <FontAwesomeIcon icon={faPlus} className="colorDark forbid" />
              </button>
              <button disabled className="backgroundBorderNone">
                <FontAwesomeIcon icon={faBell} className="colorDark forbid" />
              </button>
              <button disabled className="backgroundBorderNone">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="colorDark forbid"
                />
              </button>
              <button className="backgroundBorderNone">
                <a href="/">
                  <FontAwesomeIcon icon={faHome} className="colorDark" />
                </a>
              </button>
            </div>
            <button
              id="userInformation"
              className="backgroundBorderNone"
              onClick={toggleProfileDropdown}
            >
              {userName} 관리자님 <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {showProfileDropdown && <DropDownMenu />}
            {/* 로그인 시 아래의 두 버튼은 가리기!! */}
            <div id="loginButtonGroup" className="p-10">
              {!userInfoObject && (
                <a href="/signup" className="signUpSignInBtn-dark">
                  회원가입
                </a>
              )}
              <a href="/login" className="signUpSignInBtn-dark">
                로그인
              </a>
              <a href="/" className="signUpSignInBtn-dark">
                로그아웃
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
