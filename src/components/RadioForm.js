// 작성자 : 이서연
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

function RadioForm({ label, optionList }) {
  const [selectedOption, setSelectedOption] = useState(optionList[0].key);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        {label}
      </Col>
      <Col
        md="8"
        className="d-flex align-items-center justify-content-start align-self-center"
      >
        {optionList.map((option) => (
          <div className="form-check form-check-inline" key={option.key}>
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                value={option.key}
                checked={selectedOption === option.key}
                onChange={handleOptionChange}
              />
              {option.value}
            </label>
          </div>
        ))}
      </Col>
    </Row>
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
