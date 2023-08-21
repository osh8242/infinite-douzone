import { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Col, Form } from "react-bootstrap";
import TextBoxComponent from "./components/TextBoxComponent";

function App() {
  return (
    <>
      <Form>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="textbox" type="textarea" rows="3" placeholder="문자를 입력해주세요"/>
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="파일" type="file" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="숫자" type="number" placeholder="숫자를 입력해주세요" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="일반textbox" placeholder="text 입력해주세요" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="비율" type="rate" placeholder="00(%)" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="원화" type="won" placeholder="00(원)"/>
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="날짜" type="date" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="주민번호" type="regNum" />
        </Col>
        <Col xs md={{ span: 5, offset: 1 }}>
          <TextBoxComponent label="비밀번호" type="password" placeholder="비밀번호를 입력해주세요"/>
        </Col>
      </Form>
    </>
  );
}

export default App;
