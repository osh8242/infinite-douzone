// 작성자 : 오승환
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faPlus,
  faHome,
  faChevronDown,
  faInfinity,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContextModel from "../model/ContextModel";
import "../styles/header.css";
import "../styles/fonts.css";
import SearchForm from "../components/AutoCompleteSearch";
import DropDownMenu from "./DropDown";
import { useLocation } from "react-router-dom";
import { getLogFunction } from "../model/useLog";
import RightDropdown from "./LaborContract/RightDropDown";

const Header = () => {
  const logout = getLogFunction();
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileBtn, setShowProfileBtn] = useState();
  // const userInfoString = JSON.parse(localStorage.getItem("userInfo"));
  // const userInfoObject = JSON.parse(localStorage.getItem("userInfo")) || "";
  // const userInfoObject = userInfoString || "";
  let userInfoObject;
  try {
    userInfoObject = JSON.parse(localStorage.getItem("userInfo")) || {};
  } catch (error) {
    console.error("Parsing error:", error);
    userInfoObject = {};
  }

  // 테마 컬러 설정
  const themeColor = userInfoObject?.theme || "rgb(48, 150, 255)";

  const [btnByState, setBtnByState] = useState(
    localStorage.getItem("userInfo") != null ? "로그아웃" : "로그인"
  );
  const [hrefState, setHrefState] = useState(
    userInfoObject != null ? "/" : "/login"
  );
  const [userName, setUserName] = useState(
    userInfoObject ? userInfoObject.userName : "비회원"
  );
  const companyName = userInfoObject?.companyName || "";

  const isMainPage = location.pathname === "/"; // 현재 경로가 메인 페이지인지 확인
  const searchFormRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false); // rightDropDown

  const plusIconRef = useRef(null);

  const toggleDropdown = (event) => {
    setShowDropdown(!showDropdown);
    event.stopPropagation();
  };

  function onClickLoginHandler(e) {
    if (localStorage.getItem("userInfo") != null) {
      setBtnByState("로그인");
      setHrefState("/login");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      // logout();
      setUserName("비회원");
    } else {
      setHrefState("/login");
      setBtnByState("로그아웃");
      navigate("/login");
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F10" && searchFormRef.current) {
        e.preventDefault();
        searchFormRef.current.focusInput();
      }
      if (e.key === "Escape" && searchFormRef.current) {
        searchFormRef.current.blurInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="SUITE p-10">
      {/* 사원등록/인사관리/급여자료입력/표준근로계약서 4개 메뉴에서 쓰이는 헤더 */}
      {!isMainPage && (
        <div id="topNotificationHeader">
          <div id="topLeftNotificationHeader">
            {/* logo */}
            <a href="/" className="Cabin p-20 ex-bold">
              D
              <span
                className="icon-text ex-bold"
                style={{ color: `${themeColor}` }}
              >
                O
              </span>
              UZ
              <span
                className="icon-text ex-bold"
                style={{ color: `${themeColor}` }}
              >
                O
              </span>
              NE
              <FontAwesomeIcon
                icon={faInfinity}
                className="p-24 bold icon-infinity"
                style={{ color: `${themeColor}` }}
              />
            </a>
            <div id="companySelectForm" className="p-12">
              {companyName}
            </div>
          </div>
          <div id="topRightNotificationHeader">
            <SearchForm
              ref={searchFormRef}
              type="text"
              id="findMenuBar"
              placeholder={" 메뉴 명을 입력해 주세요.  [ F10 ] "}
            />
            <div
              className="backgroundBorderNone"
              role="button"
              tabIndex={0}
              onClick={toggleDropdown}
              ref={plusIconRef}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size={"lg"}
                className="colorDark"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <RightDropdown
                  toggleDropdown={toggleDropdown}
                  showDropdown={showDropdown}
                  plusIconRef={plusIconRef}
                />
              )}
            </div>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faBell}
                size={"lg"}
                className="colorDark forbid"
              />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                size={"lg"}
                className="colorDark forbid"
              />
            </button>
            <button className="backgroundBorderNone">
              <a href="/">
                <FontAwesomeIcon
                  icon={faHome}
                  size={"lg"}
                  className="colorDark"
                />
              </a>
            </button>
            <button className="backgroundBorderNone" disabled>
              {userName} 관리자님
            </button>
            <FontAwesomeIcon
              className="clickableIcon"
              icon={faChevronDown}
              onClick={toggleProfileDropdown}
            />
            {showProfileDropdown && <DropDownMenu />}
            <div id="loginButtonGroup">
              {!userInfoObject && <a href="/signup">회원가입</a>}
              <a
                href={hrefState}
                className="stateBtn"
                onClick={onClickLoginHandler}
              >
                {btnByState}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
