// 작성자 : 이서연

// TestCode
// <RadioForm label={"성별"} optionList={radioList} />

import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/commonComponent.css";

function RadioForm({
  id,
  label,
  optionList,
  checked,
  disabled,
  onChange,
  md = 4,
}) {
  const [selectedOption, setSelectedOption] = useState(checked);

  useEffect(() => {
    setSelectedOption(checked);
  }, [checked]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    onChange(event, value);
    setSelectedOption(value);
  };

  return (
    <Row className="py-1">
      <div className="labelAndContent">
        {/* <div className="d-flex align-items-center justify-content-start align-self-center px-3 mt-2"> */}
        {label && (
          <div
            className="label"
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "4px",
              paddingBottom: "4px",
              height: "120%",
            }}
          >
            {label}
          </div>
        )}
        <div className="widthFull d-flex align-items-center justify-content-center">
          {optionList.map((option) => (
            <div className="form-check form-check-inline" key={option.key}>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  id={id}
                  type="radio"
                  disabled={disabled}
                  value={option.key}
                  checked={selectedOption === option.key}
                  onChange={handleOptionChange}
                />
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </div>
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
