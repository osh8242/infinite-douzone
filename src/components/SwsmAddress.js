// import React, { useState, useEffect } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import ModalComponent from "./ModalComponent";
// import Post from "./Post";
// import "../styles/addressForm.css";

// const SwsmAddress = (props) => {
//   const { label, isZonecode, value, value2, actions } = props;
//   const [zonecode, setZonecode] = useState("");
//   const [address, setAddress] = useState("");
//   const [inputValue, setInputValue] = useState(value);
//   const [inputDetailValue, setInputDetailValue] = useState(value2);

//   useEffect(() => {
//     setInputValue(props.value);
//     setInputDetailValue(props.value2);
//   }, [value, value2]);
//   useEffect(() => {
//     const newData = {
//       address: inputValue,
//     };
//     actions.setEdited(newData);
//   }, [inputValue]);

//   // 선택된 주소를 주소 필드에 업데이트
//   const handleAddressSelected = ({ address, zonecode }) => {
//     const newData = {
//       address: inputValue,
//     };
//     setInputValue(address);
//     actions.setEdited(newData);
//     setAddress(address);
//     setZonecode(zonecode);
//     setModalState({ ...modalState, show: false });
//   };
//   const handleInputValueChange = (event) => {
//     console.log("onChange :" + event.target.value);
//     setInputValue(event.target.value);
//   };
//   const handleInputDetailValueChange = (event) => {
//     console.log("onChange :" + event.target.value);
//     setInputDetailValue(event.target.value);
//   };
//   const handleFocusOut = (event) => {
//     const newData = {
//       addDetail: inputDetailValue,
//     };

//     actions.setEdited(newData);
//   };

//   const [modalState, setModalState] = useState({
//     show: false,
//     props: {},
//   });

//   return (
//     <>
//       <Row className="py-1">
//         <Col
//           md="2"
//           className="d-flex align-items-center justify-content-center"
//         >
//           <div>{label}</div>
//         </Col>
//         <Col md="8" id="fullAddressArea">
//           {/* 우편번호 */}
//           {isZonecode && (
//             <Form.Control
//               id="zoneCodeArea"
//               type="text"
//               name="zonecode"
//               value={zonecode}
//             />
//           )}

//           <Row>
//             {/* 주소 */}
//             <Col md="10">
//               <Form.Control
//                 id="addressArea"
//                 type="text"
//                 name="address"
//                 value={inputValue}
//                 onChange={handleInputValueChange}
//                 onBlur={handleFocusOut}
//               />
//             </Col>

//             {/* 버튼 클릭 시 Post 모달 호출 */}
//             <Col md="2">
//               <Button
//                 id="addressSearchBtn"
//                 variant="secondary"
//                 onClick={() => setModalState({ ...modalState, show: true })}
//               >
//                 검색
//               </Button>
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       {/* 상세주소 */}
//       <Row className="py-1">
//         <Col
//           md="2"
//           className="d-flex align-items-center justify-content-center"
//         >
//           <div>상세주소</div>
//         </Col>
//         <Col md="8">
//           <Form.Control
//             type="text"
//             name="address-detail"
//             value={inputDetailValue}
//             onChange={handleInputDetailValueChange}
//             onBlur={handleFocusOut}
//           />
//         </Col>
//       </Row>

//       <ModalComponent
//         size="lg"
//         show={modalState.show}
//         onHide={() => setModalState({ ...modalState, show: false })}
//         {...modalState.props}
//       >
//         <Post onAddressSelected={handleAddressSelected} />
//       </ModalComponent>
//     </>
//   );
// };

// export default SwsmAddress;
