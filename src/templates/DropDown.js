import React from "react";
// import imgLogo from "../../src/styles/img/smile.png";
import imgLogo from "../../src/styles/img/defaultProfile.jpg";

const DropDownMenu = (props) => {
  return (
    <div className="profileDropdown">
      <img src={imgLogo} alt="Profile" />
      <p>김회계 주임연구원</p>
      <a href="/mypage">프로필 보기</a>
    </div>
  );
};

export default DropDownMenu;
