import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { loginUser } from "./api";
import TextBoxComponent from "../components/TextBoxComponent";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import "./login.css";

const loginFindId = () => {
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
          <h4
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            아이디 찾기
          </h4>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="9">
            <TextBoxComponent
              name="userId"
              type="text"
              placeholder="이메일을 입력하세요."
              height={45}
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
            >
              다음
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default loginFindId;
