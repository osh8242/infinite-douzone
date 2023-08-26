import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { makeCommaNumber, makePlainNumber } from "../utils/NumberUtils";

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
    
    rows,             //textarea 전용 (몇행짜리 textbox)
    // truncateLength,  //mask 전용 (처음 몇 글자만 보여줄 것인지 설정)

    //이벤트
    onChange,
    onClick,
    onClickCodeHelper,
    onFocus,

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
    event.preventDefault();
    const newValue = event.target.value;
      if (validation(event.target, newValue)) {       //유효성
        setInputValue(makeProcessedValue(newValue));  //show data
      }
  }

  const makeProcessedValue = (newValue) => {
    let processedValue = newValue;
  
    if (suffix || thousandSeparator) {
      suffix && ( processedValue = processSuffix(processedValue, suffix))
      thousandSeparator && (processedValue = processThousandSeparator(processedValue))
      onChange && onChange(makePlainNumber(processedValue));// onChange 이벤트 처리
    }

    if(type==='regNum'){
      processedValue =  (/^\d{0,6}$/.test(newValue))? (newValue.replace(/(\d{6})(\d{0,1})/, '$1-$2')):(newValue) //하이픈 넣기
      onChange && onChange(processedValue);
    }
  
    return processedValue;
  };
  
  const processSuffix = (value, suffix) => {
    const numValue = value.replaceAll(suffix, '');
    return numValue + suffix;
  };
  
  const processThousandSeparator = (value) => {
    const numValue = value.replaceAll(/,/g, '');
    return makeCommaNumber(numValue.toString());
  };

  // 마스킹 String 만들기 함수 
  const maskString = (truncateLength,input) => {
    const visibleCharacters = truncateLength; // 처음 몇 글자를 보여줄 것인지 설정
    const maskedPortion = input.slice(visibleCharacters).replace(/\S/g, mask);
    return input.slice(0, visibleCharacters) + maskedPortion;
  };

  
  //유효성 검사
  const validation = (object ,value) => {
    
    if(thousandSeparator || suffix){
      thousandSeparator && (value = value.replaceAll(/,/g, ''));
      suffix && (value = value.replaceAll(suffix, ''));
      
      const isNumber = /^\d+$/.test(value);
      if (!isNumber){ 
        alert("숫자만 입력해주세요.");  
        //object.value='';
        //object.focus(); 
        return false;
      }
    }

    if(type === 'regNum'){//주민등록번호 유효성
      if(value.length >= 14){ 
        alert("13자리만 입력해주세요."); 
        object.value = value.slice(0, 14);
      }
    }

    //validationFunction && validationFunction(value);
    return true;
  }

  const handleInputFocus = (e) => {
    const obj = e.target;
   
    onFocus && onFocus(obj);// onFocus 이벤트 처리
  }
 
  return (
    <Row className="py-1">
      {label ? (
        <>
        <Col md="4" className="d-flex align-items-center justify-content-center" >
          <div>{label}</div>
        </Col>
        <Col md="8" className="d-flex align-items-center justify-content-center">
          {codeHelper ? (
            <div className="react-datepicker__input-container">
              {renderFormControl()} <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper}/>
            </div>
          ) : (
            <>
              {renderFormControl()}
            </>
          )}
        </Col>
        </>
      ):(
        <>{renderFormControl()}</>
      )}
    </Row>
    
  );

  function renderFormControl() {
    if (type === 'textarea') {
      return (
        <Form.Control 
          as="textarea" 
          id={id} 
          name={name} 
          rows={rows} 
          onChange={handleInputChange}
          onClick={onClick}
        />
      );
    } else {
      return (
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
          onFocus={handleInputFocus}
          onClick={onClick}
        />
      );
    }
  }
}

export default TextBoxComponent;