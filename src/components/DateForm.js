// 작성자 : 이서연
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "../../src/styles/DateForm.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";
function DateForm(props) {
  const {
    label,
    type,
    value,
    subValue,
    onChange,
    id,
    dateType,
    sub,
    disabled,
    selectRef,
    selectEndRef,
  } = props;

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(value || "");
  const [endDate, setEndDate] = useState(value || "");
  const [isDisabled, setDisabled] = useState();

  useEffect(() => {
    if (disabled) setDisabled(true);
    else setDisabled(false);
  }, [isDisabled]);

  DateForm.defaultProps = {
    label: "",
    isPeriod: false,
  };

  useEffect(() => {
    setStartDate(value || "");
  }, [value]);

  const onChangeHandeler = (e) => {
    const value = e.target.value;
    setStartDate(value);
    // if (e.target.type !== "month")
    onChange && onChange(e, value);
  };

  const onChangeEndHandeler = (e) => {
    const value = e.target.value;
    setEndDate(value);
    // if (e.target.type !== "month")
    onChange && onChange(e, value);
  };

  return (
    <Row className="mt-1 mb-1">
      <div className="labelAndContent">
        {label && <div className="label">{label}</div>}
        <div className="widthFull d-flex align-items-center gap-3">
          <Form.Control
            id={id}
            ref={selectRef}
            type={dateType ? "month" : "date"}
            value={startDate}
            onChange={onChangeHandeler}
            disabled={isDisabled}
          />
          {sub ? (
            <>
              {" ~ "}
              <Form.Control
                id={id}
                ref={selectEndRef}
                type={dateType ? "month" : "date"}
                value={endDate}
                onChange={onChangeEndHandeler}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Row>
  );
}

export default DateForm;
