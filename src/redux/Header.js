import React, { Button } from "react";
import Responsive from "./Responsive";

const Header = ({ user }) => {
  return (
    <>
      {/* index 로 이동하는 Link 컴포넌트 */}
      {/* 로그인으로 이동하는 버튼 링크 컴포넌트 */}
      <div className="right">
        <Button to="/login">로그인</Button>
      </div>
    </>
  );
};

export default Header;
