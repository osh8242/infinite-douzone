/* 현소현

  ex)
  <CodeHelperModal
    show = {state.modalState.show}   
    onHide = {() => actions.setModalState({ ...state.modalState, show: false })} 
    onConfirm = {() => alert('확인')}
    apiFlag = {true} or {false}
    setRowData = {actions.setAddRow}
    usePk = {''}
    tableData = {setTableData()}
  />
  
 */

import React, {useEffect, useState } from "react";
import { Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextBoxComponent from "./TextBoxComponent";
import CodeHelperModalModel from "./CodeHelperModalModel";

function CodeHelperModal(props) {
  const {
    show,           // [필수] 모달창 열기 modalstate -> true
    onHide,         // [필수] 모달창 닫기 modalstate -> false
    onConfirm,      // [선택] 
    onRowClick,     // [선택]

    setRowData,     // [필수] 객체 반환 받을 set함수 
    usePk,          // [선택] rowData에서 특정 필드값을 set할거면 usePk='칼럼명' 설정... row(객체 전체)를 set할거면 false

    // [apiFlag, codeHelperCode]나 codeHelperCodes중 둘중 하나는 반드시 사용해야함
    apiFlag,        // [선택] api 쏠때 true
    codeHelperCode, // [apiFlag = true일때 필수] 관리 편리성 위해 url, pacodeHelperCode를 미리 만들어두기

    table,          // [선택] api 안쏠때 프런트에 저장되어있는 tabledata를 이용해서 형식에 맞게 만들어둔  
  } = props;

  const { state, actions } =  CodeHelperModalModel();
  const [searchTerm, setSearchTerm] = useState('');
  const [oriData, setOriData] = useState([]);
  const [filteredData, setFilteredData ] = useState([]);

  useEffect(() => {
    if (apiFlag) {
      codeHelperCode && actions.setCodeHelperCode(codeHelperCode);
    } else {
      table && actions.setTModalData(table);
    } 
    setOriData(state.modalData.tableData);
    setFilteredData(state.modalData.tableData);
  }, [apiFlag, codeHelperCode, table, show, state.modalData.tableData]);
  
 
  /* table.searchField에 해당하는 field만 검색 */
  useEffect(()=>{
    if(searchTerm !== ''){
      setFilteredData(oriData.filter((row)=>{
          return state.modalData.searchField.some((field) =>
            row[field].toLowerCase().includes(searchTerm.toLowerCase()) 
          )
        })
      );
    }else{
      setFilteredData(oriData);
    }   
  },[searchTerm]);


  /* 클릭한 행반환 */
  const handleRowClick = (row) => {
    //console.log(row);
    setSearchTerm('');
    if(setRowData){ usePk ? setRowData(row[usePk]) : setRowData(row) }    
    onRowClick && onRowClick();
    onHide();
  };

  return (
    <Modal show={show} size='lg' centered>
      <Modal.Header>
        <Modal.Title>{state.modalData.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div className="container">
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr onClick={(e) => handleRowClick(e)}>
                {state.modalData.tableHeaders.map((header) => (
                  <th key={header.field}>{header.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                //<tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''} onClick={() => handleRowClick(row)}>
                <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                  {state.modalData.tableHeaders.map((header) => (
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
