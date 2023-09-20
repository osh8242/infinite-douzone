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
import ContextModel from "../model/ContextModel";
import "../styles/header.css";
import SearchForm from "../components/SearchForm";
import DropDownMenu from "./DropDown";

// 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
const logoUrl = {
  emp: "../styles/img/empRegisterLogo.png",
  empAdd: "../styles/img/empAddLogo.png",
};

const Header = (props) => {
  // 초기 상태 설정
  console.log("+++++++++++++++++++++++++++");
  const userInfoString = localStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(userInfoString);
  console.log("===================================");
  console.log("local storoeroeor valeueueueueu");
  console.log(userInfoString);
  console.log("===================================");

  // 로그인 상태에 따라 버튼 텍스트 및 링크 상태 초기화
  const [btnByState, setBtnByState] = useState(
    userInfoString ? "로그아웃" : "로그인"
  );
  const [hrefState, setHrefState] = useState(userInfoObject ? "" : "/");
  const [showUserState, setShowUserState] = useState(
    userInfoString ? true : false
  );

  console.log("TRUE / FALSE State ...");
  console.log(userInfoObject);
  console.log(userInfoString);
  console.log("btnByState: ");
  console.log(btnByState);
  console.log("showUserState: ");
  console.log(showUserState);
  console.log();
  console.log();

  function onClickLoginHandler(e) {
    console.log("click handler ....");
    // setHrefState("/login");
    // e.preventDefault(); // 기본 동작(링크 이동) 중지

    // if (showUserState) {
    // 로그아웃 처리
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setBtnByState("로그인");
    setShowUserState(false);
    // } else {
    // 로그인 페이지로 리디렉션 (실제로는 로그인 로직 수행 가능)
    // window.location.href = "/";
    // }
  }

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
    // if (showUserState) {
    //   console.log("Login 상태 ...");
    //   setBtnByState("로그아웃");
    // } else {
    //   console.log("Logout 상태");
    //   setBtnByState("로그인");
    // }
  }, showUserState);

  function onClickLoginHandler(e) {
    console.log("click hanglder!");
    // setShowUserState(!showUserState);
    // if (userInfoObject) {
    //   // 로그아웃 처리
    //   localStorage.removeItem("userInfo");
    //   localStorage.removeItem("token");
    //   setUserName(null); // 상태 업데이트
    // } else {
    //   // 로그인 페이지로 리디렉션
    //   // (여기서는 간단하게 처리, 실제로는 로그인 로직을 수행)
    //   window.location.href = "/";
    // }
  }

  const [userName, setUserName] = useState(userInfoObject.userName);

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
            href="/"
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
