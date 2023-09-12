// // 작성자 : 오승환
// // SelectForm 사용시 필수 parameter
// // label : 라벨이름
// // optionList : 선택옵션명 (리스트)

// // 사용예시
// /*
//   <SelectForm label="구분" optionList=[
//     {key : "empName",   value : "사원명"},
//     {key : "birthDate", value : "생년월일"},
//     {key : "age",       value : "나이"}
//   ]/>
// */
// import { useEffect, useState, useRef } from "react";
// import { Col, Row } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import TextBoxComponent from "./TextBoxComponent";
// import TempText from "./TempText";

// function TempSelect({
//   label,
//   labelKey,
//   optionList,
//   subLabel,
//   subValue,
//   actions,
// }) {
//   const [inputValue, setInputValue] = useState(subValue);

//   useEffect(() => {
//     setInputValue(subValue);
//   }, [subValue]);

//   const handleInputValueChange = (e) => {
//     console.log("handleInputValueChange: ");
//     console.log(e.target.value);
//     setInputValue(e.target.value);
//   };

//   const handleFocusOutChange = (e) => {
//     console.log("out");
//     const newData = {
//       [labelKey]: inputValue,
//     };

//     actions.setEdited(newData);
//   };

//   return (
//     <Row className="py-1">
//       <Col md="4" className="d-flex align-items-center justify-content-center">
//         {label}
//       </Col>
//       <Col md="8" id="fullAddressArea">
//         <Col
//           md="15"
//           className="d-flex align-items-center justify-content-center"
//         >
//           {/* <Form.Select>
//             {optionList.map((option, index) => (
//               <option value={option.key} key={index}>
//                 {option.value}
//               </option>
//             ))}
//           </Form.Select>
//         </Col>
//         <Col
//           md="6"
//           className="d-flex align-items-center justify-content-center"
//         > */}
//           <Form.Select>
//             {optionList.map((option, index) => (
//               <option value={option.key} key={index}>
//                 {option.value}
//               </option>
//             ))}
//           </Form.Select>
//           <Col md="6">
//             <Form.Control
//               id="TextArea"
//               type="text"
//               value={inputValue}
//               onChange={handleInputValueChange}
//               onBlur={handleFocusOutChange}
//             />
//           </Col>
//           {/* <Form.Control
//             id="TextArea"
//             type="text"
//             value={inputValue}
//             onChange={handleInputValueChange}
//             onBlur={handleFocusOutChange}
//           /> */}
//           <Col
//             md="1"
//             className="d-flex align-items-center justify-content-center"
//           >
//             {subLabel}
//           </Col>
//         </Col>
//       </Col>
//     </Row>
//   );
// }

// export default TempSelect;
