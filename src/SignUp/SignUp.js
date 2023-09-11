import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import TextBoxComponent from "../../src/components/TextBoxComponent";
import CommonConstant from "../../src/model/CommonConstant";
import RadioForm from "../../src/components/RadioForm";
import TempAdd from "../../src/components/TempAdd";
import axios from "axios";
import { SignUpField } from "./SignUpField";

function SignUp() {
  const [formState, setFormState] = useState({});

  const handleInputChange = (stateName, value) => {
    setFormState((prevState) => ({ ...prevState, [stateName]: value }));
  };

  const renderComponent = (field) => {
    switch (field.component) {
      case "TextBoxComponent":
        return (
          <TextBoxComponent
            type={field.type}
            label={field.label}
            md={field.md}
            value={formState[field.stateName] || ""}
            onChange={(e) => handleInputChange(field.stateName, e.target.value)}
          />
        );
      case "RadioForm":
        return (
          <RadioForm
            label={field.label}
            optionList={field.options}
            md={field.md}
            selectedOption={formState[field.stateName] || ""}
            onSelectOption={(option) =>
              handleInputChange(field.stateName, option)
            }
          />
        );
      case "TempAdd":
        return (
          <TempAdd
            label={field.label}
            md={field.md}
            value={formState[field.stateName] || ""}
            onChange={(e) => handleInputChange(field.stateName, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Col md="7" className="px-5">
        <Row className="justify-content-center mb-4">
          <img
            src={imgLogo}
            alt="Logo"
            style={{ width: "500px", padding: "30px 0px 15px 0px" }}
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

        {SignUpField.map((field, idx) => (
          <Row key={idx} className="justify-content-center mb-4">
            <Col md="9">{renderComponent(field)}</Col>
          </Row>
        ))}

        <Row className="justify-content-center mb-4">
          <Col md="9" className="d-flex flex-column align-items-center">
            <Button
              className="btn-custom"
              style={{
                marginTop: "30px",
                padding: "10px 40px",
                fontSize: "16px",
                width: "85%",
                borderRadius: "15px",
              }}
              onClick={() => {}}
            >
              회원가입하기
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default SignUp;
