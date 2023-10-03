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
import SearchForm from "../components/AutoCompleteSearch";
import DropDownMenu from "./DropDown";
import { useLocation } from "react-router-dom";
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

  const searchFormRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("Keydown event triggered");
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
        <div id="topNotificationHeader">
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
            {/* <SearchForm
              type="text"
              id="findMenuBar"
              placeholder={"메뉴명을 입력해주세요.  [ F10 ]    "}
            /> */}
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
                className="colorDark"
              />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faBell}
                size={"lg"}
                className="colorDark"
              />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                size={"lg"}
                className="colorDark"
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
            {/* 로그인 시 아래의 두 버튼은 가리기!! */}
            <div id="loginButtonGroup">
              {!userInfoObject && (
                <a
                  href="/signup"
                  // style={{
                  //   backgroundColor: "white",
                  //   border: "1px solid gray",
                  //   color: "dimgray",
                  //   padding: "4px 10px 4px 10px",
                  //   marginRight: "0px",
                  //   marginLeft: "7px",
                  //   borderRadius: "5px",
                  //   textDecoration: "none",
                  // }}
                >
                  회원가입
                </a>
              )}
              <a
                href={hrefState}
                // style={{
                //   backgroundColor: "white",
                //   border: "1px solid gray",
                //   color: "dimgray",
                //   fontSize: "13px",
                //   padding: "4px 14px 4px 14px",
                //   marginRight: "7px",
                //   borderRadius: "5px",
                //   textDecoration: "none",
                // }}
                onClick={onClickLoginHandler}
              >
                {btnByState}
              </a>
            </div>
          </div>
        </div>
      )}
      {/* <div id="secondTopHeader">
      {/* <div id="secondTopHeader">
      <div id="secondTopHeaderContents">
      <Button
            id="toggleSidebarBtn"
            onClick={toggleSidebar}
            variant="outline-secondary"
          >
            <i className={`fa fa-bars colorWhite`} />
          </Button>
          //로고
          <img id="logo" src={empAdd} alt="" />
          <button className="backgroundBorderNone">
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="colorWhite backgroundBorderNone"
            />
          </button>
        </div>
        <div id="secondTopHeaderMenuList">
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faPrint} className="colorWhite" />
          </button>
          <button
            className="backgroundBorderNone"
            onClick={(e) => contextActions.deleteSelectedRows()}
          >
            <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faCalculator} className="colorWhite" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faBorderAll} className="colorWhite" />
          </button>
        </div>
      </div>       */}
    </div>
  );
};
export default Header;
