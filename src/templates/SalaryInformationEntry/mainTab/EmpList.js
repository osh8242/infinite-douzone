import React from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salEmp } from "../../../model/SalaryInformationEntry/SalConstant";
import { leftStaticsTableConstant } from "../../../model/HrManagement/HrManagementConstant";
import "../../../styles/HrManagement/HrManagementLayout.scss";
const EmpList = (props) => {
  const { saInfoListData, actions } = props;
  return (
    <div>
      <Row>
          <div className="hr-leftTable">
            <TableForm
              tableName="SI_EMPLIST"
              readOnly
              showCheckbox
              sortable
              tableHeaders={salEmp.headers}
              tableData={saInfoListData.saInfoListData}
              onRowClick={(e, row) => {
                actions.changeCdEmp(row["cdEmp"]);
              }}
              actions={{
                setPkValue : ()=>{},
                setSelectedRows: actions.setSelectedRows,
              }}
            />
          </div>
        </Row>
        {/* 통계 테이블 */}
        <Row className="mt-3">
          <TableForm
            tableName="EMPSTATICS"
            tableHeaders={leftStaticsTableConstant.headers}
            tableData={saInfoListData.salEmpListStaticsTableData}
            readOnly
          />
        </Row>
    </div>
  );
};

export default EmpList;
