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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { objectToQueryString } from "../utils/StringUtils";
import TextBoxComponent from "./TextBoxComponent";
import TableForm from "./TableForm";

function CodeHelperModal(props) {
  const {
    show, // [필수] 모달창 열기 modalstate -> true
    onHide, // [필수] 모달창 닫기 modalstate -> false
    onConfirm, // [선택]
    onRowClick, // [선택]

    setRowData, // [필수] 객체 반환 받을 set함수
    usePk, // [선택] rowData에서 특정 필드값을 set할거면 usePk='칼럼명' 설정... row(객체 전체)를 set할거면 false

    // [apiFlag, codeHelperCode]나 codeHelperCodes중 둘중 하나는 반드시 사용해야함
    apiFlag, // [선택] api 쏠때 true
    codeHelperCode, // [apiFlag = true일때 필수] 관리 편리성 위해 url, pacodeHelperCode를 미리 만들어두기

    table, // [선택] api 안쏠때 프런트에 저장되어있는 tabledata를 이용해서 형식에 맞게 만들어둔
  } = props;

  //const { state, actions } =  ModalModel();

  const [modalData, setTModalData] = useState({
    title: "",
    tableHeaders: [{ field: "codeId", text: "코드" }],
    // { field: "code", text: "Code"},
    // { field: "nmKrname", text: "사원명"},
    // { field: "noSocial", text: "주민(외국인)번호"},
    // { field: "daRetire", text: "퇴사일자"}],
    tableData: [],
    //searchField : ['pk'],
    searchField: ["codeId", "codeName"],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [oriData, setOriData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (apiFlag) {
      codeHelperCode && getCodeListForCodeHelper(codeHelperCode);
    } else {
      table && setTModalData(table);
    }
    setOriData(modalData.tableData);
    setFilteredData(modalData.tableData);
  }, [show]);

  const getCodeListForCodeHelper = (codeHelperCode) => {
    const url = "http://localhost:8888";

    if (codeHelperCode !== "") {
      axios
        .get(
          url + codeHelperCode.url + objectToQueryString(codeHelperCode.params),
          //{data : codeHelperCode.params},
          { "Content-Type": "application/json" }
        )
        .then((response) => {
          const codeDataList = response.data.map((object) => {
            const dynamicProperties = { item: {} };
            for (const key in object) {
              dynamicProperties.item[key] = object[key];
            }
            return dynamicProperties;
          });
          console.log("codeDataList", codeDataList);
          setTModalData({
            ...modalData,
            tableData: codeDataList,
            title: codeHelperCode.title,
            tableHeaders: codeHelperCode.headers,
            searchField: codeHelperCode.searchField,
          });
        })
        .catch((error) => {
          console.log("에러발생: ", error);
          // 에러 처리
        });
    }
  };

  /* table.searchField에 해당하는 field만 검색 */
  useEffect(() => {
    if (searchTerm !== "") {
      console.log("modalData", modalData);
      console.log("searchTerm", searchTerm);
      setFilteredData(
        oriData.filter((row) => {
          return modalData.searchField.some((field) =>
            row[field].toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredData(oriData);
    }
  }, [searchTerm]);

  /* 클릭한 행반환 */
  const handleRowClick = (row) => {
    setSearchTerm("");
    if (setRowData) {
      usePk ? setRowData(row[usePk]) : setRowData(row);
    }
    onRowClick && onRowClick();
    onHide();
  };

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Header>
        <Modal.Title>{modalData.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
          <Row>
            {/* <Table striped bordered hover>
              <thead>
                <tr onClick={(e) => handleRowClick(e)}>
                  {modalData.tableHeaders.map((header) => (
                    <th key={header.field}>{header.text}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  //<tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''} onClick={() => handleRowClick(row)}>
                  <tr key={rowIndex} onClick={() => handleRowClick(row)}>
                    {modalData.tableHeaders.map((header) => (
                      <td key={header.field}>{row[header.field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table> */}
            <TableForm
              tableHeaders={modalData.tableHeaders}
              tableData={filteredData}
              onRowClick={handleRowClick}
            />
          </Row>
          <Row>
            <Form.Group>
              <TextBoxComponent
                label={"찾을내용"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
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
