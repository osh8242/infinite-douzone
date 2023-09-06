import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../styles/img/wehago_logo.png";
import TextBoxComponent from "../../components/TextBoxComponent";
import CommonConstant from "../../model/CommonConstant";
import RadioForm from "../../components/RadioForm";
import TempAdd from "../../components/TempAdd";
import axios from "axios";

function SignTemp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [address, setAddress] = useState("");

  const url = "http://localhost:8888";
  const {
    genderRadioList, //성별
  } = CommonConstant();

  useEffect(() => {
    setId(id);
  }, [id]);

  function SignUpHandler() {
    console.log("signup Handler");
    console.log("id: " + id);
    console.log("pwd: " + password);
    axios
      .post(
        url + "/user/signup",
        { userId: id, userPwd: password },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        console.log("signUp Data: " + response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  return (
    <Container className="d-flex justify-content-center">
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
              padding: "0px 0px 10px 0px",
            }}
          >
            회원가입
          </h2>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent
              type="textbox"
              label={"아이디"}
              size={3}
              md={3}
              value={id}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent
              type="password"
              label={"비밀번호"}
              md={3}
              placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
              value={password}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent type="email" label={"Email"} size={3} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent type="textbox" label={"이름"} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent type={"date"} label={"생년월일"} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent type="tel" label={"연락처"} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <RadioForm label={"성별"} optionList={genderRadioList} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TempAdd label={"주소"} mb={3} md={3} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <Button
              className="w-100"
              style={{ marginTop: "3rem" }}
              onClick={SignUpHandler}
            >
              회원가입하기
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
export default SignTemp;
