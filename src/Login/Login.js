import React from "react";
import TextComponent from "./TextComponents";
import useLoginModel from "./useLoginModel";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";

const Login = () => {
  const { LoginUser } = useLoginModel();

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
        <Row className="justify-content-center mb-4">
          <Col md="8">아이디</Col>
          <TextComponent
            name="userId"
            type="text"
            label="ID"
            placeholder="ID"
            height={45}
          />
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="8">비밀번호 </Col>
          <TextComponent
            name="userPwd"
            type="password"
            label="Password"
            placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
            height={45}
          />
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
              onClick={LoginUser}
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
            >
              <Link
                to="/loginFindId"
                style={{
                  textDecoration: "none",
                  color: "darkblue",
                  marginRight: "20px",
                }}
              >
                아이디 찾기
              </Link>
              <span style={{ marginRight: "10px" }}>|</span>
              <Link
                to="/loginFindPwd"
                style={{
                  textDecoration: "none",
                  color: "darkblue",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                비밀번호 찾기
              </Link>
              <span style={{ marginLeft: "10px", marginRight: "10px" }}>|</span>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "darkblue",
                  marginLeft: "20px",
                }}
              >
                회원가입
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
