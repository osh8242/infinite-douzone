import React from "react";
import { Accordion } from "react-bootstrap";
import SiEmpDetail from "./SiEmpDetail";
import "../../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";

const RigtSideLayout = (props) => {
  const { state, actions } = props;
  return (
    <>
      <Accordion activeKey="0" flush>
        <Accordion.Item id="rightSideBackground" eventKey="0">
          <Accordion.Header>사원 상세정보</Accordion.Header>
          <Accordion.Body>
            {/* 사원 상세정보 영역 */}
            <SiEmpDetail
              actions={actions}
              siEmpDetailData={state.saInfoDetailData}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default RigtSideLayout;
