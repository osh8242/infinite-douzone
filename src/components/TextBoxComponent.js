import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
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
  padding: '0.375rem 0.75rem',
};

function TextBoxComponent(props) {
  //props 속성들
  const { type, label, rows, size, disabled, readOnly, plaintext, value } =
    props;

  //입력값
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(props.value);
  }, [value]);

  //마스킹 함수
  const handleInputValueChange = (event) => {
    const input = event.target.value;

    const maskedNumber = input.replace(
      /^(\d{6})(\d+)/,
      (match, group1, group2) => {
        const maskedGroup2 = group2.replace(/./g, '*');
        console.log('group1내용 : ' + group1);
        return `${group1}-${maskedGroup2}`;
      },
    );

    setInputValue(maskedNumber);
  };

  //custom type 정의(0)_TextArea
  if (type === 'textarea') {
    //Textarea
    return (
      <Row className="py-1">
        {label && (
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>
        )}
        <Col
          md="8"
          className="d-flex align-items-center justify-content-center"
        >
          <Form.Control
            as="textarea"
            rows={rows}
            placeholder={props.placeholder}
          />
        </Col>
      </Row>
    );

    //custom type 정의(1)_NumericFormat(comma처리 + 단위) ex) number,rate,won
  } else if (type === 'number' || type === 'rate' || type === 'won') {
    let suffix = ''; // 단위(뒤) 앞은 prefix
    let placeholder = ''; // placeholder
    let thousandSeparator = true; // 세자리 콤마

    if (type === 'rate') {
      suffix = '%';
    } else if (type === 'won') {
      suffix = '원';
    }

    return (
      <Row className="py-1">
        {label && (
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>
        )}
        <Col
          md="8"
          className="d-flex align-items-center justify-content-center"
        >
          <NumericFormat
            thousandSeparator={thousandSeparator}
            suffix={suffix}
            placeholder={props.placeholder}
            value={inputValue}
            onChange={handleInputValueChange}
            style={textBoxStyle}
          />
        </Col>
      </Row>
    );

    //custom type 정의(2)_PatternFormat(패턴검사)
  } else if (type === 'regNum' || type === 'customformat') {
    //주민번호, 포멧지정

    let format = '';
    let placeholder = '';

    if (type === 'regNum') {
      //주민번호 format
      format = '######-#######';
      placeholder = 'YYMMDD-XXXXXXX';
    } else {
      //포멧지정
      format = props.format;
      format = props.placeholder;
    }

    console.log('라벨', label);

    return (
      <Row className="py-1">
        {label && (
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>
        )}

        <Col className="d-flex align-items-center justify-content-center">
          <PatternFormat
            placeholder={placeholder}
            format={format}
            value={inputValue}
            onChange={handleInputValueChange}
            style={textBoxStyle}
          />
        </Col>
      </Row>
    );

    //bootstrap 제공 Textbox type들... ex) email,password,file,date,color...
  } else {
    return (
      <Row className="py-1">
        {label && (
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>
        )}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </Col>
      </Row>
    );
  }
}

export default TextBoxComponent;
