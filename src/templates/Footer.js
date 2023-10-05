import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/fonts.css";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="SUITE p-12 px-5 footer">
      <hr />
      <div>INFINITE DOUZONE</div>
      <div className="team-member p-10">
        <p>오승환</p>
        <p>이서연</p>
        <p>현소현</p>
        <p>김진</p>
        <p>
          Copyright <FontAwesomeIcon icon={faCopyright} /> INFINITE DOUZONE. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}
