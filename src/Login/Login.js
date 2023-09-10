import React from "react";
import TextComponent from "./TextComponents";
import useLoginModel from "./useLoginModel";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";

const Login = () => {
  const { sendDataToBackend } = useLoginModel();

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
          <h2
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            로그인
          </h2>
        </Row>
        <TextComponent
          name="userId"
          type="text"
          label="ID"
          placeholder="ID"
          height={45}
        />
        <TextComponent
          name="userPwd"
          type="password"
          label="Password"
          placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
          height={45}
        />
        <Button
          className="btn-custom"
          style={{
            marginTop: "40px",
            padding: "10px 40px",
            fontSize: "16px",
            width: "85%",
            borderRadius: "15px",
          }}
          onClick={sendDataToBackend}
        >
          로그인
        </Button>
        <Button
          className="btn-custom"
          style={{
            marginTop: "10px",
            padding: "0px 40px",
            fontSize: "16px",
            width: "85%",
            borderRadius: "15px",
            color: "darkblue",
            backgroundColor: "white",
            border: "none",
          }}
        >
          회원가입
        </Button>
      </Col>
    </Container>
  );
};

export default Login;
