// 작성자 : 이서연
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DateForm(props) {
  const { label, isPeriod, type, value, subValue, onChange, id, subId } = props;

  // const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(value || "");
  const [endDate, setEndDate] = useState(subValue || "");

  DateForm.defaultProps = {
    label: "",
    isPeriod: false,
    type: "date",
  };

  useEffect(() => {
    setStartDate(value || "");
  }, [value]);

  useEffect(() => {
    setEndDate(subValue || "");
  }, [subValue]);

  const onChangeHandeler = (e) => {
    const value = e.target.value;
    if (e.target.id === id) setStartDate(value);
    else setEndDate(value);
    onChange && onChange(e, value);
  };

  return (
    <Row className="py-1">
      <div className="labelAndContent">
        <div className="label">{label}</div>
        <div className="widthFull  ">
          <Form.Control
            id={id}
            type={type ? type : "date"}
            placeholder="YYYY.MM.DD"
            value={startDate}
            onChange={onChangeHandeler}
          />
          {isPeriod && (
            <>
              ~
              <Form.Control
                id={subId}
                type={type}
                placeholder="YYYY.MM.DD"
                value={endDate}
                onChange={onChangeHandeler}
              />
            </>
          )}
        </div>
      </div>
    </Row>
  );
}

export default DateForm;
