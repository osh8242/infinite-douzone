// 작성자 : 이서연

// 사용법
// label: 라벨, isPeriod: 기간 여부(T/F), type: 월/일 여부(date/month)
// 기본값 - isPeriod : False, type: Date

// Test Code
// <DateTest label={"생년월일"} isPeriod={true} type={"month"} />
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DateForm(props) {
  const {
    label,
    isPeriod,
    type,
    value,
    value2,
    actions,
    pkValue,
    labelKey,
    labelKey2,
    onChange,
  } = props;

  // const [date, setDate] = useState(new Date());
  // const [inputValue, setInputValue] = useState(value);
  const [startDate, setStartDate] = useState(value || "");
  const [endDate, setEndDate] = useState(value2 || "");

  DateForm.defaultProps = {
    label: "",
    isPeriod: false,
    type: "date",
  };

  useEffect(() => {
    setStartDate(value || "");
  }, [value]);

  useEffect(() => {
    setEndDate(value2 || "");
  }, [value2]);

  const onChangeHandeler = (e) => {
    const value = e.target.value;
    onChange(e, value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    if (props.onChangeStartDate) {
      props.onChangeStartDate(event.target.value);
    }
    const newDate = {
      [labelKey]: event.target.value,
    };
    actions.setEdited(newDate);
  };

  const handleEndDateChange = (event) => {
    //console.log("endData update : ");
    //console.log("labelKey2: " + labelKey2);
    setEndDate(event.target.value);
    if (props.onChangeEndDate) {
      props.onChangeEndDate(event.target.value);
    }
    const newDate = {
      [labelKey2]: event.target.value,
    };
    actions.setEdited(newDate);
  };

  return (
    <Row>
      {label && (
        <Col
          md="4"
          className="label d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
      )}
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Control
          type={type ? type : "date"}
          placeholder="YYYY.MM.DD"
          value={startDate}
          onChange={handleStartDateChange}
        />
        {isPeriod && (
          <>
            ~
            <Form.Control
              type={type}
              placeholder="YYYY.MM.DD"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </>
        )}
      </Col>
    </Row>
  );
}

export default DateForm;
