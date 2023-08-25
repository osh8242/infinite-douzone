// 작성자 : 이서연

// Test Code
// <DateTest label={"생년월일"} />
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function DateTest({ label, type, defaultValue , onChange , value}) {
  const [choice, setChoice] = useState('month');

  // if (type === 'month') {
  //   console.log('month');
  // }

  const onChangeHandeler = (e) =>{
    //console.log(e.target.value);
    onChange(e.target.value);
  }

  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <div>{label}</div>
      </Col>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Control
          type={type ? type : 'date'}
          placeholder="YYYY.MM.DD"
          defaultValue={defaultValue}
          onChange={onChangeHandeler}
          value = {value}
        />
      </Col>
    </Row>
  );
}

export default DateTest;

// export default class DateTest extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleDayChange = this.handleDayChange.bind(this);
//     this.state = {
//       selectedDay: undefined,
//     };
//   }

//   handleDayChange(day) {
//     this.setState({ selectedDay: day });
//   }

//   render() {
//     const { selectedDay } = this.state;
//     return (
//       <div>
//         {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
//         {!selectedDay && <p>Choose a day</p>}
//         <DayPickerInput onDayChange={this.handleDayChange} />
//       </div>
//     );
//   }
// }

// import React, { useState } from "react";
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
// import "./DateTest.css";
// import { Col, Form, Row } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
// const IconInInput = React.forwardRef(({ value, onClick }, ref) => (
//   <div className="custom-date-input" onClick={onClick} ref={ref}>
//     <Form.Control type="text" value={value} />
//     <FontAwesomeIcon icon={faCalendarDays} />
//   </div>
// ));
// function DateTest({ label }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     console.log(date);
//   };

//   return (
//     <Row className="py-1">
//       <Col md="4" className="d-flex align-items-center justify-content-center">
//         <div>{label}</div>
//       </Col>
//       <Col md="8" className="d-flex align-items-center justify-content-center">
//         <Datetime
//           customInput={<IconInInput />}
//           value={selectedDate}
//           onChange={handleDateChange}
//           timeFormat={false} // 시간 정보 비활성화
//           dateFormat="YYYY년 MM월 DD일"
//         />
//       </Col>
//     </Row>
//   );
// }

// export default DateTest;

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
