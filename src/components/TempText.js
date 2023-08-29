import { useEffect, useState, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { NumericFormat, PatternFormat } from "react-number-format";

//css
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

function TempText(props) {
  //props 속성들
  const {
    type,
    label,
    rows,
    size,
    disabled,
    readOnly,
    plaintext,
    value,
    md,
    subLabel,
    label2,
    label3,
    isPeriod,
    actions,
  } = props;

  // const tbodyRef = useRef();
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     console.log("enter testing");

  //     console.log(tbodyRef);
  //     console.log(tbodyRef.current);
  //     console.log(tbodyRef.current.children);
  //     console.log(tbodyRef.current.children[0]);
  //   }
  // };

  // console.log("처음 들어온 데이터: " + value);

  TempText.defaultProps = {
    md: "4",
  };

  // console.log('md:' + md);
  //입력값
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(props.value);
  }, [value]);

  //마스킹 함수
  const handleInputValueChange = (event) => {
    console.log("onChange :" + event.target.value);

    // let data = event.target.value;
    // setInputValue(data);

    setInputValue(event.target.value);
    if (event.key === "Enter") console.log("enter");
  };

  const handleFocusOut = (event) => {
    console.log("blur");
    console.log(inputValue);

    const newData = {
      jobDescription: inputValue,
    };

    actions.setEdited(newData);
  };

  //custom type 정의(0)_TextArea
  if (type === "textarea") {
    //Textarea
    return (
      <Row className="py-1">
        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
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
  } else if (type === "number" || type === "rate" || type === "won") {
    let suffix = ""; // 단위(뒤) 앞은 prefix
    let placeholder = ""; // placeholder
    let thousandSeparator = true; // 세자리 콤마

    if (type === "rate") {
      suffix = "%";
    } else if (type === "won") {
      suffix = "원";
    }

    return (
      <Row className="py-1">
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
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
  } else if (type === "regNum" || type === "customformat") {
    //주민번호, 포멧지정

    let format = "";
    let placeholder = "";

    if (type === "regNum") {
      //주민번호 format
      format = "######-#######";
      placeholder = "YYMMDD-XXXXXXX";
    } else {
      //포멧지정
      format = props.format;
      format = props.placeholder;
    }

    return (
      <Row className="py-1">
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
        <Col
          md="8"
          className="d-flex align-items-center justify-content-center"
        >
          <PatternFormat
            placeholder={placeholder}
            format={format}
            value={inputValue}
            onChange={handleInputValueChange}
            style={textBoxStyle}
            onBlur={handleFocusOut}
          />
        </Col>
      </Row>
    );

    //bootstrap 제공 Textbox type들... ex) email,password,file,date,color...
  } else if (isPeriod) {
    return (
      <Row className="py-1">
        {/* 추가 있을때만 2 기본 4 */}
        <Col
          md={md}
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>

        <Col
          md={!subLabel && "7"}
          className="d-flex align-items-center justify-content-center"
        >
          {/* subLabel 사용 시 */}
          {subLabel && (
            <Col md="2">
              <div>{label2}</div>
            </Col>
          )}
          {/* 기본 text */}
          <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={inputValue}
            onChange={handleInputValueChange}
            onBlur={handleFocusOut}
          />
          {isPeriod && (
            <>
              ~
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
            </>
          )}

          <Col
            md="2"
            className="d-flex align-items-center justify-content-center"
          >
            {subLabel && <div>{label3}</div>}
          </Col>
        </Col>
      </Row>
    );
  } else if (subLabel) {
    return (
      <Row className="py-1">
        {/* 추가 있을때만 2 기본 4 */}
        <Col
          md={2}
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>

        <Col
          md={"2"}
          className="d-flex align-items-center justify-content-center"
        >
          {/* subLabel 사용 시 */}
          {subLabel && (
            <Col md="4">
              <div>{label2}</div>
            </Col>
          )}
          {/* 기본 text */}{" "}
          <Col md="4">
            <Form.Control
              type={type}
              placeholder={props.placeholder}
              size={5}
              disabled={disabled}
              readOnly={readOnly}
              plaintext={plaintext}
              value={inputValue}
              onChange={handleInputValueChange}
              onBlur={handleFocusOut}
            />
          </Col>
          {isPeriod && (
            <>
              ~
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
            </>
          )}
          <Col
            md="3"
            className="d-flex align-items-center justify-content-center"
          >
            {subLabel && <div>{label3}</div>}
          </Col>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="py-1">
          {/* 추가 있을때만 2 기본 4 */}
          <Col
            md={md}
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>

          <Col
            md={!subLabel && "7"}
            className="d-flex align-items-center justify-content-center"
          >
            {/* subLabel 사용 시 */}
            {subLabel && (
              <Col md="2">
                <div>{label2}</div>
              </Col>
            )}
            {/* 기본 text */}
            <Form.Control
              type={type}
              placeholder={props.placeholder}
              size={size}
              disabled={disabled}
              readOnly={readOnly}
              plaintext={plaintext}
              value={inputValue}
              onChange={handleInputValueChange}
              onBlur={handleFocusOut}
            />
            {isPeriod && (
              <>
                ~
                <Form.Control
                  type={type}
                  placeholder={props.placeholder}
                  size={size}
                  disabled={disabled}
                  readOnly={readOnly}
                  plaintext={plaintext}
                  value={inputValue}
                  onChange={handleInputValueChange}
                  onBlur={handleFocusOut}
                />
              </>
            )}

            <Col
              md="2"
              className="d-flex align-items-center justify-content-center"
            >
              {subLabel && <div>{label3}</div>}
            </Col>
          </Col>
        </Row>
      </>
    );
  }
}

export default TempText;
