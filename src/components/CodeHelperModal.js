/* 현소현
  `<CodeHelperModal
    show = {state.modalState.show}   
    onHide = {() => actions.setModalState({ ...state.modalState, show: false })} 
    onConfirm = {() => alert('확인')}
    setLowData = {actions.setAddRow}
    tableData = {setTableData()}
  />`
 */

import React, {useEffect, useState } from "react";
import { Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextBoxComponent from "./TextBoxComponent";
import ModalModel from "../model/ModalModel";

function CodeHelperModal(props) {
  const {
    show,
    onHide,
    onConfirm,
    onRowClick,
    setLowData,

    table,
    emplist,
    params,
    headers,

  } = props;

  const { state, actions } =  ModalModel();
  //const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  
  useEffect(() => {
    if (emplist) {
      actions.setParams(params);
      actions.setHeaders(headers);
    } else {
      actions.setTableData(table);
    }
  }, [emplist, params, table]);

  /* 클릭한 행반환 */
  const handleRowClick = (row) => {
    //console.log(row);
    //setSelectedRow(row.pk);
    setLowData&&setLowData(row);
    onRowClick&&onRowClick();
  };

  /* table.searchField에 해당하는 field만 검색 */
  const filteredData = state.tableData.tableData.filter((row) =>
    state.tableData.searchField.some((field) =>
        row[field].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Modal show={show} size='lg' centered>
      <Modal.Header>
        <Modal.Title>{state.tableData.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div className="container">
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr onClick={(e) => handleRowClick(e)}>
                {state.tableData.tableHeaders.map((header) => (
                  <th key={header.field}>{header.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                //<tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''} onClick={() => handleRowClick(row)}>
                <tr key={row.pk} onClick={() => handleRowClick(row)}>
                  {state.tableData.tableHeaders.map((header) => (
                    <td key={header.field}>{row[header.field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Form.Group>
            <TextBoxComponent label={'찾을내용'} value={searchTerm} onChange={setSearchTerm}/>
          </Form.Group>
        </Row>
      </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>닫기</Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CodeHelperModal;
