import { faC } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Form, Row } from "react-bootstrap";
import { NumericFormat, PatternFormat } from 'react-number-format';

//css
const textBoxStyle = {
  width: '100%',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  appearance: 'none',
  backgroundColor: 'var(--bs-body-bg)',
  backgroundClip: 'padding-box',
  border: 'var(--bs-border-width) solid var(--bs-border-color)',
  borderRadius: 'var(--bs-border-radius)',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  padding: '0.375rem 0.75rem'
};

function TextBoxComponent(props) {
  
  //props 속성들
  const { type, label, rows, size, disabled, readOnly, plaintext, value, onChange , onClick} = props;
  
  //커스텀 type 속성
  const TYPE_TEXTAREA = 'textarea';               // textarea
  const TYPE_NUMBER = 'number';                   // 숫자(세자리 콤마)
  const TYPE_RATE = 'rate';                       // 비율(뒤에 %)
  const TYPE_WON = 'won';                         // 원화(뒤에 원화표기)
  const TYPE_REG_NUM = 'regNum';                  // 주민번호(뒷자리 마스킹)
  const TYPE_CUSTOM_FORMAT = 'customformat';      // 커스텀 포멧(패턴지정)
  const TYPE_CODE_HEPLER = 'codeHelper';          // 코드헬퍼


  switch (type) {

    //custom type 정의(1)_TextArea
    case TYPE_TEXTAREA:  
      return (
      <Row className="py-1">
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <div>{label}</div>
        </Col>
        <Col md="8" className="d-flex align-items-center justify-content-center">                                  
          <Form.Control as="textarea" rows={rows} placeholder={props.placeholder}/>
        </Col>
      </Row>
    );

  //custom type 정의(2)_NumericFormat(comma처리 + 단위) ex) number,rate,won
  case TYPE_NUMBER:
    case TYPE_RATE:
    case TYPE_WON:
    
    let suffix = '';              // 단위(뒤) 앞은 prefix
    let placeholder = '';         // placeholder
    let thousandSeparator = true; // 세자리 콤마

    if (type === "rate") {
      suffix = '%';
    } else if (type === "won") {
      suffix = '원';
    }

    return(
      <Row className="py-1">
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <div>{label}</div>
        </Col>
        <Col md="8" className="d-flex align-items-center justify-content-center">
          <NumericFormat 
            thousandSeparator={thousandSeparator} 
            suffix={suffix}
            placeholder={props.placeholder} 
            value={value}
            onChange={onChange}
            style={textBoxStyle}
            />
        </Col>  
      </Row>
    );
  
  //custom type 정의(3)_PatternFormat(패턴검사) 
  case TYPE_REG_NUM:        
  case TYPE_CUSTOM_FORMAT:  
    
    let format = '';
    if(type === TYPE_REG_NUM){ 
      format='######-#######';
      placeholder = 'YYMMDD-XXXXXXX';
    }
    if(type === TYPE_CUSTOM_FORMAT){  
      format=props.format;
      format=props.placeholder;
    }

    return(
      <Row className="py-1">
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <div>{label}</div>
        </Col>
        <Col md="8" className="d-flex align-items-center justify-content-center">
          <PatternFormat 
            placeholder={placeholder} 
            format={format}
            value={value}
            onChange={onChange}
            style={textBoxStyle}
          />
        </Col>
      </Row>
    );

    //custom type 정의(4)_CodeHelper 코드도움 컴포넌트
    case TYPE_CODE_HEPLER:  

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <div className="react-datepicker__input-container" ref={ref}>
        <Form.Control type="text" value={value} />
        <FontAwesomeIcon icon={faC} onClick={onClick}/>
      </div>
    ));

      return (
        <Row className="py-1">
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <div>{label}</div>
        </Col>
  
        <Col md="8" className="d-flex align-items-center justify-content-center">
          <div className="react-datepicker-wrapper">
            <CustomInput onClick={onClick}/>
          </div>
        </Col>
      </Row>
    );

    
  //bootstrap 제공 Textbox type들... ex) email,password,file,date,color... 
  default:
    return (
      <Row className="py-1">
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <div>{label}</div>
        </Col>
        <Col md="8" className="d-flex align-items-center justify-content-center">
         <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={value}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  }  

  
}

export default TextBoxComponent;