import {
  faPlus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Form, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "../styles/tableForm.css";

const TableTemp = ({
  showCheckbox,
  showHeaderArrow,
  tableHeaders,
  tableData,
  pkValue,
  readOnly, // 테이블을 읽기전용으로
  actions, // state값을 바꾸기 위한 set함수들..
  rowAddable,
  minRow,
}) => {
  const tbodyRef = useRef();

  // 더블 클릭 시 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = (index) => {
    if (readOnly) return;
    if (index === tableData.length) {
      let newRow = pkValue || {};
      tableHeaders.forEach((item) => {
        newRow[item.field] = "";
      });
      newRow = actions.getRowObject ? actions.getRowObject(newRow) : newRow;
      newRow["isNew"] = true;
      tableData.push(newRow);
    }
    const newData = [...tableData];
    newData[index] = {
      ...newData[index],
      isEditable: true,
    };
    actions.setTableData(newData);
  };

  // 더블 클릭 후 편집한 데이터
  const handleKeyDown = (event, rowIndex) => {
    if (readOnly) return;
    if (event.key === "Enter") {
      event.preventDefault();

      // 현재 수정 중인 행의 모든 입력 필드를 가져옴
      const currentRowInputs =
        tbodyRef.current.children[rowIndex].querySelectorAll(
          'input[type="text"]'
        );

      let updatedRow = {
        ...tableData[rowIndex],
        isEditable: false,
        isNew: tableData[rowIndex].isNew,
      };

      // 각 입력 필드의 값을 updatedRow와 editedRow에 저장
      currentRowInputs.forEach((input, index) => {
        const field = tableHeaders[index].field;
        updatedRow.item[field] = input.value;
      });

      const newData = [...tableData];
      newData[rowIndex] = updatedRow;
      console.log("updatedRow", updatedRow);

      //수정된 행을 반영하여 tableData를 수정함
      actions.setTableData(newData);

      //수정된 행을 setState하여 update 요청을 보냄
      actions.setEditedRow(updatedRow.item);
    }
  };

  // editable row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = (e, rowIndex) => {
    //행 클릭시 해당 행의 첫번째 컬럼값으로 state값을 바꾸고 싶다면.. setPkValue
    if (actions.setPkValue && rowIndex < tableData.length) {
      let pkValue = {};
      tableHeaders.forEach((header) => {
        if (header.isPk)
          pkValue[header.field] = tableData[rowIndex].item[header.field];
      });
      actions.setPkValue(pkValue);
    }

    //수정중인 행의 index를 가져옴
    const editableRowIndex = getEditableRowIndex();
    console.log("editableRowIndex", editableRowIndex);

    //수정중인 행이 없다면 return
    if (editableRowIndex === -1) return;

    //수정중인 행과 클릭한 행이 다르다면 수정작업 해제
    if (editableRowIndex !== rowIndex) {
      const newData = [...tableData];
      // 수정중인 행이 추가하려던 행이라면 pop(), 존재하던 행이라면 수정상태 비활성화
      if (tableData[tableData.length - 1].isNew) newData.pop();
      else newData[editableRowIndex].isEditable = false;
      actions.setTableData(newData);
      return;
    }
  };

  // 전체체크 or 전체해제
  const handleAllCheckboxChange = () => {
    const isAllChecked = checkedBoxCounter() === tableData.length;
    const newData = tableData.map((row) => ({
      ...row,
      checked: !isAllChecked,
    }));
    actions.setTableData(newData);
  };

  // 각 행의 체크박스 체크 이벤트
  const handleCheckbox = (index) => {
    const newData = [...tableData];
    newData[index] = {
      ...newData[index],
      checked: !newData[index].checked,
    };
    actions.setTableData(newData);
  };

  // 정렬 화살표 기능.. 구현예정
  const handleArrowDirection = (columnName) => {};

  // 체크된 항목 계산함수
  const checkedBoxCounter = () => {
    const checkedBoxCount = tableData.reduce(
      (sum, item) => (item.checked ? sum + 1 : sum),
      0
    );
    return checkedBoxCount;
  };

  // 수정 중인 행의 index를 찾는 함수
  const getEditableRowIndex = () => {
    return tableData.findIndex((item) => item.isEditable);
  };

  return tableData ? (
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
            {tableHeaders.map((thead, index) => (
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
        <tbody ref={tbodyRef}>
          {tableData.map((row, rowIndex) => {
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
                {/* 각 row의 td */}
                {tableHeaders.map((thead, index) => (
                  <td key={index}>
                    <div id="tableContents">
                      {/* editable 상태인 경우 input 요소로 렌더링 */}
                      {row.isEditable && !thead.readOnly ? (
                        <Form.Control
                          type="text"
                          required={thead.required}
                          data-column={thead.field}
                          defaultValue={row.item[thead.field]}
                          onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                        />
                      ) : (
                        row.item[thead.field]
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
          {/* 행추가가 가능한 rowAddable 옵션이 true 인 경우 */}
          {rowAddable && (
            <tr
              onDoubleClick={() => handleDoubleClick(tableData.length)}
              onClick={(e) => handleRowClick(e, tableData.length)}
            >
              {showCheckbox && (
                <td>
                  <FontAwesomeIcon icon={faPlus} />
                </td>
              )}
              {tableHeaders.map((thead, index) => (
                <td key={index} style={{ color: "transparent" }}>
                  <div id="tableContents">.</div>
                </td>
              ))}
            </tr>
          )}

          {/* 빈 행 */}
          {minRow &&
            Array(Math.max(minRow - tableData.length, 0))
              .fill(null)
              .map((_, index) => (
                <tr key={index}>
                  <td
                    colSpan={
                      showCheckbox
                        ? tableHeaders.length + 1
                        : tableHeaders.length
                    }
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
