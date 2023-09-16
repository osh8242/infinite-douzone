// 작성자 : 이서연
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DateForm(props) {
  const { label, type, value, subValue, onChange, id } = props;

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(value || "");

  DateForm.defaultProps = {
    label: "",
    isPeriod: false,
    type: "date",
  };

  useEffect(() => {
    setStartDate(value || "");
  }, [value]);

  const onChangeHandeler = (e) => {
    const value = e.target.value;
    if (e.target.id === id) setStartDate(value);
    onChange && onChange(e, value);
  };

  return (
    <Row>
      <div className="py-1 widthFull labelAndContent">
        {label && <div className="label">{label}</div>}
        <div className="widthFull d-flex align-items-center justify-content-center">
          <Form.Control
            id={id}
            type={type ? type : "date"}
            placeholder="YYYY.MM.DD"
            value={startDate}
            onChange={onChangeHandeler}
          />
        </div>
      </div>
    </Row>
  );
}

export default DateForm;
