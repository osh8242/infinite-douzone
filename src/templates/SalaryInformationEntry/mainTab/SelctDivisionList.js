import React from "react";
import { Col, Row } from "react-bootstrap";
import SelectForm from "../../../components/SelectForm";
import { LABELS } from "../../../model/CommonConstant";
import {
  salAllowSum,
  salDeductSum,
  totalSalaryByPeriodOption,
} from "../../../model/SalaryInformationEntry/SalConstant";
import TableForm from "../../../components/TableForm";

const SelctDivisionList = (props) => {
  const { state, actions } = props;
  return (
    <div>
      <SelectForm
        label={LABELS.inquiryYype}
        optionList={totalSalaryByPeriodOption}
        onChange={actions.setSelectedOption}
      />
      <Row>
        <TableForm
          tableHeaders={salAllowSum.headers}
          tableData={state.salPaySumData.allowPay}
          actions={{}}
          readOnly
        />
      </Row>
      <Row>
        <TableForm
          tableHeaders={salDeductSum.headers}
          tableData={state.salPaySumData.deductPay}
          actions={{}}
          readOnly
        />
      </Row>
    </div>
  );
};

export default SelctDivisionList;
