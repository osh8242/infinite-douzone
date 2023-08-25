import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";


function TextBoxComponent(props) {
  
  /* props 속성들*/
  const {
    type,     //textbox, email, password, file, date, color... 
    id,
    name,
    label, 
    size, 
    value,    

    suffix,   // %, 원화표시
    mask,     // '*'

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
    
      if (validation(newValue)) {

        // 세자리콤마 
        if(thousandSeparator){ 
          const numValue = newValue.replaceAll(',', '');
          if (onChange) onChange(numValue); //콤마없는 clean value 넘기기

          let valuePlusSeparator = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 받은 값에 3자리수마다 콤마를 추가
          setInputValue(valuePlusSeparator);
        }

        
      }
  }

  //유효성 검사
  const validation = (value) => {
    
    // 세자리콤마 
    if(thousandSeparator){  
      const numCheck = /^[0-9,]/.test(value);   // 입력값이 숫자와 콤마(,)인지 확인 (불린값이 나옴)
      if (!numCheck && value) return false;     // 숫자가 아닌 문자로 이루어져 있으면 pass! (입력이 x)
    }

    return true;
  }

  // 뒤에 단위 붙이기 처리 , 마스킹처리, 세자리 콤마 처리
  const showInputValue = (value) => {
    
    // suffix 처리
    value = value + suffix;

    // mask 마스킹 처리 
   

    // thousandSeparator 세자리 콤마
    

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