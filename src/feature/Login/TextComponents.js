// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Col, Form, Row } from "react-bootstrap";
// import { updateId, updatePwd } from "./actionCreators";

// const TextComponent = ({
//   type,
//   label,
//   size,
//   md = 4,
//   placeholder,
//   height = 3,
//   name,
// }) => {
//   const id = useSelector((state) => state.login.id);
//   const pwd = useSelector((state) => state.login.pwd);
//   const dispatch = useDispatch();

//   const handleChange = (name, value) => {
//     if (name === "id") {
//       dispatch(updateId(value));
//     } else if (name === "pwd") {
//       dispatch(updatePwd(value));
//     }
//   };

//   const inputValue = name === "id" ? id : pwd;

//   return (
//     <Row className="justify-content-center mb-4">
//       <Col md="8">
//         <Form.Control
//           type={type}
//           size={size}
//           value={inputValue}
//           onChange={(e) => handleChange(name, e.target.value)}
//           placeholder={placeholder ? placeholder : undefined}
//         />
//       </Col>
//     </Row>
//   );
// };

// export default TextComponent;
