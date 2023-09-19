// import React, { useState } from "react";

// import TextComponent from "../Login/TextComponents";
// import { Row, Col, Button, Container } from "react-bootstrap";
// import imgLogo from "../../../src/styles/img/wehago_logo.png";
// import { connect } from "react-redux";
// import { loginUser } from "./useLoginModel";

// const LoginLayout = ({ loginUser }) => {
//   const [userId, setUserId] = useState("");
//   const [userPwd, setUserPwd] = useState("");

//   const handleLogin = () => {
//     const credentials = {
//       id: userId,
//       pwd: userPwd,
//     };
//     loginUser(credentials);
//   };

//   return (
//     <Container
//       className="d-flex justify-content-center align-items-center"
//       style={{ height: "80vh" }}
//     >
//       <Col md="7" className="px-5">
//         <Row className="justify-content-center mb-4">
//           <img
//             src={imgLogo}
//             alt="Logo"
//             style={{ width: "500px", padding: "70px 0px 15px 0px" }}
//           />
//           <h2
//             style={{
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             로그인
//           </h2>
//         </Row>
//         <Row className="justify-content-center mb-4">
//           <Col md="8">아이디</Col>
//           <TextComponent
//             name="userId"
//             type="text"
//             label="ID"
//             placeholder="ID"
//             height={45}
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//         </Row>
//         <Row className="justify-content-center mb-4">
//           <Col md="8">비밀번호 </Col>
//           <TextComponent
//             name="userPwd"
//             type="password"
//             label="Password"
//             placeholder="영문, 숫자를 포함하여 8자 이상 입력하세요."
//             height={45}
//             value={userPwd}
//             onChange={(e) => setUserPwd(e.target.value)}
//           />
//         </Row>
//         <Row className="justify-content-center mb-4">
//           <Col md="10" className="d-flex flex-column align-items-center">
//             <Button
//               className="btn-custom"
//               style={{
//                 marginTop: "40px",
//                 padding: "10px 40px",
//                 fontSize: "16px",
//                 width: "85%",
//                 borderRadius: "15px",
//               }}
//               onClick={handleLogin}
//             >
//               로그인
//             </Button>
//             <Button
//               className="btn-custom"
//               style={{
//                 marginTop: "10px",
//                 padding: "0px 40px",
//                 fontSize: "16px",
//                 width: "85%",
//                 borderRadius: "15px",
//                 color: "darkblue",
//                 backgroundColor: "white",
//                 border: "none",
//               }}
//             >
//               회원가입
//             </Button>
//           </Col>
//         </Row>
//       </Col>
//     </Container>
//   );
// };

// const mapDispatchToProps = (dispatch) => ({
//   loginUser: (credentials) => dispatch(loginUser(credentials)),
// });

// export default connect(null, mapDispatchToProps)(LoginLayout);
