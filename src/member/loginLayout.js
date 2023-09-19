import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { loginUser } from "./api";
import TextBoxComponent from "../components/TextBoxComponent";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";

const LoginLayout = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const responseData = await loginUser(username, password);

      console.log("1.");
      console.log("login Layout response: ");
      console.log(responseData);
      console.log(responseData.user);

      if (responseData.message === "SUCCESS") {
        console.log("(1-1) ---- Message : SUCCESS");

        // localStorage response data : token, loginUser
        /// localStorage 값으로 redux store 저장

        // localStorage.setItem("token", JSON.stringify(responseData.token));
        // let TOKEN = localStorage.getItem("token");
        // if (TOKEN) {
        //   let TOKEN_KEY = JSON.parse(TOKEN);
        //   console.log("(1-2) ----- localStorage TOKEN KEY Value: ");
        //   console.log(TOKEN_KEY);
        //   // 로컬 set 과 같은 개념?
        //   dispatch(loginSuccess(TOKEN_KEY));
        // }

        localStorage.setItem("userInfo", JSON.stringify(responseData.user));
        let userInfoString = localStorage.getItem("userInfo");

        if (userInfoString) {
          let userInfoObject = JSON.parse(userInfoString);
          console.log("     ----- localStorage Value: ");
          console.log(userInfoObject);
          //////////
          dispatch(loginSuccess(userInfoObject));
        }
        // window.location.href = "/lc"; // 임시 리다이렉트
      } else {
        console.error(responseData.message);
        window.location.href = "/login"; // 임시 리다이렉트
      }
    } catch (error) {
      console.error("로그인 에러:", error);
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
              type="text"
              placeholder="ID"
              height={45}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleLogin}
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
        </Row>
      </Col>
    </Container>
  );
};

export default LoginLayout;
