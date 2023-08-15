import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DateForm.css";
import { ko } from "date-fns/esm/locale";
import { Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-date-input" onClick={onClick} ref={ref}>
    <Form.Control type="text" value={value} />
    <FontAwesomeIcon icon={faCalendarDays} />
  </div>
));

const DateForm = ({ label }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <div>{label}</div>
      </Col>

      <Col md="8" className="d-flex align-items-center justify-content-center">
        <DatePicker
          locale={ko}
          customInput={<CustomInput />}
          className="form-control"
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </Col>
    </Row>
  );
};

export default DateForm;
