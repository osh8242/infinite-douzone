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
import "../../../styles/fonts.css";

const SelctDivisionList = (props) => {
  const { state, actions } = props;
  return (
    <div className="deleteLabelBackground p-10">
      <SelectForm
        label={LABELS.inquiryYype}
        optionList={totalSalaryByPeriodOption}
        onChange={(e, value) => actions.getSalTotalSum(value)}
      />
      <div style={{ marginBottom: "3px"}}>
        <Row>
          <div className="hr-leftTable" style={{ height: "24vh" , marginBottom: "-18px"}}>
            <TableForm
              tableHeaders={salAllowSum.headers}
              tableData={state.salPaySumData.allowPay}
              actions={{}}
              readOnly
            />
          </div>
            <TableForm
              tableHeaders={sumAllowPay.headers}
              tableData={state.salPaySumData.totalAllowPay}
              readOnly
            />
        </Row>
      </div>

      <Row>
        <div className="hr-leftTable" style={{ height: "24vh" , marginBottom: "-18px"}}>
          <TableForm
            tableHeaders={salDeductSum.headers}
            tableData={state.salPaySumData.deductPay}
            actions={{}}
            readOnly
          />
        </div>
          <TableForm
            tableHeaders={sumDeductPay.headers}
            tableData={state.salPaySumData.totalDeductPay}
            readOnly
          />
      </Row>
    </div>
  );
};

export default SelctDivisionList;
