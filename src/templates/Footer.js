import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/fonts.css";

export default function Footer() {
  return (
    <div className="Jost p-10 px-5">
      <hr />
      <br />
      <p>INFINITE DOUZONE</p>
      <div className="d-flex gap-2">
        <p>Seunghwan Oh</p>
        <p>Seoyeon Lee</p>
        <p>Sohyun Hyun</p>
        <p>Jin Kim</p>
      </div>
      <p>
        Copyright <FontAwesomeIcon icon={faCopyright} /> INFINITE DOUZONE. All
        rights reserved.
      </p>
    </div>
  );
}
