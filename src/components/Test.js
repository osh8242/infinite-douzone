// import React, { useState } from 'react';
// import moment from 'moment'; // moment 라이브러리 import
// import { Form, Row, Col, Button } from 'react-bootstrap'; // react-bootstrap 컴포넌트들 import

// const UserProfile = ({ user }) => {
//   const [editable, setEditable] = useState(false);
//   const [name, setName] = useState(user.name);
//   const [dob, setDob] = useState(user.dob);

//   const dateFromDateString = (dateString) => {
//     return moment(new Date(dateString)).format('YYYY-MM-DDT00:00:00.000');
//   };

//   const dateForPicker = (dateString) => {
//     return moment(new Date(dateString)).format('YYYY-MM-DD');
//   };

//   const calculateAge = (date) => {
//     return moment().diff(date, 'years', false);
//   };

//   const toggleEditable = () => {
//     setEditable(!editable);
//   };

//   const saveChanges = () => {
//     // 여기에 변경 사항을 저장하는 로직을 추가하세요.
//     toggleEditable();
//   };

//   return (
//     <Form className="personalInfo">
//       {editable ? (
//         <Form.Group as={Row} className="mb-3 align-items-center" controlId="dobInput">
//           <Form.Label column lg={4}>
//             Date of Birth:
//           </Form.Label>
//           <Col>
//             <Form.Control
//               type="date"
//               value={dateForPicker(dob)}
//               placeholder={dob ? dateForPicker(dob) : 'dd/mm/yyyy'}
//               onChange={(e) => setDob(dateFromDateString(e.target.value))}
//             />
//           </Col>
//         </Form.Group>
//       ) : (
//         <Form.Group as={Row} className="mb-3 align-items-center" controlId="ageDisplay">
//           <Form.Label column id="ageLabel" lg={4}>
//             Age:
//           </Form.Label>
//           <Col>
//             <Form.Control type="text" readOnly value={calculateAge(dateFromDateString(user.dob))} />
//           </Col>
//         </Form.Group>
//       )}

//       <Form.Group as={Row} className="d-flex justify-content-end" controlId="nameInput">
//         <Button
//           variant="outline-dark"
//           size="sm"
//           className="w-25 mx-2"
//           id="profileSubmitBtn"
//           onClick={editable ? saveChanges : toggleEditable}
//         >
//           {editable ? 'Save' : 'Update'}
//         </Button>
//       </Form.Group>
//     </Form>
//   );
// };

// export default UserProfile;
