import React from 'react';
import { Row } from 'react-bootstrap';
import TableForm from '../../../components/TableForm';
import { salEmp } from '../../../model/SalaryInformationEntry/SalConstant';

const EmpList = (props) => {
    const {
      saInfoListData
      , actions
    } = props;

    return (
        <div>
            <div className="table-container">
              <Row>
                  <TableForm
                    tableName="SI_EMPLIST"
                    readOnly
                    showCheckbox
                    showHeaderArrow
                    tableHeaders={salEmp.headers}
                    tableData={saInfoListData}
                    onRowClick={(e,row)=>{
                      actions.setChangeCdEmp(row["cdEmp"])
                    }}
                  />
              </Row>
              <Row className="table-footer">
                <TableForm
                  tableFooter={(
                    <>
                      <tr>
                        <th>인원(퇴직)</th> 
                        <th>0(0)</th>
                      </tr>
                    </>
                  )}/>
              </Row>
            </div>
        </div>
    );
};

export default EmpList;