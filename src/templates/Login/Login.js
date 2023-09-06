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

  // redux-toolkit dispatch
  // const dispatch = useDispatch();
  // const focusRef = useRef(null); // 로그인 실패시 사용할 Ref
  // const loginInputRef = useRef(null); // 로그인 input 클릭시 사용할 Ref
  // const passwordInputRef = useRef(null); // 패스워드 input 클릭시 사용할 Ref

  const navigate = useNavigate();

  // // result data
  // let data = {};

  // // 로그인 function
  // const handleLogin = async () => {
  //   await axios
  //     .post("http://localhost:8889/api/user/login", {
  //       userId: id,
  //       userPwd: password,
  //     })
  //     .then((result) => {
  //       data = result.data;

  //       if (data.status === "OK") {
  //         // HttpStatus.OK

  //         localStorage.setItem("accessToken", data.data.tokenDTO.authorization); // localStorage 토큰 저장

  //         if (localStorage.getItem("accessToken").includes("Bearer")) {
  //           localStorage.setItem("userInfo", JSON.stringify(data.data.userDTO));

  //           dispatch(saveToken(localStorage.getItem("accessToken"))); // redux-toolkit에 토큰 저장 (렌더링)

  //           dispatch(
  //             saveInfo({
  //               // (렌더링)
  //               copSeq: data.data.userDTO.copSeq,
  //               copName: data.data.userDTO.copName,
  //               userSeq: data.data.userDTO.userSeq,
  //               userId: data.data.userDTO.userId,
  //               userName: data.data.userDTO.userName,
  //               userEmail: data.data.userDTO.userEmail,
  //               userState: data.data.userDTO.userState,
  //               userImage: data.data.userDTO.userImage,
  //               userAddress: data.data.userDTO.userAddress,
  //               empPosition: data.data.userDTO.empPosition,
  //               empImage: data.data.userDTO.empImage,
  //               authLevel: data.data.userDTO.authLevel,
  //               userPhone: data.data.userDTO.userPhone,
  //             })
  //           );
  //         }

  //         navigate("/create/cop");
  //       } else {
  //         setCheckFail("아이디나 비밀번호를 다시 확인해주세요.");
  //       }
  //     })

  //     .catch((error) => {
  //       if (error.code === "ERR_BAD_REQUEST") {
  //         setCheckFail("아이디와 비밀번호는 공란일 수 없습니다.");
  //       } else {
  //         setCheckFail("서버오류! 관리자에게 문의해주세요.");
  //       }
  //     });
  // };

  // // input tag focus 시 border 색상 변경 및 checkFail 초기화
  // const failRef = () => {
  //   setCheckFail("");
  // };

  // // 로그인 input 클릭
  // const loginInputClick = () => {
  //   loginInputRef.current.style.borderColor = "#007bff";
  //   passwordInputRef.current.style.borderColor = "#ccc";
  // };

  // // 패스워드 input 클릭
  // const passwordInputClick = () => {
  //   passwordInputRef.current.style.borderColor = "#007bff";
  //   loginInputRef.current.style.borderColor = "#ccc";
  // };

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
