// 작성자 : 오승환
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faPlus,
  faHome,
  faChevronDown,
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

const Header = () => {
  const logout = getLogFunction();
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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

  const isMainPage = location.pathname === "/"; // 현재 경로가 메인 페이지인지 확인
  const searchFormRef = useRef(null);

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
            <input id="companySelectForm" disabled value={"더존비즈온"} />
          </div>
          <div id="topRightNotificationHeader">
            <SearchForm
              ref={searchFormRef}
              type="text"
              id="findMenuBar"
              placeholder={"메뉴명을 입력해주세요.  [ F10 ]"}
            />
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faPlus}
                size={"lg"}
                className="colorDark forbid"
              />
            </button>
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
            <button
              className="backgroundBorderNone"
              onClick={toggleProfileDropdown}
            >
              {userName} 관리자님 <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {showProfileDropdown && <DropDownMenu />}
            <div id="loginButtonGroup">
              {!userInfoObject && <a href="/signup">회원가입</a>}
              <a href={hrefState} onClick={onClickLoginHandler}>
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
