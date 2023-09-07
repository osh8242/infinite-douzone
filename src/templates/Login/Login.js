import React, { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../styles/img/wehago_logo.png";
import TextBoxComponent from "../../components/TextBoxComponent";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function LoginHandler(e) {
    console.log("LoginHandler function: ");
    console.log(e.target.value);
    console.log(e);
    console.log("Login");
    // console.log(e.target.value);
    setId();
    setPassword();
  }

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
          <Col md="8">
            아이디
            <TextBoxComponent
              type="textbox"
              size={3}
              md={3}
              value={id}
              onChange={(e) => setId(e.target.value)}
              height={45}
              customEvent={true}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="8">
            비밀번호
            <TextBoxComponent
              type="password"
              md={2}
              placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              height={45}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9" className="d-flex flex-column align-items-center">
            <Button
              className="btn-custom"
              onClick={LoginHandler}
              style={{
                marginTop: "40px",
                padding: "10px 40px",
                fontSize: "16px",
                width: "85%",
                borderRadius: "15px",
              }}
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

            {/* <a
              href="/signup"
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                color: "dimgray",
                padding: "4px 10px 4px 10px",
                marginRight: "0px",
                marginLeft: "7px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              회원가입
            </a> */}
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Login;
