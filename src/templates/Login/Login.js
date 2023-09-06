import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../../styles/Login.module.css";
import logoImg from "../../styles/img/wehago_logo.png";

// redux-toolkit
// import { useDispatch } from "react-redux";
// import { saveToken, saveInfo } from "../store/CounterSlice";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkFail, setCheckFail] = useState("");

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <>
        <div className={styles.page}>
          <div className={styles.imgContainer}>
            <img src={logoImg} />
          </div>
          <div className={styles.title}>로그인</div>

          <div className={styles.contentWrap} style={{ width: "450px" }}>
            <div className={styles.inputTitle}>아이디</div>
            {checkFail === "" ? (
              <div className={styles.inputWrap}>
                <input
                  // ref={loginInputRef}
                  type="text"
                  className={styles.input}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  // onClick={loginInputClick}
                />
              </div>
            ) : (
              <div className={styles.inputWrap}>
                <input
                  // ref={focusRef}
                  type="text"
                  className={styles.input}
                  style={{ borderColor: "red" }}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  // onClick={failRef}
                />
              </div>
            )}
            <div className={styles.inputTitle}>비밀번호</div>
            {checkFail === "" ? (
              <div className={styles.inputWrap}>
                <input
                  // ref={passwordInputRef}
                  type="password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  // onClick={passwordInputClick}
                />
              </div>
            ) : (
              <div className={styles.inputWrap}>
                <input
                  // ref={focusRef}
                  type="password"
                  className={styles.input}
                  style={{ borderColor: "red" }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  // onClick={failRef}
                />
              </div>
            )}
            <div className={styles.loginCheck}>{/* {checkFail} */}</div>
          </div>

          <button
            className={styles.bottomButton}
            // onClick={handleLogin}
          >
            로그인
          </button>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            회원가입
          </Link>

          <br />
        </div>
      </>
    </React.Fragment>
  );
}

export default Login;
