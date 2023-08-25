import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// import TempSwsmModel from "./model/TempSwsmModel";
import Button from "react-bootstrap";

function TestSwsnGrid() {
  // const { nowActivatedTabValueHandler, nowActivatedTabValue } = TempSwsmModel();

  // TempSwsmModel.defaultProps = {
  //   nowActivatedTabValue: "",
  //   nowActivatedTabValueHandler: "",
  // };

  return (
    <div className="switchBtn flex_center">
      {/* <Button
        className={nowActivatedTabValue === "firstBtn" ? "btnL" : "btnR"}
        value="firstBtn"
        onClick={(e) => {
          nowActivatedTabValueHandler(e.target.value);
        }} //e.target.value를 사용하면 typeError발생
      >
        계약서 조회
      </Button>

      <Button
        className={nowActivatedTabValue === "secondBtn" ? "btnL" : "btnR"}
        value="secondBtn"
        onClick={(e) => {
          nowActivatedTabValueHandler(e.target.value);
        }} //e.target.value를 사용하면 typeError발생
      >
        계약서 작성
      </Button> */}
    </div>
  );
}

export default TestSwsnGrid;
