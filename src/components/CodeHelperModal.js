/* 현소현  코드도움창 */
import "../styles/CodeHelper.scss";

import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import TextBoxComponent from "./TextBoxComponent";

import PropTypes from "prop-types";
import TableForm from "./TableForm";
import {LABELS} from "../model/CommonConstant";

function CodeHelperModal(props) {
  const {
    onHide,
    setRowData, // [필수] 객체 반환 받을 set함수
    onConfirm, // [선택] 확인버튼
    tableHeaders,
    tableData,
    usePk, // [선택] rowData에서 특정 필드값을 set할거면 usePk='칼럼명' 설정... row(객체 전체)를 set할거면 false
    searchField,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [oriData, setOriData] = useState(tableData);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setOriData(tableData);
    setFilteredData(tableData);
  }, [tableData]);

  // table.searchField에 해당하는 field만 검색
  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredData(
        oriData.filter((row) => {
          return searchField.some((field) =>
            row.item[field].toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredData(oriData);
    }
  }, [searchTerm]);

  // 클릭한 행반환
  const handleRowClick = (row) => {
    setSearchTerm("");
    if (setRowData) usePk ? setRowData(row[usePk]) : setRowData(row)
    setFilteredData([]);
    setOriData([]);
    onHide();
  };

  return (
    <>
        <div>
          <Row className="table-wrapper">
            <TableForm
              readOnly
              tableHeaders={tableHeaders}
              tableData={filteredData}
              onRowClick={handleRowClick}
            />
          </Row>
          <Row>
            <Form.Group>
              <TextBoxComponent
                type="text"
                label={LABELS.searchText}
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </Form.Group>
          </Row>
        </div>
   </>
  );
}

CodeHelperModal.defaultProps = {
  tableHeaders: [],
  tableData: [{ item: {} }],
  subject: "",
  searchField: [],
};

CodeHelperModal.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.object.isRequired,
    })
  ).isRequired,
  subject: PropTypes.string,
  searchField: PropTypes.arrayOf(PropTypes.string),
};

export default CodeHelperModal;
