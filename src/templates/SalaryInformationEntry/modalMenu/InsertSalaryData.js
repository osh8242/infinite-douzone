import { Button } from "react-bootstrap";
import React from 'react';
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryData } from "../../../model/SalaryInformationEntry/SalConstant";

const InsertSalaryData = (props) => {
    const {
        insertSalaryTableData,
        actions
    } = props;
    
    console.log(insertSalaryTableData);
    return (
        <div>
            {/* <ButtonBox> */}
                <Button>수당등록</Button>
                <Button>공제등록</Button>
                <Button>비과세감면설정</Button>
            {/* </ButtonBox> */}
                <div className="tableData_container">
                    <TableForm
                        tableName="SI_INSERT_SALARY_ALLOW_DATA"
                        readOnly
                        showCheckbox
                        showHeaderArrow
                        tableHeaders={modal_insertSalaryData.headers}
                        tableData={insertSalaryTableData}
                        actions={{
                            setTableData: actions.setSaInfoListData,
                            setPkValue: actions.setChangeCdEmp,
                        }}
                    />
                </div>
                <div>
                    *월정액에 따른 수당등록
                </div>
        </div>
    )
};

export default InsertSalaryData;