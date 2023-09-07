import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SwsmConstant from "../model/SwsmConstant";
import LaborContractModel from "../model/LaborContractModel";
import LaborContractSearch from "./LaborContractSearch";
import LaborContract from "./LaborContract";
import LaborContractHeader from "./LaborContractHeader";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { Outlet } from "react-router-dom";
const TestRoute = () => {
  // const {
  //   mainTabMenuList, // 전체 구분 목록
  //   subTabMenuList, // 메뉴 구분 목록
  //   incomeClassficationList, // 상단 조회 - 소득구분 목록
  //   SwsmLeftTableHeaders,
  //   SwsmSubTabHeaders,
  //   labels, //
  //   salaryTypeList,
  //   otherBenefitStatusList,
  //   bonusPaymentStatusList,
  //   salaryPaymentDateTypeList,
  //   paymentMethodList,
  //   empInsuranceList,
  //   compensationInsuranceList,
  //   healthInsuranceList,
  // } = SwsmConstant();

  // const { state, actions, mainTablePkValue } = LaborContractModel();
  // const navigate = useNavigate();

  // const handlerMainTab = (e) => {
  //   // 탭에 따라 다른 경로로 이동
  //   switch (e.target.value) {
  //     case "탭1":
  //       navigate("/path-for-tab1");
  //       break;
  //     case "탭2":
  //       navigate("/path-for-tab2");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // return (
  //   <>
  //     <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
  //     <Container fluid>
  //       <MenuTab menuList={mainTabMenuList} onChange={handlerMainTab} />
  //       <Router>
  //         {/* <Switch> */}
  //         <Route exact path="/" component={LaborContractSearch} />
  //         <Route path="/search" component={LaborContractSearch} />
  //         <Route path="/edit" component={LaborContract} />
  //         {/* </Switch> */}
  //       </Router>
  //     </Container>
  //   </>
  // );

  // return (
  //   <div>
  //     <h3>사용자 목록</h3>
  //     <ul>
  //       <li>
  //         <Link to="/profiles/ycLee">ycLee</Link>
  //       </li>
  //       <li>
  //         <Link to="/profiles/gildong">gildong</Link>
  //       </li>
  //     </ul>
  //     <Routes>
  //       <Route path="/*" element={<div>유저를 선택해주세요.</div>} />
  //       <Route path=":username" element={<LaborContract />} />
  //     </Routes>
  //   </div>
  // );

  return (
    <div>
      <div>
        <h2> 페이지입니다.</h2>
        <p> 뜻</p>
      </div>
      <Outlet />
    </div>
  );
};

export default TestRoute;
