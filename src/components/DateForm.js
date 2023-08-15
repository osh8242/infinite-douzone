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
