import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/footer.css";
import "../styles/fonts.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname; // 현재 페이지 경로
  const excludedPages = [
    "/",
    "/login",
    "/loginFindId",
    "/loginFindPwd",
    "/signup",
    "/error",
    "/successSignup",
  ];
  const isExcludedPage = excludedPages.includes(currentPath);

  return (
    <>
      {!isExcludedPage && (
        <div id="footer-area">
          <div id="footer" className="SUITE p-12 px-5">
            <div>INFINITE DOUZONE</div>
            <div id="footer-copyright">
              Copyright <FontAwesomeIcon icon={faCopyright} /> INFINITE DOUZONE.
              All rights reserved.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
