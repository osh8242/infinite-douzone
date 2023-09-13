import React from 'react';

const ReCalculation = (props) => {
    const {
        data,
    } = props;

    return (
        <div>
           {/* <TableForm
                  tableName="SI_EMPLIST"
                  readOnly
                  showCheckbox
                  showHeaderArrow
                  tableHeaders={salEmp.headers}
                  tableData={state.saInfoListData}
                  actions={{
                    setTableData: actions.setSaInfoListData,
                    setPkValue: actions.setChangeCdEmp,
                  }}
                /> */}
            {data}
        </div>
    );
};

export default ReCalculation;