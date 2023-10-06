import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import TextBoxComponent from "../../src/components/TextBoxComponent";
import CommonConstant from "../../src/model/CommonConstant";
import RadioForm from "../../src/components/RadioForm";
import TempAdd from "../../src/components/TestAdd";
import axios from "axios";
import { SignUpField } from "./SignUpField";
import AddressForm from "../components/AddressForm";
import DateForm from "../components/DateForm";
import "./signUpLayout.css";
import { Radio } from "@mui/material";
import { RADIO_LIST } from "../model/CommonConstant";
import useRegisterModel from "./useRegisterModel";
import { url } from "../model/CommonConstant";
import { useNavigate } from "react-router-dom";
import { invalid } from "moment/moment";
import ConfirmComponent from "../components/ConfirmComponent";
import { useApi } from "../model/Api";

function SignUpLayout() {
  const api = useApi();
  const navigate = useNavigate();

  const [stateModal, setStateModal] = useState("");
  const [invalid, setInvalid] = useState("");
  const [invalidCd, setInvalidCd] = useState("");
  const [pwdCheckVaild, setPwdCheckVaild] = useState("");
  const [id, setId] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [tempId, setTempId] = useState("");
  const [tempPwd, setTempPwd] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempGender, setTempGender] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [idCheck, setIdCheck] = useState("");
  const [cdCheck, setCdCheck] = useState("");

  const [phoneValid, setPhoneValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [pwdValid, setPwdValid] = useState("");
  const [passConfirmValid, setPassConfirmValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneErrorValid, setPhoneErrorValid] = useState(null);
  const [existEmail, setExistEmail] = useState();
  const [themeColor, setThemeColor] = useState("");
  const [registerOk, setRegisterOk] = useState(false);
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [modalState, setModalState] = useState({ show: false });

  const [confirmState, setConfirmState] = useState({
    show: false,
  });

  const onHide = () => {
    if (location) {
      window.location.href = location;
    }
    setConfirmState({ ...confirmState, show: false });
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    checkPwdCheck();
  };

  const checkPwdCheck = (e) => {
    if (tempPwd.length > 7 && passwordConfirm.length > 7) {
      if (tempPwd === passwordConfirm) {
        setPassConfirmValid(true);
        setPwdCheckVaild("");
      } else {
        setPassConfirmValid(false);
        setPwdCheckVaild("invalid");
      }
    } else if (e && e.type && tempPwd.length > 0) {
      if (tempPwd === passwordConfirm) {
        setPassConfirmValid(true);
        setPwdCheckVaild("");
      } else {
        setPassConfirmValid(false);
        setPwdCheckVaild("invalid");
      }
    }
  };

  // 유효성검사
  useEffect(() => {
    // const idRegex = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{7,12}$/g;
    // if (idRegex.test(id)) {
    //   setInvalid("");
    // } else if (tempId === "") {
    //   setInvalid("");
    // } else {
    //   setInvalid("invalid");
    // }

    const passwordRegex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (passwordRegex.test(tempPwd)) {
      setPwdValid("");
    } else if (tempPwd === "") {
      setPwdValid("");
    } else if (tempPwd.length < 1) {
      console.log("비번 1보다 작으므로 유효성 검사 안함" + tempPwd.length);
      setPwdValid("");
    } else {
      setPwdValid("invalid");
    }

    checkPwdCheck();

    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(tempEmail)) {
      setEmailValid("");
    } else if (tempEmail === "") {
      setEmailValid("");
    } else {
      setEmailValid("invalid");
    }

    const pattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;

    if (pattern.test(tempPhone)) {
      setPhoneValid("");
    } else if (tempPhone === "") {
      setPhoneValid("");
    } else {
      setPhoneValid("invalid");
    }
  }, [tempPwd, tempEmail, passConfirmValid, tempPhone, passwordConfirm]);

  const RegisterUser = () => {
    console.log("Register GO!");
    const checkRegister = false;

    if (
      phoneValid === "invalid" ||
      emailValid === "invalid" ||
      pwdCheckVaild === "invalid" ||
      pwdValid === "invalid"
    ) {
      console.log("회원가입 실패");

      setShowModal({
        show: true,
        message: "유효하지 않은 입력이 있습니다. 확인 후 다시 시도해주세요.",
      });

      // alert("유효하지 않은 입력이 있습니다. 확인 후 다시 시도해주세요.");
      return;
    }

    const RegisterVo = {
      userId: tempId,
      userPwd: tempPwd,
      userName: tempName,
      email: tempEmail,
      companyName: companyCode,
      companyCode: tempId,
      // birth: tempDate,
      // gender: tempGender,
      phone: tempPhone,
      theme: themeColor,
    };

    async function fetchData() {
      let result = await api.post(`${url}/auth/register`, RegisterVo);
      console.log(result.data);
      if (result.data === "SUCCESS") {
        setLocation("/SUCCESS");
        setShowModal({
          show: true,
          message: "회원가입이 완료되었습니다.",
        });
      } else if (result.data === "FAIL" || checkRegister) {
        setLocation("/FAIL");
        setShowModal({
          show: true,
          message: "회원가입 실패. 다시 시도해 주세요",
        });
      }
    }
    fetchData();
  };

  const onMove = () => {
    if (location === "/SUCCESS") window.location.href = "/login";
    else window.location.href = "/signup";
  };

  const onHideHandler = (e) => {
    setShowModal(false);
    console.log("hides");
    window.location.href = { stateModal };
  };

  const handleTemporaryCd = (e) => {
    setCompanyCode(e.target.value);
  };

  const handleTemporaryId = (e) => {
    setTempId(e.target.value);
  };

  const handleTemporaryPwd = (e) => {
    setTempPwd(e.target.value);
  };

  const handleTempName = (e) => {
    setTempName(e.target.value);
  };

  const handleTempPhone = (e) => {
    setTempPhone(e.target.value);
  };

  const handleTemporaryEmail = (e) => {
    setTempEmail(e.target.value);
  };

  const handleIdCheck = () => {
    setId(tempId);
  };

  const checkVaildPwd = () => {
    const passwordRegex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (passwordRegex.test(tempPwd)) {
      setPwdValid("");
    } else if (tempPwd.length < 1) {
      console.log("비번 1보다 작으므로 유효성 검사 안함" + tempPwd.length);
      setPwdValid("");
    } else {
      setPwdValid("invalid");
    }
  };
  const checkVaildEmail = () => {
    axios
      .post(`${url}/auth/checkVaildEmail`, { email: tempEmail })
      .then((response) => {
        console.log("reesult::" + response.data);
        if (response.data === "SUCCESS") {
          console.log("Check email SUDSSCCEESS");
          setExistEmail("");
          setEmailValid("");
        } else if (response.data === "FAIL") {
          console.log("already exist Emila///");
          setExistEmail("true");
          setEmailValid("invalid");
          // TODO : 아이디 재입력 요청 문구 처리 필요
        }
      })
      .catch(console.errors);
  };
  const checkVaildId = () => {
    console.log("아이디 중복 검사 실시");
    //    const response = axios.post(`${url}/auth/checkVaildId`, data);
    axios
      .post(`${url}/auth/checkVaildId`, { userId: tempId })
      .then((response) => {
        console.log("reesult::" + response.data);
        if (response.data === "SUCCESS") {
          console.log("Check ID SUDSSCCEESS");
          setIdCheck("SUCCESS");
          console.log(idCheck);
          setInvalid(""); // neceesssaarrr
        } else if (response.data === "FAIL") {
          console.log("already exist id///");
          setIdCheck("FAIL");
          setInvalid("invalid");
          // TODO : 아이디 재입력 요청 문구 처리 필요
        }
      })
      .catch(console.errors);
  };

  const checkVaildCd = () => {
    console.log("아이디 중복 검사 실시");
    //    const response = axios.post(`${url}/auth/checkVaildId`, data);
    axios
      .post(`${url}/auth/checkVaildCd`, { companyCode: companyCode })
      .then((response) => {
        console.log("reesult::" + response.data);
        if (response.data === "SUCCESS") {
          console.log("Check ID SUDSSCCEESS");
          setCdCheck("SUCCESS");
          console.log(idCheck);
          setInvalidCd(""); // neceesssaarrr
        } else if (response.data === "FAIL") {
          console.log("already exist Cd///");
          setCdCheck("FAIL");
          setInvalidCd("invalid");
          // TODO : 아이디 재입력 요청 문구 처리 필요
        }
      })
      .catch(console.errors);
  };

  return (
    <Container
      id="SignUp"
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center mb-4">
        <Row className="justify-content-center mb-4">
          <img
            src={imgLogo}
            alt="Logo"
            style={{ width: "400px", padding: "0px 0px 15px 0px" }}
          />
          <h2 className="subLabel">회원가입</h2>
        </Row>
        <Col md="15">
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              회사 이름
              <Form.Control
                name="companyCode"
                value={companyCode}
                onChange={handleTemporaryCd}
                type={"textbox"}
                placeholder="회사이름을 입력해 주세요."
                height={40}
                onBlur={checkVaildCd}
                className={invalidCd}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {cdCheck === "SUCCESS" && companyCode.length > 0 ? (
                  <p className={"successMessageWrap"}>
                    사용 가능한 코드입니다.
                  </p>
                ) : cdCheck === "FAIL" && companyCode.length > 0 ? (
                  <p className={"errorMessageWrap"}>
                    사용 불가능한 코드입니다.
                  </p>
                ) : companyCode.length === 0 ? (
                  <p> </p>
                ) : (
                  <p> </p>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              아이디
              <Form.Control
                name="userId"
                value={tempId}
                onChange={handleTemporaryId}
                type={"textbox"}
                placeholder="아이디를 입력해 주세요."
                height={40}
                onBlur={checkVaildId}
                className={invalid}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {idCheck === "SUCCESS" && tempId.length > 0 ? (
                  <p className={"successMessageWrap"}>
                    사용 가능한 아이디입니다.
                  </p>
                ) : idCheck === "FAIL" && tempId.length > 0 ? (
                  <p className={"errorMessageWrap"}>
                    사용 불가능한 아이디입니다.
                  </p>
                ) : tempId.length === 0 ? (
                  <p> </p>
                ) : (
                  <p> </p>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              비밀번호
              <Form.Control
                name="userPwd"
                type={"password"}
                value={tempPwd}
                onChange={handleTemporaryPwd}
                placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
                height={40}
                onBlur={checkVaildPwd}
                className={pwdValid}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {tempPwd.length === 0 ? (
                  <p></p>
                ) : tempPwd.length > 1 &&
                  tempPwd.length < 25 &&
                  pwdValid === "" ? (
                  <p className={"successMessageWrap"}>
                    조건에 맞는 비밀번호입니다.
                  </p>
                ) : (
                  <p className={"errorMessageWrap"}>
                    영문, 숫자, 특수문자 포함 8~25자 이상 입력해주세요.
                  </p>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              비밀번호 확인
              <Form.Control
                type={"password"}
                onChange={handlePasswordConfirm}
                onBlur={checkPwdCheck}
                placeholder="비밀번호를 다시 입력해 주세요."
                height={40}
                className={pwdCheckVaild}
                value={passwordConfirm}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {passConfirmValid ? (
                  <p className={"successMessageWrap"}>비밀번호와 일치합니다.</p>
                ) : !passConfirmValid && passwordConfirm.length > 0 ? (
                  <p className={"errorMessageWrap"}>
                    비밀번호와 일치하지 않습니다.
                  </p>
                ) : (
                  <p></p>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              이메일
              <Form.Control
                name="userId"
                type={"email"}
                value={tempEmail}
                onChange={handleTemporaryEmail}
                height={40}
                className={emailValid}
                // onBlur={checkVaildEmail}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {tempEmail.length > 0 && emailValid === "invalid" ? (
                  <p className={"errorMessageWrap"}>
                    이메일 형식을 확인해 주세요.
                  </p>
                ) : (
                  // : existEmail === "true" && emailValid === "invalid" ? (
                  // <p className={"errorMessageWrap"}>사용 중인 이메일 입니다.</p>
                  // )
                  <p></p>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              이름
              <Form.Control
                name="userId"
                value={tempName}
                onChange={handleTempName}
                type={"textbox"}
                placeholder="이름"
                height={40}
              />
              <Row className="d-flex justify-content-center align-items-center">
                <p> </p>
              </Row>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              연락처
              <Form.Control
                name="userPhone"
                type={"textbox"}
                value={tempPhone}
                onChange={handleTempPhone}
                height={40}
                placeholder="ex) 010-1234-5678"
                className={phoneValid}
              />
              <Row className="d-flex justify-content-center align-items-center">
                {tempPhone.length > 0 && phoneValid === "invalid" ? (
                  <p className={"errorMessageWrap"}>
                    올바른 전화번호 형식이 아닙니다.
                  </p>
                ) : (
                  <Row className="d-flex justify-content-center align-items-center">
                    <p> </p>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center">
            <Col md="5">
              테마 색상
              <Col md="9" style={{ display: "flex", alignItems: "center" }}>
                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(48,150,255)"
                    checked={themeColor === "rgb(48,150,255)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(48,150,255)" }}></span>
                </label>

                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(18, 204, 108)"
                    checked={themeColor === "rgb(18, 204, 108)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(18, 204, 108)" }}></span>
                </label>

                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(254, 213, 51)"
                    checked={themeColor === "rgb(254, 213, 51)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(254, 213, 51)" }}></span>
                </label>
                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(255, 134, 48)"
                    checked={themeColor === "rgb(255, 134, 48)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(255, 134, 48)" }}></span>
                </label>
                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(255, 82, 82)"
                    checked={themeColor === "rgb(255, 82, 82)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(255, 82, 82)" }}></span>
                </label>
                <label className="color-option">
                  <input
                    type="radio"
                    value="rgb(126, 58, 243)"
                    checked={themeColor === "rgb(126, 58, 243)"}
                    onChange={(e) => setThemeColor(e.target.value)}
                  />
                  <span style={{ backgroundColor: "rgb(126, 58, 243)" }}></span>
                </label>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col md="6" className="d-flex flex-column align-items-center">
          <Button
            className="btn-custom"
            style={{
              marginTop: "50px",
              padding: "10px 40px",
              fontSize: "16px",
              width: "85%",
              borderRadius: "15px",
            }}
            onClick={RegisterUser}
          >
            회원가입
          </Button>
        </Col>
      </Row>
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onHide={() => setModalState({ show: false })}
        onConfirm={() => {
          onMove();
          setShowModal(false);
        }}
      />
    </Container>
  );
}
export default SignUpLayout;
