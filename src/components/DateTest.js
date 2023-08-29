// 작성자 : 이서연

// 사용법
// label: 라벨, isPeriod: 기간 여부(T/F), type: 월/일 여부(date/month)
// 기본값 - isPeriod : False, type: Date

// Test Code
// <DateTest label={"생년월일"} isPeriod={true} type={"month"} />
import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DateTest(props) {
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
  } = props;
  // const [date, setDate] = useState(new Date());
  // const [inputValue, setInputValue] = useState(value);
  const [startDate, setStartDate] = useState(value);
  const [endDate, setEndDate] = useState(value2);

  DateTest.defaultProps = {
    label: "",
    isPeriod: false,
    type: "date",
  };

  useEffect(() => {
    setStartDate(props.value);
  }, [value]);

  useEffect(() => {
    setEndDate(props.value2);
  }, [value2]);
  // useEffect(() => {
  //   if (value !== startDate) {
  //     setStartDate(value);
  //   }
  //   if (value2 !== endDate) {
  //     setEndDate(value2);
  //   }
  // }, [value, value2]);

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
    console.log("endData update : ");
    console.log("labelKey2: " + labelKey2);
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
    <Row className="py-1">
      {label && (
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
      )}
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Control
          type={type}
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

export default DateTest;

// const { label, isPeriod, type, value, value2, pkValue, actions } = props;
// const [dateData, setDateData] = useState();
// const [inputValue, setInputValue] = useState(value);
// const [startDate, setStartDate] = useState(value);
// const [endDate, setEndDate] = useState(value2);
// const dateStartRef = useRef();
// const dateEndRef = useRef();

// useEffect(() => {
//   dateStartRef.current.value = value;
//   dateEndRef.current.value = value2;
// });

// const handleStartDateChange = (event) => {
//   console.log("state handeler");
//   dateStartRef.current.value = event.target.value;

//   const newStartDate = {
//     startEmpContractPeriod: dateStartRef.current.value,
//     cdEmp: pkValue.cdEmp,
//   };
//   actions.setDateData(newStartDate);
// };

// const handleEndDateChange = (event) => {
//   console.log("end handeler");
//   dateEndRef.current.value = event.target.value;

//   const newEndDate = {
//     endEmpContractPeriod: dateEndRef.current.value,
//     cdEmp: pkValue.cdEmp,
//   };
//   actions.setDateData(newEndDate);
// };

// const handleDate = ({}) => {
//   dateStartRef.current.value = value;
//   dateEndRef.current.value = value2;

//   const newDate = {
//     startDate: dateStartRef.current.value,
//     endDate: dateEndRef.current.value,
//     cdEmp: pkValue.cdEmp,
//   };

//   actions.setDate(newDate);

// };

// useEffect(() => {
//   if (value !== startDate) {
//     setStartDate(value);
//   }
//   if (value2 !== endDate) {
//     setEndDate(value2);
//   }
// }, [value, value2]);
// const handleStartDateChange = (event) => {
// setStartDate(event.target.value);
// if (props.onChangeStartDate) {
//   props.onChangeStartDate(event.target.value);
// }
// console.log(event.target.value);

// const handleEndDateChange = (event) => {
//   console.log("end hangledfe");
//   // setEndDate(event.target.value);
//   if (props.onChangeEndDate) {
//     props.onChangeEndDate(event.target.value);
//   }
//   console.log(event.target.value);
// };
