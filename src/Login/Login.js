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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";

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

    try {
      const response = await axios.post(`${url}/auth/login`, loginUser);
      console.log("=========================");
      console.log(response);

      // console.log(response.headers["authorization"]);
      // 현재 임시 토큰 값 : header 값으로 변경 필요
      const token = response.data.token;
      // const token = response.headers["authorization"];
      console.log("token" + token);
      // console.log("response.headers", response.headers);

      // 토큰이 반환된 경우
      if (token) {
        updateToken(response.data.token);
        updateLoginInfo(JSON.parse(localStorage.getItem("userInfo")));
        localStorage.setItem("authToken", response.data.token);
        // localStorage.setItem("userInfo", loginInfo);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));

        console.log("로그인에 성공하였습니다.");
        setInvalidPwd("");
        setInvalid("");
        setErrorMessage("");
        console.log("response.data", response.data);
        console.log("response.headers", response.headers);
        // console.log("response.headerss", response.headers["authorization"]);
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
    <>
      {/* 로그인 페이지 전용 헤더 영역 */}
      <div id="login-topHeader" className="JOST p-24 semi-bold">
        {/* logo */}
        <a href="/">
          <FontAwesomeIcon
            icon={faInfinity}
            className="p-36 bold icon-infinity"
          />{" "}
          D
          <FontAwesomeIcon icon={faCircleDot} className="p-20 bold icon-text" />
          UZ
          <FontAwesomeIcon icon={faCircleDot} className="p-20 bold icon-text" />
          NE
        </a>
      </div>
      {/* 로그인 페이지 영역 */}
      <Container
        id="login-container"
        className="SUITE d-flex justify-content-center align-items-center"
      >
        <form onSubmit={handleFormSubmit}>
          {/* 로그인 제목 */}
          <div id="login-container-title" className="p-24 bold">
            로그인
          </div>
          {/* 아이디 */}
          <div id="login-container-content">
            <div className="justify-content-center">
              <label for="id">아이디</label>
              <Form.Control
                id="id"
                name="userId"
                type="text"
                className={invalid}
                onChange={handleId}
                value={id}
              />
              {/* </div> */}
              {/* 비밀번호 */}
              {/* <div className="justify-content-center"> */}
              <label for="pwd">비밀번호 </label>
              <Form.Control
                id="pwd"
                name="userPwd"
                type="password"
                className={invalid}
                onChange={handlePwd}
                value={pwd}
                onBlur={LoginUser}
              />
            </div>
          </div>
          {/* 에러메시지 */}
          <div>
            <p className={"errorMessageWrap"}>{errorMessage}</p>
          </div>
          {/* 로그인 버튼 및 아이디 찾기 ... 세부 추가  메뉴 */}
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
      </Container>
    </>
  );
};

export default Login;
