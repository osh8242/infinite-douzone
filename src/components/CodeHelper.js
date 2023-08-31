/*
현소현

** 
const [modalState, setModalState] = useState({ show: false });     

<ModalComponent title= {state.codeHelperTableData.title} show={modalState.show} onHide={() => actions.setModalState({modalState, show: false })} size="lg" centered>
  <CodeHelpComponent onRowClick={() => actions.setModalState({modalState, show: false })} table={state.codeHelperTableData} setData={actions.setSearchCdDept} />
</ModalComponent> 

** props 
onRowClick : 보통 modal 닫는함수
table :
ex) 
state.codeHelperTableData = {
  title : '사원번호 조회',
  tableHeaders: [
      { field: "cdEmp", text: "사원번호"},
      { field: "nmEmp", text: "사원이름"}],
  tableData : [
      { pk:'Y701', name : '현소현'}, 
      { pk:'Y702', name : '오승환'}, 
      { pk:'Y703', name : '김진'}]
  },
setData: set함수


*/

import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import SearchPanel from './SearchPanel';
import TextBoxComponent from './TextBoxComponent';

const CodeHelpComponent = ({ onRowClick, table, setData }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (pk) => {
    setSelectedRow(pk);
    setData(pk);
    onRowClick();
  };

  const filteredData = table.tableData.filter((row) =>
    row.pk.includes(searchTerm)
  );

  return (
    <div className="container">
      <Form.Group>
        <SearchPanel>
          <TextBoxComponent 
            label={"코드검색"} 
            value={searchTerm} 
            onChange={setSearchTerm}
          />
        </SearchPanel>
      </Form.Group>
      <Table>
        <thead>
          <tr onClick={(e) => handleRowClick(e)}>
            {table.tableHeaders.map((header) => (
              <th key={header.field}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''} onClick={() => handleRowClick(row.pk)}>
              {Object.keys(row).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CodeHelpComponent;
