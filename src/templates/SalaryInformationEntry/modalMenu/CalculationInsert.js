import React from 'react';
import TableForm from '../../../components/TableForm';
import { modal_calculationModal } from '../../../model/SalaryInformationEntry/SalConstant';
import { Container } from 'react-bootstrap';

const CalculationInsert = (props) => {
    const {
        insertSalaryTableData,
        actions,        
    } = props;

    return (
        <div>
            <p>수당/공제 등록의 산출식을 불러오며 수당의 산출식이 다른 경우 직접입력합니다.</p>
            <div style={{padding: '30px', border: '1px solid silver', borderRadius: '4px'}}>
                * 수당등록 산출식
                <TableForm
                    tableName="SI_INSERT_SALARY_ALLOW_DATA"
                    readOnly
                    showCheckbox
                    showHeaderArrow
                    tableHeaders={modal_calculationModal.headers}
                    tableData={insertSalaryTableData}
                    actions={{
                        setTableData: actions.setSaInfoListData,
                        setPkValue: actions.setChangeCdEmp,
                    }}
                />
            </div>
        </div>
    );
};

export default CalculationInsert;