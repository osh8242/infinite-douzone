import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import TextBoxComponent from "../../src/components/TextBoxComponent";
import CommonConstant from "../../src/model/CommonConstant";
import RadioForm from "../../src/components/RadioForm";
import TempAdd from "../../src/components/TestAdd";
import axios from "axios";
import { SignUpField } from "./SignUpField";
import AddressForm from "../components/AddressForm";
import DateForm from "../components/DateForm";
import "./signUpLayout.css";
import { Radio } from "@mui/material";
import { RADIO_LIST } from "../model/CommonConstant";
// import userModel from "../model/userModel";

function SignUpLayout() {
  // const { state, actions, mainTablePkValue } = userModel();
  // const { mainTabRef, leftTableData, mainTabData, subTableData, selectedRows } =
  //   state;
  return (
    <Container
      id="SignUp"
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <Row className="justify-content-center mb-4">
        <Row className="justify-content-center mb-4">
          <img
            src={imgLogo}
            alt="Logo"
            style={{ width: "500px", padding: "70px 0px 15px 0px" }}
          />
          <h2 className="subLabel">로그인</h2>
        </Row>

        <Col md="15">
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              아이디
            </Col>
            <Col md="5">
              <TextBoxComponent
                name="userId"
                type={"textbox"}
                placeholder=""
                height={40}
                // onChange={submitData}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              비밀번호
            </Col>
            <Col md="5">
              <TextBoxComponent
                name="userId"
                type={"password"}
                placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
                height={40}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              이메일
            </Col>
            <Col md="5">
              <TextBoxComponent
                name="userId"
                type={"email"}
                placeholder="ID"
                height={40}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              이름
            </Col>
            <Col md="5">
              <TextBoxComponent
                name="userId"
                type={"textbox"}
                placeholder="이름"
                height={40}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              생년월일
            </Col>
            <Col md="5">
              <TextBoxComponent type={"date"} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              성별
            </Col>
            <Col md="5">
              <RadioForm optionList={RADIO_LIST.fgSex} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="d-flex justify-content-center align-items-right"
              md="2"
            >
              연락처
            </Col>
            <Col md="5">
              <TextBoxComponent name="userId" type={"textbox"} height={40} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <Col md="7" className="px-5">
        <Row className="justify-content-center mb-4">
          <img
            src={imgLogo}
            alt="Logo"
            style={{ width: "500px", padding: "70px 0px 15px 0px" }}
          />
          <h2
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            로그인
          </h2>
        </Row>
        <Row className="justify-content-center mb-4">
           <Col md="8">아이디</Col>  
          <Col md="9">
            <TextBoxComponent
              name="userId"
              type={field}
              placeholder="ID"
              height={45}
              label={"test"}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="8">비밀번호 </Col>
          <Col md="9">
            <TextBoxComponent
              name="userPwd"
              type="password"
              placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
              height={45}
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col md="9">
            <span
              // key={keyframeTrigger}
              style={{ color: "red", fontSize: 15 }}
              // className={loginErrorCount >= 2 ? "blink-animation" : ""}
            >
              다시 시도해주세요
            </span>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col md="10" className="d-flex flex-column align-items-center">
            <Button
              className="btn-custom"
              style={{
                marginTop: "40px",
                padding: "10px 40px",
                fontSize: "16px",
                width: "85%",
                borderRadius: "15px",
              }}
              //   onClick={handleLogin}
            >
              로그인
            </Button>
            <div
              style={{
                marginTop: "10px",
                fontSize: "20px",
                width: "85%",
                textAlign: "center",
              }}
            ></div>
          </Col> 
        </Row>
      </Col > */}
    </Container>
  );
}
export default SignUpLayout;
