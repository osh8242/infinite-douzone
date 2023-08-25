/*
  작성자 : 김진
  
  parameter : showCheckbox, showHeaderArrow, tableData

  showCheckbox : true 일 경우 체크박스 생성, false 체크박스 제거
  showHeaderArrow : true 일 경우 table header 에 arrow icon 생성, false arrow icon 제거
  tableData : table 로 만들 데이터
*/

import React, { useCallback, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import "../styles/tableForm.css";

const TableTemp = ({
  showCheckbox,
  showHeaderArrow,
  header,
  tableData,
  setTableData,
  rowClickHandler,
  minRow,
}) => {
  // 더블 클릭 시 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = (index) => {
    const newData = [...tableData];
    newData[index] = {
      ...newData[index],
      isEditable: true,
    };
    setTableData(newData);
  };

  // //////////////////////////////////////////////////////////////// 더블 클릭 후 편집한 데이터 -> DB 연결 이후 실반영되도록 수정 예정
  const handleInputChange = (event, rowIndex, columnName) => {};

  //수정 중인 행 index

  // editable row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = (e, rowIndex) => {
    const editableRowIndex = getEditableRowIndex();

    if (editableRowIndex !== rowIndex) {
      const newData = [...tableData];
      newData[editableRowIndex] = {
        ...newData[editableRowIndex],
        isEditable: false,
      };
      setTableData(newData);
      let index = showCheckbox ? 1 : 0;
      let id = e.currentTarget.children[index].children[0].textContent;
      if (rowClickHandler) rowClickHandler(id);
    }
  };

  // handle all check
  const handleAllCheckboxChange = () => {
    const isAllChecked = checkedBoxCounter() === tableData.length;
    const newData = tableData.map((row) => ({
      ...row,
      checked: !isAllChecked,
    }));
    setTableData(newData);
  };

  // handle check
  const handleCheckbox = (index) => {
    const newData = [...tableData];
    newData[index] = {
      ...newData[index],
      checked: !newData[index].checked,
    };
    setTableData(newData);
  };

  // handle table arrow -> DB 연결 이후 order by parameter 변경하여 주도록 수정 예정
  const handleArrowDirection = (columnName) => {};

  const checkedBoxCounter = () => {
    const checkedBoxCount = tableData.reduce(
      (sum, item) => (item.checked ? sum + 1 : sum),
      0
    );
    return checkedBoxCount;
  };

  const getEditableRowIndex = () => {
    return tableData.findIndex((item) => item.isEditable);
  };

  return tableData?.length > 0 ? (
    <>
      <Table size="sm" bordered hover>
        {/* header */}
        <thead>
          <tr>
            {/* checkBox 상단 아이콘 */}
            {showCheckbox && (
              <th id="tableCheckBoxHeader">
                <input
                  type="checkbox"
                  onChange={() => handleAllCheckboxChange()}
                  checked={checkedBoxCounter() === tableData.length}
                />
              </th>
            )}
            {/* th columns */}
            {header.map((thead, index) => (
              <th id="tableHeader" key={index}>
                <div onClick={() => handleArrowDirection(thead)}>
                  <div>{thead.text}</div>
                  <div id="tableHeader-arrow">
                    {thead.orderBy === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* content */}
        <tbody>
          {tableData.map((row, rowIndex) => {
            console.log("랜더!!");
            return (
              <tr
                key={rowIndex}
                onDoubleClick={() => handleDoubleClick(rowIndex)}
                onClick={(e) => handleRowClick(e, rowIndex)}
              >
                {/* 각 row 의 checkBox */}
                {showCheckbox && (
                  <td>
                    <div id="tableCheckBoxArea">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckbox(rowIndex)}
                      />
                    </div>
                  </td>
                )}
                {/* 각 row 의 content */}
                {header.map((thead, index) => (
                  <td key={index}>
                    <div id="tableContents">
                      {/* editable 상태인 경우 input 요소로 렌더링 */}
                      {row.isEditable ? (
                        <Form.Control
                          type="text"
                          value={row.item[thead.text]}
                        />
                      ) : (
                        row.item[thead.text]
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
          {/* 빈 행 */}
          {minRow &&
            Array(Math.max(minRow - tableData.length, 0))
              .fill(null)
              .map((_, index) => (
                <tr key={index}>
                  <td
                    colSpan={showCheckbox ? header.length + 1 : header.length}
                    style={{ color: "transparent" }}
                  >
                    .
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableTemp;
