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

// 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
const logoUrl = {
  emp: "../styles/img/empRegisterLogo.png",
  empAdd: "../styles/img/empAddLogo.png",
};

const Header = (props) => {
  const navigate = useNavigate();
  console.log("+++++++++++++++++++++++++++");
  const userInfoString = localStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(userInfoString);
  console.log("===================================");
  console.log("local storoeroeor valeueueueueu");
  console.log(userInfoString);
  console.log("===================================");

  const [btnByState, setBtnByState] = useState(
    localStorage.getItem("userInfo") != null ? "로그아웃" : "로그인"
  );

  // useEffect(() => {
  //   if (localStorage.getItem("userInfo") != null) setBtnByState("로그아웃");
  //   else setBtnByState("로그인");
  // }, [btnByState]);

  const [hrefState, setHrefState] = useState(
    userInfoString != null ? "/" : "/login"
  );
  const [showUserState, setShowUserState] = useState(
    userInfoString ? true : false
  );
  const [userName, setUserName] = useState(
    userInfoObject ? userInfoObject.userName : "비회원"
  );

  console.log("TRUE / FALSE State ...cccccc");
  console.log(userInfoObject);
  console.log(userInfoString);
  console.log("btnByState: ");
  console.log(btnByState);
  console.log("showUserState: ");
  console.log(showUserState);

  // function onClickLoginHandler(e) {
  //   console.log("click handler ....");
  //   // if (localStorage.getItem("userInfo")) {
  //   //   console.log("로컬값잇슴 유저인포");
  //   // }
  //   if (localStorage.getItem("userInfo") != null) {
  //     console.log("chnagedddddgo!");
  //     setBtnByState("로그인");
  //     setHrefState("/");
  //     localStorage.removeItem("userInfo");
  //     localStorage.removeItem("authToken");
  //     localStorage.clear();
  //   } else {
  //     setBtnByState("로그아웃");
  //     setShowUserState(false);
  //   }
  //   // setHrefState("/login");
  //   // e.preventDefault(); // 기본 동작(링크 이동) 중지

  //   // if (showUserState) {
  //   // 로그아웃 처리

  //   // } else {
  //   // 로그인 페이지로 리디렉션 (실제로는 로그인 로직 수행 가능)
  //   // window.location.href = "/";
  //   // }
  // }

  const [showSidebar, setShowSidebar] = useState(false);

  /// localStorage 의 userName이 null 이 아니라면
  /// userName 초기화 및 btnByState 업데이트
  ///// TODO:

  let userToken = localStorage.getItem("token");
  let userTokenObject = JSON.parse(userToken);

  // console.log("userInfo:");

  // useEffect(() => {
  //   setBtnByState("로그인");
  //   setHrefState("");
  // }, [userInfoObject]);

  // const toggleUserState = () => {
  //   setShowUserState(!showUserState);
  // };

  useEffect(() => {
    console.log("showUserState .........chaenge????");
  }, showUserState);

  const toggleBtn = () => {
    // if( )
  };

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
      console.log("nope");
      setHrefState("/login");
      setBtnByState("로그아웃");
      navigate("/login");
    }
  }

  console.log("------HEADER--------------");
  console.log(userInfoObject);
  console.log("TOKEN: " + userTokenObject);
  console.log("------HEADER--------------");

  // Header.defaultProps = {
  //   userName: userInfoObject.userName,
  // };

  // function localStorageListener(event) {
  //   console.log("event.... localStorage : ");
  //   console.log(event);
  // }
  // window.addEventListener("storage", localStorageListener);

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div>
      <div id="topNotificationHeader">
        <div id="topLeftNotificationHeader">
          <select id="companySelectForm" defaultValue={"douzone"}>
            <option id="douzone">더존비즈온</option>
          </select>
          <select id="periodSelectForm" defaultValue={"5"}>
            <option id="5">5기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="4">4기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="3">3기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="2">2기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="1">1기 2023.03.13~2023.10.17 (2023년도)</option>
          </select>
        </div>
        <div id="topRightNotificationHeader">
          <SearchForm
            type="text"
            id="findMenuBar"
            placeholder={"찾고싶은 메뉴를 검색하세요"}
          />
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faPlus} size={"2xl"} className="colorDark" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faBell} size={"xl"} className="colorDark" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size={"xl"}
              className="colorDark"
            />
          </button>
          <button className="backgroundBorderNone">
            <a href="/">
              <FontAwesomeIcon
                icon={faHome}
                size={"xl"}
                className="colorDark"
              />
            </a>
          </button>
          <button
            className="backgroundBorderNone"
            onClick={toggleProfileDropdown}
          >
            {userName} 주임연구원 <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {showProfileDropdown && <DropDownMenu />}
          {!userInfoObject && (
            <a
              href="/signup"
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                color: "dimgray",
                padding: "4px 10px 4px 10px",
                marginRight: "0px",
                marginLeft: "7px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              회원가입
            </a>
          )}

          <a
            href={hrefState}
            style={{
              backgroundColor: "white",
              border: "1px solid gray",
              color: "dimgray",
              fontSize: "13px",
              padding: "4px 14px 4px 14px",
              marginRight: "7px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
            onClick={onClickLoginHandler}
          >
            {btnByState}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
