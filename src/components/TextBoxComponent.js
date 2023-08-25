import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { NumericFormat, PatternFormat } from "react-number-format";

//react-number-format inputbox bootstrap css
const textBoxStyle = {
  width: "100%",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5",
  appearance: "none",
  backgroundColor: "var(--bs-body-bg)",
  backgroundClip: "padding-box",
  border: "var(--bs-border-width) solid var(--bs-border-color)",
  borderRadius: "var(--bs-border-radius)",
  transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  padding: "0.375rem 0.75rem",
};

function TextBoxComponent(props) {
  
  /* props 속성들*/
  const {
    id,
    name,
    type,     //textbox, email, password, file, date, color... 
    label, 
    size, 
    value,    
    suffix,   //단위(문자)
    mask,     //마스크(문자)

    //textarea 전용 
    rows,     

    //이벤트
    onChange,
    onClick,
    onClickCodeHelper,

    //true false 옵션
    disabled,
    readOnly,
    plaintext,
    codeHelper,
    thousandSeparator,  //세자리 콤마
  } = props;

  //입력값
  const [inputValue, setInputValue] = useState(value);
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) onChange(newValue);

    setInputValue(showInputValue(newValue));
  };

  //보여지는 데이터 
  const showInputValue = (value) => {
    // value = value + suffix;
    return value;
  }

  return (
    <Row className="py-1">
      {label && (
        <Col md="4" className="d-flex align-items-center justify-content-center" >
          <div>{label}</div>
        </Col>
      )}
      
      <Col md="8" className="d-flex align-items-center justify-content-center">
        {type === 'textarea' ? (
          <Form.Control 
            as="textarea" 
            id={id} 
            name={name} 
            rows={rows} 
            onChange={handleInputChange}
            onClick={onClick}/>
        ) : (
          <Form.Control
            type={type}
            id={id} 
            name={name}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={inputValue}
            onChange={handleInputChange}
            onClick={onClick}
          />
        )}
       {codeHelper && <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper}/>}
      </Col>
    </Row>
    
  );

}

export default TextBoxComponent;