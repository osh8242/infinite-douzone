import React, { useState } from "react";

function RadioForm({ label, optionList }) {
  const [selectedOption, setSelectedOption] = useState(optionList[0].key);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.checked);
  };

  return (
    <div>
      {label}
      {optionList.map((option) => (
        <label>
          <input
            type="radio"
            value={option.key}
            checked={selectedOption === option.key}
            onChange={handleOptionChange}
          />
          {option.value}
        </label>
      ))}
    </div>
  );
}

export default RadioForm;

// test data : App.js

// import { Container } from "react-bootstrap";
// import "./App.css";
// import RadioForm from "./components/RadioForm";

// function App() {
//   const radioList = [
//     { key: "M", value: "남자" },
//     { key: "F", value: "여자" },
//   ];

//   return (
//     <div>
//       <Container>
//         <RadioForm label={"Gender"} optionList={radioList} />
//       </Container>
//     </div>
//   );
// }

// export default App;
