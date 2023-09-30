// 작성자 : 이서연
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DateForm(props) {
  const { label, type, value, subValue, onChange, id, dateType } = props;

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(value || "");

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
    if (e.target.type !== "month") onChange && onChange(e, value);
  };

  return (
    <Row className="py-1">
      {label ? (
        <div className="labelAndContent">
          <div className="label">{label}</div>
          <div className="widthFull d-flex align-items-center">
            <Form.Control
              id={id}
              type={dateType ? "month" : "date"}
              value={startDate}
              onChange={onChangeHandeler}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </Row>
  );
}

export default DateForm;
