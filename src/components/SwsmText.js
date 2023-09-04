import { useEffect, useState, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { NumericFormat, PatternFormat } from "react-number-format";

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

function SwsmText(props) {
  const {
    type,
    label,
    labelKey,
    labelKey2,
    size,
    disabled,
    readOnly,
    plaintext,
    value,
    PeriodEnd,
    md,
    subLabel,
    label2,
    label3,
    isPeriod,
    actions,
  } = props;

  SwsmText.defaultProps = {
    md: "4",
  };

  const [inputValue, setInputValue] = useState(value);
  const [inputEndValue, setInputEndValue] = useState(PeriodEnd);

  useEffect(() => {
    setInputValue(props.value);
    setInputEndValue(props.PeriodEnd);
  }, [value, PeriodEnd]);

  const handleInputValueChange = (event) => {
    console.log("onChange :" + event.target.value);
    setInputValue(event.target.value);
    // if (event.key === "Enter") console.log("enter");
  };
  const handleInputEndValueChange = (event) => {
    console.log("onChange :" + event.target.value);
    setInputEndValue(event.target.value);
    // if (event.key === "Enter") console.log("enter");
  };

  const handleFocusOut = (event) => {
    const newData = {
      [labelKey]: inputValue,
      [labelKey2]: inputEndValue,
    };

    actions.setEdited(newData);
  };

  return (
    <>
      <Row className="py-1">
        {/* 추가 있을때만 2 기본 4 */}
        <Col
          md={!isPeriod ? "2" : "4"}
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>

        <Col
          md={!label2 ? "7" : "2"}
          className="d-flex align-items-center justify-content-center"
        >
          {/* subLabel 사용 시 */}
          {label2 && (
            <Col md="4">
              <div>{label2}</div>
            </Col>
          )}
          {/* 기본 text */}
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
                value={inputEndValue}
                onChange={handleInputEndValueChange}
                onBlur={handleFocusOut}
              />
            </>
          )}

          <Col
            md="3"
            className="d-flex align-items-center justify-content-center"
          >
            {label3 && <div>{label3}</div>}
          </Col>
        </Col>
      </Row>
    </>
  );
  //   }
}

export default SwsmText;
