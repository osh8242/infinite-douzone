import {
  faPlus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "../styles/tableForm.css";

const TableTemp = ({
  tableHeaders, // [필수]
  tableData, // [필수]

  actions, // [대부분의 경우 => 필수] state값을 바꾸기 위한 set함수들..
  // 예시)
  // actions={{
  //   setTableData: actions.setSubTableData, // 테이블을 수정하려면 필수
  //   setEditedRow: actions.setEditedEmpFam,
  //   getRowObject: EmpFam,
  // }}

  pkValue, // [선택] 현재 테이블의 pk값을 tableHeader나 tableData가 아닌 다른 곳에서 가져와야할 떄
  // 가령, 이 테이블이 sub테이블이라서 main테이블 pk를 가져와야할 때)
  showCheckbox, // [선택] 체크박스 유무
  showHeaderArrow, //
  readOnly, // [선택] 테이블을 읽기전용으로
  rowAddable, // [선택] 행 추가 가능여부
  minRow, // [선택] 테이블의 최소 행 갯수, 데이터가 부족해도 빈 행으로 추가한다. (구현부족)
}) => {
  const tbodyRef = useRef();

  const [recentlyClickedRow, setRecentlyClickedRow] = useState();

  // 테이블 내용이 바뀌면 최근클릭한 행의 인덱스 값 초기화
  useEffect(() => {
    setRecentlyClickedRow();
  }, [tableData]);

  // 수정 중인 행의 index를 찾는 함수
  const getEditableRowIndex = () => {
    return tableData.findIndex((item) => item.isEditable);
  };

  // 더블 클릭 시 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = useCallback(
    (rowIndex, field) => {
      if (readOnly) return;
      if (rowIndex === tableData.length) {
        let newRow = pkValue || {};
        newRow = actions.getRowObject ? actions.getRowObject(newRow) : newRow;
        newRow["isNew"] = true;
        console.log("newRow", newRow);
        tableData.push(newRow);
      }

      const newData = [...tableData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        isEditable: true,
      };
      newData[rowIndex]["focusOn"] = field;
      console.log("newData", newData);
      actions.setTableData(newData);
    },
    [tableData, pkValue]
  );

  // 더블 클릭 후 편집한 데이터
  const handleKeyDown = useCallback(
    (event, rowIndex) => {
      if (readOnly) return;
      if (event.key === "Enter") {
        event.preventDefault();

        // 현재 수정 중인 행의 모든 입력 필드를 가져옴
        const currentRowInputs =
          tbodyRef.current.children[rowIndex].querySelectorAll(
            'input[type="text"]'
          );

        let editedRow = {
          ...tableData[rowIndex],
          isEditable: false,
          isNew: tableData[rowIndex].isNew,
        };

        // 각 입력 필드의 값을 updatedRow와 editedRow에 저장
        currentRowInputs.forEach((input, rowIndex) => {
          const field = input.getAttribute("data-field");
          editedRow.item[field] = input.value;
        });

        const newData = [...tableData];
        newData[rowIndex] = editedRow;
        console.log("editedRow", editedRow);

        //수정된 행을 반영하여 tableData를 수정함
        actions.setTableData(newData);

        //수정된 행을 setState하여 update 요청을 보냄
        actions.setEditedRow(editedRow);
      }
    },
    [tableData]
  );

  // row 클릭이벤트 : 수정중인 row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback(
    (e, rowIndex) => {
      //최근 클릭행을 기록하는 함수
      if (rowIndex !== recentlyClickedRow) setRecentlyClickedRow(rowIndex);
      else setRecentlyClickedRow();
      console.log("recentlyClickedRow", recentlyClickedRow);

      // 행 클릭시 해당 행의 pkValue(예. {seqVal : "12", cdEmp : "A304"}로
      // state값을 바꾸고 싶다면.. setPkValue
      if (actions.setPkValue) {
        if (rowIndex === tableData.length) {
          console.log("setpkValue > rowIndex === tableData.length ");
          actions.setPkValue(pkValue);
        } else if (rowIndex < tableData.length) {
          let pkValue = {};
          tableHeaders.forEach((header) => {
            if (header.isPk)
              pkValue[header.field] = tableData[rowIndex].item[header.field];
          });
          console.log("setpkValue", pkValue);
          actions.setPkValue(pkValue);
        }
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
    },
    [getEditableRowIndex, tableData]
  );

  // 전체체크 or 전체해제
  const handleAllCheckboxChange = useCallback(() => {
    const isAllChecked = checkedBoxCounter() === tableData.length;
    const newData = tableData.map((row) => ({
      ...row,
      checked: !isAllChecked,
    }));
    actions.setTableData(newData);
  }, [tableData]);

  // 각 행의 체크박스 체크 이벤트
  const handleCheckbox = useCallback(
    (rowIndex) => {
      if (tableData[rowIndex].checked) setRecentlyClickedRow();
      tableData[rowIndex].checked = !tableData[rowIndex].checked;
      if (actions.setSelectedRows) {
        const selectedRows = tableData.filter((row) => row.checked);
        actions.setSelectedRows(selectedRows);
        console.log("selectedRows", selectedRows);
        actions.setTableData([...tableData]);
      }
    },
    [tableData]
  );

  // 정렬 화살표 기능.. 구현예정
  const handleArrowDirection = (columnName) => {};

  // 체크된 항목 계산함수
  const checkedBoxCounter = useCallback(() => {
    const checkedBoxCount = tableData.reduce(
      (sum, item) => (item.checked ? sum + 1 : sum),
      0
    );
    return checkedBoxCount;
  }, [tableData]);

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
            {tableHeaders.map((thead, rowIndex) => (
              <th
                id="tableHeader"
                key={rowIndex}
                style={{ width: thead.text.length * 10 + "px" }}
              >
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
                onClick={(e) => {
                  handleRowClick(e, rowIndex);
                }}
                className={
                  recentlyClickedRow === rowIndex || row.checked
                    ? "highlight-row"
                    : ""
                }
              >
                {/* 각 row 의 checkBox */}
                {showCheckbox && (
                  <td>
                    <div className="tableCheckBoxArea">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckbox(rowIndex)}
                      />
                    </div>
                  </td>
                )}
                {/* 각 row의 td */}
                {tableHeaders.map((thead, columnIndex) => (
                  <td
                    key={columnIndex}
                    onDoubleClick={() =>
                      handleDoubleClick(rowIndex, thead.field)
                    }
                  >
                    <div className="tableContents">
                      {/* editable 상태인 경우 input 요소로 렌더링 */}
                      {row.isEditable && !thead.readOnly ? (
                        <Form.Control
                          type="text"
                          data-field={thead.field}
                          defaultValue={row.isNew ? "" : row.item[thead.field]}
                          onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                          ref={(input) =>
                            input &&
                            row.focusOn === thead.field &&
                            input.focus()
                          }
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
              {tableHeaders.map((thead, rowIndex) => (
                <td key={rowIndex} style={{ color: "transparent" }}>
                  <div id="tableContents">.</div>
                </td>
              ))}
            </tr>
          )}

          {/* 빈 행 */}
          {minRow &&
            Array(Math.max(minRow - tableData.length, 0))
              .fill(null)
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
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
