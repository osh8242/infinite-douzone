import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { loginUser } from "./api";
import TextBoxComponent from "../components/TextBoxComponent";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import "./login.css";

const LoginLayout = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(""); // 로그인 에러 상태 추가
  const [loginErrorCount, setLoginErrorCount] = useState(0);
  const [keyframeTrigger, setKeyframeTrigger] = useState(0);
  const handleLogin = async () => {
    try {
      const responseData = await loginUser(username, password);

      console.log("1.");
      console.log("login Layout response: ");
      console.log(responseData);
      console.log(responseData.user);

      if (responseData.message === "SUCCESS") {
        console.log("(1-1) ---- Message : SUCCESS");

        localStorage.setItem("userInfo", JSON.stringify(responseData.user));
        let userInfoString = localStorage.getItem("userInfo");

        if (userInfoString) {
          let userInfoObject = JSON.parse(userInfoString);
          console.log("     ----- localStorage Value: ");
          console.log(userInfoObject);
          console.log(userInfoObject.userName);
          //////////
          dispatch(loginSuccess(userInfoObject));
          window.location.href = "/main"; // 임시 리다이렉트
        }

        // window.location.href = "/lc"; // 임시 리다이렉트
      } else {
        console.error(responseData.message);
        window.location.href = "/main"; // 임시 리다이렉트
      }
    } catch (error) {
      console.error("ERROR:", error);

      setLoginError(true);
      setLoginErrorCount((prev) => {
        if (prev >= 1) {
          setKeyframeTrigger((k) => k + 1); // 두 번째 에러부터 키 프레임 트리거 업데이트
        }
        return prev + 1;
      });
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_ID"
        ) {
          console.log("아이디를 찾을 수 없습니다.");
        } else if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_PWD"
        ) {
          console.log("비밀번호가 틀렸습니다.");
        } else {
          console.log("로그인 처리 중 오류가 발생했습니다.");
        }
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
              className={loginError ? "invalid" : ""} // 로그인 실패시 클래스 추가
              onFocus={() => setLoginError(false)} // 포커스 시 에러 상태 해제
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

        {loginError && ( // 로그인 에러 메시지 출력
          <Row className="justify-content-center mb-4">
            <Col md="9">
              <span
                key={keyframeTrigger}
                style={{ color: "red", fontSize: 15 }}
                className={loginErrorCount >= 2 ? "blink-animation" : ""}
              >
                다시 시도해주세요
              </span>
            </Col>
          </Row>
        )}

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

export default LoginLayout;
