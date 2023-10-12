import React, { useState, useEffect, useRef } from "react";
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
import "../styles/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [invalid, setInvalid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const { updateToken, updateLoginInfo } = useLogin();
  const navigate = useNavigate();

  const handleFocus = () => {
    setPwd("");
    setInvalid("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (id === "") {
      setId("");
      setInvalid("");
      setErrorMessage("");
    }
  }, [id]);

  useEffect(() => {
    if (pwd === "") {
      setPwd("");
      setInvalid("");
      setErrorMessage("");
    }
  }, [pwd]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Teing");

    const loginUser = {
      userId: id,
      userPwd: pwd,
    };

    try {
      const response = await axios.post(
        `${url}/auth/login?clientIp=${sessionStorage.getItem("clientIp")}`,
        loginUser
      );
      const token = response.data.token;
      console.log(response.data);

      if (token) {
        updateToken(token);
        updateLoginInfo(JSON.parse(localStorage.getItem("userInfo")));
        // if (event.type !== "blur") {
        localStorage.setItem("authToken", token || null);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.user) || null
        );
        // }
        ///////////////////////////

        // const currentTime = new Date();
        localStorage.setItem("loginTime", new Date());

        console.log("로그인에 성공하였습니다.");
        // setIsSuccess(true);
        // setInvalidPwd("");
        setInvalid("");
        setErrorMessage("");
        navigate("/");
        console.log("response.data", response.data);
        console.log("response.headers", response.headers);
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
          console.log("비밀번호가 틀렸습니다.");
          setInvalid("invalid");
          setErrorMessage("비밀번호가 틀렸습니다.");
          // }
        } else {
          console.log("로그인 처리 중 오류가 발생했습니다.");
          setErrorMessage("비밀번호가 틀렸습니다.");
        }
      }
    }
  };

  return (
    <>
      <div id="login-container-background"></div>
      <div
        id="login-container"
        className="d-flex justify-content-center align-items-center"
      >
        {/* 로그인 페이지 전용 헤더 영역 */}
        <div id="login-topHeader" className="Cabin p-20 bold">
          {/* logo */}
          <a href="/">
            D<span className="icon-text ex-bold">O</span>
            UZ
            <span className="icon-text ex-bold">O</span>
            NE
            <FontAwesomeIcon
              icon={faInfinity}
              className="p-24 bold icon-infinity"
            />
          </a>
        </div>
        <form onSubmit={handleLogin}>
          {/* 로그인 제목 */}
          <div id="login-container-title" className="Cabin p-24">
            LOGIN
          </div>
          {/* 아이디 */}
          <div id="login-container-content" className="SUITE">
            <div className="justify-content-center">
              <label for="id">아이디</label>
              <Form.Control
                id="id"
                name="userId"
                type="text"
                className={invalid}
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </div>
            {/* 비밀번호 */}
            <div className="justify-content-center">
              <label for="pwd">비밀번호 </label>
              <Form.Control
                id="pwd"
                name="userPwd"
                type="password"
                className={invalid}
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                onFocus={handleFocus}
              />
            </div>
          </div>
          {/* 에러메시지 */}
          <div className="SUITE">
            <p className={"errorMessageWrap"}>{errorMessage}</p>
          </div>
          {/* 로그인 버튼 및 아이디 찾기 ... 세부 추가  메뉴 */}
          <div className="SUITE justify-content-center mb-4">
            {/* <Col className="d-flex flex-column align-items-center"> */}
            <Button
              id="loginBtn"
              className="p-16"
              type="submit"
              onClick={handleLogin}
            >
              로그인
            </Button>
            <div id="login-find-userInfo">
              <a href="/loginFindId">아이디 찾기</a>
              <span>|</span>
              <a href="/loginFindPwd">비밀번호 찾기</a>
              <span>|</span>
              <a href="/signup">회원가입</a>
            </div>
            {/* </Col> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
