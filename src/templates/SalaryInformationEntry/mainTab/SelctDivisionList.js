import React from "react";
import { Col, Row } from "react-bootstrap";
import SelectForm from "../../../components/SelectForm";
import { LABELS } from "../../../model/CommonConstant";
import {
  salAllowSum,
  salDeductSum,
  sumAllowPay,
  sumDeductPay,
  totalSalaryByPeriodOption,
} from "../../../model/SalaryInformationEntry/SalConstant";
import TableForm from "../../../components/TableForm";
import "../../../styles/HrManagement/HrManagementLayout.scss";

const SelctDivisionList = (props) => {
  const { state, actions } = props;
  return (
    <div>
      <SelectForm
        label={LABELS.inquiryYype}
        optionList={totalSalaryByPeriodOption}
        onChange={actions.getSalTotalSum}
      />
      <Row>
          <div className="hr-leftTable" style={{height: '25vh'}}>
            <TableForm
              tableHeaders={salAllowSum.headers}
              tableData={state.salPaySumData.allowPay}
              actions={{}}
              readOnly
            />
          </div>
          <div className="hr-leftTable" style={{height: '7vh'}}>
            <TableForm
              tableHeaders={sumAllowPay.headers}
              tableData={[]}
              readOnly
            />
          </div>
      </Row>
      <Row>
        <div className="hr-leftTable" style={{height: '25vh'}}>
          <TableForm
            tableHeaders={salDeductSum.headers}
            tableData={state.salPaySumData.deductPay}
            actions={{}}
            readOnly
          />
        </div>
        <div className="hr-leftTable" style={{height: '7vh'}}>
            <TableForm
              tableHeaders={sumDeductPay.headers}
              tableData={[]}
              readOnly
            />
          </div>
      </Row> 
    </div>
  );
};

export default SelctDivisionList;
