import React, { useState, useEffect } from "react";
import imgLogo from "../../src/styles/img/defaultProfile.jpg";

const DropDownMenu = (props) => {
  const [imgSrc, setImgSrc] = useState(imgLogo);

  useEffect(() => {
    let userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      let userInfoObject = JSON.parse(userInfoString);
      console.log("user value return");
      console.log(userInfoObject);

      if (userInfoObject.img) {
        setImgSrc(userInfoObject.img); // 로컬 스토리지에서 가져온 경로 사용
      }
    } else {
      console.log("userInfo 없음");
    }
  }, []);

  return (
    <div className="profileDropdown">
      <img src={process.env.PUBLIC_URL + imgSrc} alt="Profile" />
      {/* process.env.PUBLIC_URL은 public 폴더의 경로를 가리킵니다. */}
      <p>김회계 주임연구원</p>
      <a href="/mypage">프로필 보기</a>
    </div>
  );
};

export default DropDownMenu;
