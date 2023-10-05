import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/footer.css";
import "../styles/fonts.css";

export default function Footer() {
  return (
    <div id="footer-area">
      <div id="footer" className="SUITE p-12 px-5">
        <div>INFINITE DOUZONE</div>
        <div id="footer-copyright">
          Copyright <FontAwesomeIcon icon={faCopyright} /> INFINITE DOUZONE. All
          rights reserved.
        </div>
        {/* <div id="team-member" className="p-10">
          <div>오승환</div>
          <div>|</div>
          <div>이서연</div>
          <div>|</div>
          <div>현소현</div>
          <div>|</div>
          <div>김진</div>
        </div> */}
      </div>
    </div>
  );
}
