import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/defaultProfile.jpg";
import "../styles/DropDown.css";
import { useCurrTime } from "../Login/TimeProvider";
import { useLogin } from "../Login/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getLogFunction } from "../model/useLog";

const DropDownMenu = (props) => {
  const logout = getLogFunction();
  const [imgSrc, setImgSrc] = useState(imgLogo);
  let userInfoString = localStorage.getItem("userInfo");
  let userInfoObject = JSON.parse(userInfoString);
  const [userName, setUserName] = useState(userInfoObject.userName);
  // const [loginTime, setLoginTime] = useState(localStorage.getItem("loginTime"));
  const { formattedTime } = useCurrTime();
  // const { loginInfo } = useLogin();
  const [profileDropdown, setProfileDropdown] = useState("profileDropdown");

  // useEffect(() => {
  //   setProfileDropdown("profileDropdown");
  // }, [profileDropdown]);

  useEffect(() => {
    let userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      let userInfoObject = JSON.parse(userInfoString);
      console.log("user value return");
      console.log(userInfoObject);

      //theme
      if (userInfoObject.theme === "rgb(255, 134, 48)") {
        setProfileDropdown("profileDropdown orange");
      } else if (userInfoObject.theme === "rgb(18, 204, 108)  ") {
        setProfileDropdown("profileDropdown green");
      } else if (userInfoObject.theme === "rgb(254, 213, 51)") {
        setProfileDropdown("profileDropdown yellow");
      } else if (userInfoObject.theme === "rgb(255, 82, 82)") {
        setProfileDropdown("profileDropdown pink");
      } else if (userInfoObject.theme === "rgb(126, 58, 243)") {
        setProfileDropdown("profileDropdown pupple");
      } else {
        setProfileDropdown("profileDropdown blue");
      }
      console.log(userInfoObject.theme);
      // img
      if (userInfoObject.img) {
        setImgSrc(userInfoObject.img);
      }
    } else {
      console.log("userInfo 없음");
    }
  }, []);

  const handleIconClick = () => {
    logout();
  };

  return (
    <div className={profileDropdown}>
      {/* <FontAwesomeIcon icon={faBell} size="2xl" className="faBell" /> */}
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        size="2xl"
        className="faArrow"
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
      />
      <img src={process.env.PUBLIC_URL + imgSrc} alt="Profile" />
      <div className="textContainer">
        <p className="name">{userName} 선임연구원</p>
        <p className="recentLogin">
          (주){userInfoObject.companyName}&gt; 솔루션사업부문
        </p>
        <p className="anotherLogin">최근 접속 : {formattedTime}</p>
      </div>
      {/* <a href="/mypage">프로필 보기</a> */}
    </div>
  );
};

export default DropDownMenu;
