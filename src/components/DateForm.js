import React, { useState } from "react";

function DateForm() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
    </div>
  );
}

export default DateForm;

// import React, { Component } from "react";

// class DateForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedDate: "",
//     };
//   }

//   handleDateChange = (event) => {
//     this.setState({
//       selectedDate: event.target.value,
//     });
//    console.log(event.target.value);
//   };

//   render() {
//     const { selectedDate } = this.state;

//     return (
//       <div>
//         <h2>날짜 선택:</h2>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={this.handleDateChange}
//         />
//       </div>
//     );
//   }
// }

// export default DateForm;
