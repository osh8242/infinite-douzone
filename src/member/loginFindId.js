import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { loginUser } from "./api";
import TextBoxComponent from "../components/TextBoxComponent";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import "./login.css";
import { url } from "../model/CommonConstant";
import axios from "axios";

const LoginFindId = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    console.log("click");
    try {
      const response = await axios.post(url + "/auth/findEmail", {
        userEmail: "seoyeonev@gmail.com",
      });

      console.log("OK");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받은 경우
        console.error("Error:", error.response.data);
      } else if (error.request) {
        // 서버에 요청이 보내졌지만 응답을 받지 못한 경우
        console.error("No response was received:", error.request);
      } else {
        // 요청을 설정하는 동안 오류가 발생한 경우
        console.error("Error setting up the request:", error.message);
      }
    }
  };
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
            아이디 찾기
          </h4>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent
              name="email"
              type="text"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={sendEmail}
            >
              다음
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default LoginFindId;
