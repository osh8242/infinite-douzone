import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";


function TextBoxComponent(props) {
  
  /* props 속성들*/
  const {
    type,     //textbox, regNum, email, password, file, date, color... 
    id,
    name,
    label, 
    size, 
    value,    

    suffix,   // %, 원화표시
    mask,     // '*'

    rows,             //textarea 전용 (몇행짜리 textbox만들거니)
    truncateLength,  //mask 전용 (처음 몇 글자만 보여줄 것인지 설정)

    //이벤트
    onChange,
    onClick,
    onClickCodeHelper,

    //유효성 검사
    validationFunction,

    //true false 옵션
    disabled,
    readOnly,
    plaintext,
    codeHelper,
    thousandSeparator,  //세자리 콤마
  } = props;

  // 입력값
  const [inputValue, setInputValue] = useState(value);
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
      //if (validation(newValue)) {
        setInputValue(makeProcessedValue(newValue));
      //}
  }


  // plain데이터 넘기기 +  보여줄 형태로 데이터 가공 
  const makeProcessedValue = (newValue) => {
    let processedValue = newValue;

    // suffix 단위 붙이기
    if(suffix){
      const numValue = processedValue.replaceAll(suffix, '');
      onChange && onChange(numValue); //no suffix value 넘기기
      processedValue = numValue + suffix; // 받은 값에 suffix 추가
    }

    // thousandSeparator 세자리 콤마
    if(thousandSeparator){ 
      const numValue = processedValue.replaceAll(',', '');
      onChange && onChange(numValue); //no comma value 넘기기
      processedValue = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 받은 값에 3자리수마다 콤마를 추가
    }

    // mask 마스킹 처리
    if(mask){
      onChange && onChange(newValue); //no masking value 넘기기
      processedValue = maskString(newValue);
    }

    return processedValue;
  }

  //마스킹 String 만들기 함수 
  const maskString = (input) => {
    const visibleCharacters = truncateLength; // 처음 몇 글자를 보여줄 것인지 설정
    const maskedPortion = input.slice(visibleCharacters).replace(/\S/g, mask);
    return input.slice(0, visibleCharacters) + maskedPortion;
  };

  //유효성 검사
  const validation = (value) => {
     //props에서 받은 유효성검사 
     validationFunction && validationFunction(value)

    if(thousandSeparator || suffix){
      const isNumber = /^\d+$/.test(value);
      if (!isNumber){
        alert("숫자를 입력해주세요."); 
        //focus input
      }
    }

    if(type === 'regNum'){
      //주민등록번호 유효성
      
    }
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
          <>  
          <Form.Control
            type={type}
            id={id} 
            name={name}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={inputValue}
            // onChange = {type === 'regnum'? {handleRegNumChange} : {handleInputChange}}
            onChange={handleInputChange}
            onClick={onClick}
          />
          </>
        )}
       {codeHelper && <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper}/>}
      </Col>
    </Row>
    
  );

}

export default TextBoxComponent;