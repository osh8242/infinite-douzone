import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
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
import useRegisterModel from "./useRegisterModel";
import { url } from "../model/CommonConstant";

function SignUpLayout() {
  const [id, setId] = useState("");
  const [tempId, setTempId] = useState("");
  const [tempPwd, setTempPwd] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempGender, setTempGender] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  // const { RegisterUser } = useRegisterModel();

  // const { id, setId } = useState();
  // const { tempId, setTempId } = useState();

  // useEffect(() => {
  //   setId(tempId);
  // }, [tempId]);

  const RegisterUser = () => {
    console.log("Register GO!");
    console.log(tempId);
    console.log(tempPwd);
    console.log(tempName);
    console.log(tempDate);
    console.log(tempGender);
    // console.log(tempPhone);
    // console.log(tempEmail);
    // console.log(tempPhone); ... 필요

    const RegisterVo = {
      userId: tempId,
      userPwd: tempPwd,
      userName: tempName,
      // email: tempEmail,
      birth: tempDate,
      gender: tempGender,
      // phone: tempPhone,
    };

    // try {
    //   const response = axios.post(`${url}/auth/register`, RegisterVo);
    //   console.log(response);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("ERROR: " + error);
    // }

    async function fetchData() {
      let result = await axios.post(`${url}/auth/register`, RegisterVo);
      console.log(result.data);
    }

    fetchData();
  };

  const handleTemporaryId = (e) => {
    setTempId(e.target.value);
    // setIdValid(false);
  };

  const handleTemporaryPwd = (e) => {
    setTempPwd(e.target.value);
  };
  const handleTempName = (e) => {
    setTempName(e.target.value);
  };
  const handleTempDate = (e) => {
    setTempDate(e.target.value);
  };
  const handleTempGender = (e) => {
    setTempGender(e.target.value);
  };
  const handleTempPhone = (e) => {
    setTempPhone(e.target.value);
  };

  const handleTemporaryEmail = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    // console.log(tempEmail);
    setTempEmail(e.target.value);
  };

  const handleIdCheck = () => {
    setId(tempId);
  };

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
              <Form.Control
                name="userId"
                value={tempId}
                onChange={handleTemporaryId}
                type={"textbox"}
                placeholder=""
                height={40}
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
              <Form.Control
                name="userId"
                type={"password"}
                value={tempPwd}
                onChange={handleTemporaryPwd}
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
              <Form.Control
                name="userId"
                type={"email"}
                value={tempEmail}
                onChange={handleTemporaryEmail}
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
              <Form.Control
                name="userId"
                value={tempName}
                onChange={handleTempName}
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
              <Form.Control
                type={"date"}
                value={tempDate}
                onChange={handleTempDate}
              />
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
              <Form.Control
                name="userId"
                type={"textbox"}
                value={tempPhone}
                onChange={handleTempPhone}
                height={40}
              />
            </Col>
          </Row>
        </Col>
        <Col md="6" className="d-flex flex-column align-items-center">
          <Button
            className="btn-custom"
            style={{
              marginTop: "50px",
              padding: "10px 40px",
              fontSize: "16px",
              width: "85%",
              borderRadius: "15px",
            }}
            onClick={RegisterUser}
          >
            로그인
          </Button>
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
