import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { loginUser } from "./api";
import TextBoxComponent from "../components/TextBoxComponent";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import "./login.css";
import axios from "axios";
import { url } from "../model/CommonConstant";

const loginFindPwd = () => {
  // const [id, setId] = useState("");
  // const [email, setEmail] = useState("");

  const sendMail = () => {
    axios
      .post(`${url}/auth/findEmail`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.vlaue);
  // };
  // const handleId = (e) => {
  //   setId(e.target.vlaue);
  // };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Col md="7" className="px-5">
        <Row className="justify-content-center mb-4">
          <img
            src={imgLogo}
            alt="Logo"
            style={{ width: "500px", padding: "70px 0px 15px 0px" }}
          />
          <h4
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            비밀번호 찾기
          </h4>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            아이디
            <TextBoxComponent
              name="userId"
              type="text"
              // value={id}
              // onChange={handleId}
              placeholder="요청하실 아이디를 입력하세요."
              height={45}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            이메일
            <TextBoxComponent
              name="userEmail"
              type="text"
              // value={email}
              // onChange={handleEmail}
              placeholder="요청하실 이메일을 입력하세요."
              height={45}
            />
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
              onClick={sendMail}
            >
              이메일 전송
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default loginFindPwd;
