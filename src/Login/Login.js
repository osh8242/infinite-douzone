import React, { useState, useEffect } from "react";
import TextComponent from "./TextComponents";
import useLoginModel from "./useLoginModel";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLogin } from "./LoginProvider";
import { url } from "../model/CommonConstant";
import "./login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [invalid, setInvalid] = useState("");
  const [invalidPwd, setInvalidPwd] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const { loginInfo = "", updateToken, updateLoginInfo } = useLogin();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    LoginUser();
  };

  const handleOnBlur = (event) => {
    console.log(event);
    console.log(event.type);
  };

  const LoginUser = async (event) => {
    // console.log("loginInfo", loginInfo);

    const loginUser = {
      userId: id,
      userPwd: pwd,
    };

    // console.log(response.headers["authorization"]);
    // 현재 임시 토큰 값 : header 값으로 변경 필요
    try {
      const response = await axios.post(`${url}/auth/login`, loginUser);
      console.log("=========================");
      console.log(response);

      const token = response.data.token;
      console.log("token" + token);

      if (token) {
        updateToken(response.data.token);
        updateLoginInfo(JSON.parse(localStorage.getItem("userInfo")));
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));

        console.log("로그인에 성공하였습니다.");
        setInvalidPwd("");
        setInvalid("");
        setErrorMessage("");
        console.log("response.data", response.data);
        console.log("response.headers", response.headers);

        if (event.type !== "blur") {
          navigate("/");
        }
      } else {
        console.log("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("ERROR: " + error);
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_ID"
        ) {
          console.log("아이디를 찾을 수 없습니다.");
          setInvalid("invalid");
          setErrorMessage("아이디를 찾을 수 없습니다.");
        } else if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_PWD"
        ) {
          setInvalidPwd("invalid");
          setInvalid("invalid");
          console.log("비밀번호가 틀렸습니다.");
          setErrorMessage("비밀번호가 틀렸습니다.");
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
        <form onSubmit={handleFormSubmit}>
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
            <Col md="7">
              <Col md="8">아이디</Col>
              <Form.Control
                className={invalid}
                onChange={handleId}
                id="id"
                value={id}
                name="userId"
                type="text"
                label="ID"
                placeholder="ID"
                height={50}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col md="7">
              <Col md="8">비밀번호 </Col>
              <Form.Control
                className={invalid}
                onChange={handlePwd}
                id="pwd"
                value={pwd}
                name="userPwd"
                type="password"
                label="Password"
                placeholder="PASSWORD"
                height={45}
                onBlur={LoginUser}
              />
            </Col>
          </Row>
          <Row>
            <p className={"errorMessageWrap"}>{errorMessage}</p>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col md="10" className="d-flex flex-column align-items-center">
              <Col md="10">
                <Button
                  className="btn-custom"
                  type="submit"
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    padding: "10px 40px",
                    marginLeft: "35px",
                    fontSize: "16px",
                    width: "85%",
                    alignItems: "center",
                    borderRadius: "15px",
                  }}
                  onClick={LoginUser}
                >
                  로그인
                </Button>
              </Col>
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
                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                  |
                </span>
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
        </form>
      </Col>
    </Container>
  );
};

export default Login;
