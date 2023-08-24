// 기본 날짜 컴포넌트
// import React, { useState } from "react";

// function DateForm() {
//   const [selectedDate, setSelectedDate] = useState("");

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//     console.log(event.target.value);
//   };

//   return (
//     <div>
//       <input type="date" value={selectedDate} onChange={handleDateChange} />
//     </div>
//   );
// }

// export default DateForm;

//0.
// yarn add rc-calendar

// import React, { useState } from "react";
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";

// function CustomDatePicker() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container mt-4">
//       <Datetime
//         value={selectedDate}
//         onChange={handleDateChange}
//         inputProps={{ className: "form-control" }}
//         timeFormat={false}
//       />
//     </div>
//   );
// }

// export default CustomDatePicker;

//1.
// yarn add date-fns react-datepicker

// import React, { useState } from 'react';
// import 'react-datepicker/dist/react-datepicker.css';
// import { registerLocale } from 'react-datepicker';
// import ko from 'date-fns/locale/ko';
// import DatePicker from 'react-datepicker';

// registerLocale('ko', ko);

// function CustomDatePicker() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div >
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         locale="ko"
//         className="form-control"
//       />
//     </div>
//   );
// }

// export default CustomDatePicker;

//2.
// yarn add react-datepicker

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function DateForm() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container mt-4">
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         className="form-control"
//       />
//     </div>
//   );
// }

// export default DateForm;

//   // 날짜 유효성 검사
// import React, { useState } from "react";

// function DateForm() {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [isValidDate, setIsValidDate] = useState(true);

//   const handleDateChange = (event) => {
//     const inputDate = event.target.value;

//     setSelectedDate(inputDate);

//     const parts = inputDate.split("-");
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1;
//     const day = parseInt(parts[2]);
//     const parsedDate = new Date(year, month, day);

//     if (
//       parsedDate.getFullYear() === year &&
//       parsedDate.getMonth() === month &&
//       parsedDate.getDate() === day
//     ) {
//       setIsValidDate(true);
//     } else {
//       setIsValidDate(false);
//     }
//   };

//   return (
//     <div>
//       <input type="date" value={selectedDate} onChange={handleDateChange} />
//       {!isValidDate && (
//         <p style={{ color: "red" }}>날짜를 잘못 입력하였습니다.</p>
//       )}
//     </div>
//   );
// }

// export default DateForm;

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ko } from "date-fns/esm/locale";
import { Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomInput.scss";

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
      {label && (
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
      )}

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
