import React, { useState, useEffect } from "react";
import imgLogo from "../../src/styles/img/defaultProfile.jpg";
import "../styles/DropDown.css";
import { useCurrTime } from "../Login/TimeProvider";
import { useLogin } from "../Login/LoginProvider";

const DropDownMenu = (props) => {
  const [imgSrc, setImgSrc] = useState(imgLogo);
  let userInfoString = localStorage.getItem("userInfo");
  let userInfoObject = JSON.parse(userInfoString);
  const [userName, setUserName] = useState(userInfoObject.userName);
  // const [loginTime, setLoginTime] = useState(localStorage.getItem("loginTime"));
  const { formattedTime } = useCurrTime();
  const { loginInfo } = useLogin();

  useEffect(() => {
    let userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      let userInfoObject = JSON.parse(userInfoString);
      console.log("user value return");
      console.log(userInfoObject);

      if (userInfoObject.img) {
        setImgSrc(userInfoObject.img);
      }
    } else {
      console.log("userInfo 없음");
    }
  }, []);

  return (
    <div className="profileDropdown">
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
