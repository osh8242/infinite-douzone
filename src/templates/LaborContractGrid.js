import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import LaborContractModel from "../model/LaborContractModel";
import LaborContractHeader from "./LaborContractHeader";
import LaborContractSearch from "./LaborContractSearch";
import LaborContract from "./LaborContract";
import SwsmConstant from "../model/SwsmConstant";
const LaborContractGrid = () => {
  const {
    mainTabMenuList, // 전체 구분 목록
  } = SwsmConstant();

  const { actions } = LaborContractModel();
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (k) => {
    const tabIndex = typeof k === "string" ? parseInt(k, 10) : k;
    setSelectedTab(tabIndex);
  };

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container fluid>
        <MenuTab
          menuList={mainTabMenuList}
          onSelect={handleTabClick}
          k={selectedTab}
        />
        {selectedTab === 0 && <LaborContract />}
        {selectedTab === 1 && <LaborContractSearch />}
      </Container>
    </>
  );
};

export default LaborContractGrid;
