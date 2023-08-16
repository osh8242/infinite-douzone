import { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Form } from "react-bootstrap";
import TextBoxComponent from "./components/TextBoxComponent";


function App() {
  return (
    <>
      <Form>
        <TextBoxComponent
          controlId="exampleForm.ControlInput1"
          label="Email address"
          type="email"
          placeholder="llikephs515@gmail.com"
          disabled 
          readOnly
          plaintext 
        />
        {/* <TextBoxComponent controlId="exampleForm.ControlTextarea1" label="textboxarea" type="textboxarea" rows="5"/> */}
        {/*
          size 옵션 : lg,sm 
          type 옵션 : password, email ,file, color
          disabled
          readOnly
          plaintext : inputbox안에 안들어가있고 plaintext처럼 보이는 속성
      */}
      </Form>
    </>
  );
}

export default App;
