// import { useNavigate } from "react-router-dom";
// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Col, Row, Container } from "react-bootstrap";
// import MenuTab from "../components/MenuTab";
// import SearchPanel from "../components/SearchPanel";
// import DateTest from "../components/DateTest";
// import SelectForm from "../components/SelectForm";
// import SwsmConstant from "../model/SwsmConstant";
// // import TableTemp from "../components/TableTemp";
// import LaborContractModel from "../model/LaborContractModel";
// import Swsm from "../vo/SwsmGrid/Swsm";
// import SwsmOther from "../vo/SwsmGrid/SwsmOther";
// import { Scrollbars } from "react-custom-scrollbars";
// // import TempAdd from "../components/TempAdd";
// import SwsmAddress from "../components/SwsmAddress";
// // import TempText from "../components/TempText";
// import SwsmText from "../components/SwsmText";
// import Spinner from "react-bootstrap/Spinner";
// import TempSelect from "../components/TempSelect";
// import LaborContractSearch from "./LaborContractSearch";
// import LaborContract from "./LaborContract";
// import LaborContractHeader from "./LaborContractHeader";
// // import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { Switch } from "react-router";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import TableForm from "../components/TableForm";

// const TestRoute = () => {
//   const {
//     mainTabMenuList, // 전체 구분 목록
//     subTabMenuList, // 메뉴 구분 목록
//     incomeClassficationList, // 상단 조회 - 소득구분 목록
//     SwsmLeftTableHeaders,
//     SwsmSubTabHeaders,
//     labels, //
//     salaryTypeList,
//     otherBenefitStatusList,
//     bonusPaymentStatusList,
//     salaryPaymentDateTypeList,
//     paymentMethodList,
//     empInsuranceList,
//     compensationInsuranceList,
//     healthInsuranceList,
//   } = SwsmConstant();

//   const { state, actions, mainTablePkValue } = LaborContractModel();
//   const navigate = useNavigate();

//   const handlerMainTab = (e) => {
//     // 탭에 따라 다른 경로로 이동
//     switch (e.target.value) {
//       case "탭1":
//         navigate("/path-for-tab1");
//         break;
//       case "탭2":
//         navigate("/path-for-tab2");
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
//       <Container fluid>
//         <MenuTab menuList={mainTabMenuList} onChange={handlerMainTab} />
//         <Routes>
//           <Route path="/path-for-tab1" element={<LaborContract />} />
//           <Route path="/path-for-tab2" element={<LaborContractSearch />} />
//         </Routes>
//       </Container>
//     </>
//   );
// };

// export default TestRoute();
