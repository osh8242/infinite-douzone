import {
  faPlus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef } from "react";
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
  tableName,

  pkValue, // [선택] 현재 테이블의 pk값을 tableHeader나 tableData가 아닌 다른 곳에서 가져와야할 떄
  // 가령, 이 테이블이 sub테이블이라서 main테이블 pk를 가져와야할 때)
  showCheckbox, // [선택] 체크박스 유무
  selectedRows, // [선택] 체크된 행들을 관리하고 싶다면..(가령 삭제)
  showHeaderArrow, //
  readOnly, // [선택] 테이블을 읽기전용으로
  rowAddable, // [선택] 행 추가 가능여부
}) => {
  console.log(tableName, tableData);

  //현재 테이블의 선택된 행 index을 가져오는 함수
  const getSelectedRowIndex = () => {
    return tableData.findIndex((row) => row.selected);
  };

  // 수정 중인 행의 index를 찾는 함수
  const getEditableRowIndex = () => {
    return tableData.findIndex((item) => item.isEditable);
  };

  //선택된 행을 선택해제하는 함수(체크해제 아님)
  const releaseSelection = useCallback(() => {
    const selectedRowIndex = getSelectedRowIndex();
    if (selectedRowIndex !== -1) tableData[selectedRowIndex].selected = false;
  }, [tableData]);

  //수정중인 행을 수정해제하는 함수
  const releaseEditable = useCallback(() => {
    const editableRowIndex = getEditableRowIndex();
    if (editableRowIndex !== -1) tableData[editableRowIndex].isEditable = false;
  }, [tableData]);

  //테이블 자신을 가르키는 dom ref
  const myRef = useRef(null);
  //테이블 포커스 여부 boolean ref
  const tableFocus = useRef(false);
  //테이블 바디 dom ref
  const tbodyRef = useRef();
  //선택된 컬럼(필드)
  const columnRef = useRef();

  // row Click 이벤트 : 수정중인 row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback(
    (e, rowIndex, columnIndex) => {
      columnRef.current = columnIndex;
      if (rowIndex !== getEditableRowIndex()) {
        releaseEditable();
        if (tableData[tableData.length - 1].isNew) tableData?.pop();
      }

      releaseSelection();
      if (rowIndex > -1 && rowIndex < tableData.length) {
        tableData[rowIndex].selected = true;
        if (actions.setPkValue) actions.setPkValue(getPkValue(rowIndex));
      }

      actions.setTableData([...tableData]);
    },
    [getEditableRowIndex, tableData]
  );

  // row DoubliClick 이벤트 : 해당 row 를 editable row 로 변경 (편집 가능)
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

      tableData[rowIndex].isEditable = true;
      tableData[rowIndex]["focusOn"] = field;
      console.log("newData", tableData);
      actions.setTableData([...tableData]);
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
        tableData[rowIndex] = editedRow;

        //수정된 행을 반영하여 tableData를 수정함
        actions.setTableData([...tableData]);

        //수정된 행을 setState하여 update 요청을 보냄
        actions.setEditedRow(editedRow);
      }
    },
    [tableData]
  );

  // 전체체크 or 전체해제
  const handleAllCheckboxChange = useCallback(() => {
    const isAllChecked = checkedBoxCounter() === tableData.length;
    tableData.forEach((row, index) => {
      tableData[index].checked = !isAllChecked;
    });
    actions.setTableData([...tableData]);
    if (isAllChecked) actions.setSelectedRows(tableData);
    else actions.setSelectedRows([]);
  }, [tableData]);

  // 각 행의 체크박스 체크 이벤트
  const handleCheckbox = useCallback(
    (rowIndex) => {
      tableData[rowIndex].checked = !tableData[rowIndex].checked;
      if (tableData[rowIndex].checked) {
        if (actions.setSelectedRows) {
          selectedRows.push(tableData[rowIndex]);
        }
      }
      if (!tableData[rowIndex].checked) {
        tableData[rowIndex].selected = false;
        selectedRows = tableData.filter((row) => row.checked);
      }
      actions.setSelectedRows([...selectedRows]);
      actions.setTableData([...tableData]);
      console.log("selectedRows", selectedRows);
    },
    [tableData, actions]
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

  //현재 행번호를 받아서 pkValue (객체)를 가져오는 함수
  const getPkValue = useCallback(
    (rowIndex) => {
      let pkValue = {};
      tableHeaders.forEach((header) => {
        if (header.isPk)
          pkValue[header.field] = tableData[rowIndex].item[header.field];
      });
      return pkValue;
    },
    [tableData, tableHeaders]
  );

  //테이블 바깥 영역 클릭 핸들러 함수
  const tableMouseDownHandler = useCallback(
    (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        if (tableFocus.current) {
          releaseSelection();
          releaseEditable();
          actions.setTableData([...tableData]);
          tableFocus.current = false;
        }
      }
      if (myRef.current && myRef.current.contains(event.target)) {
        tableFocus.current = true;
      }
    },
    [tableData]
  );

  const tableKeyDownHandler = useCallback(
    (event) => {
      if (tableFocus.current) {
        // event.preventDefault();
        console.log("event.key", event.key);
        const selectedRowIndex = getSelectedRowIndex();
        const editableRowIndex = getEditableRowIndex();
        switch (event.key) {
          case "ArrowDown":
            if (selectedRowIndex === -1) break;
            if (selectedRowIndex < tableData.length - 1) {
              tableData[selectedRowIndex].selected = false;
              tableData[selectedRowIndex + 1].selected = true;
            }
            break;
          case "ArrowUp":
            if (selectedRowIndex === -1) break;
            if (selectedRowIndex > 0) {
              tableData[selectedRowIndex].selected = false;
              tableData[selectedRowIndex - 1].selected = true;
            }
            break;
          case "ArrowLeft":
            if (selectedRowIndex === -1) break;
            console.log("애로우 레프트", columnRef);
            if (columnRef.current > 0) {
              columnRef.current--;
              console.log("columnRef 좌", columnRef);
            }
            break;
          case "ArrowRight":
            if (selectedRowIndex === -1) break;
            if (columnRef.current < tableHeaders.length - 1) {
              columnRef.current++;
              console.log("columnRef 우", columnRef);
            }
            break;

          case "Enter":
            if (editableRowIndex === -1 && selectedRowIndex !== -1) {
              tableData[selectedRowIndex].isEditable = true;
            }
            console.log("tableData", tableData);
            break;
          case "Escape":
            releaseEditable();
            break;
          default:
            break;
        }
        console.log("columnRef", columnRef);
        actions.setTableData([...tableData]);
      }
    },
    [tableData, columnRef]
  );

  //componentDidMount
  useEffect(() => {
    document.addEventListener("mousedown", tableMouseDownHandler);
    document.addEventListener("keydown", tableKeyDownHandler);

    return () => {
      document.removeEventListener("mousedown", tableMouseDownHandler);
      document.removeEventListener("keydown", tableKeyDownHandler);
    };
  }, [tableMouseDownHandler, tableKeyDownHandler]);

  return tableData ? (
    <>
      <Table size="sm" bordered hover ref={myRef}>
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
                style={thead.width && { width: thead.width }}
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
                className={row.selected || row.checked ? "selectedTr" : ""}
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
                    id={
                      columnIndex === columnRef.current && row.selected
                        ? "selectedTd"
                        : ""
                    }
                    onClick={(e) => handleRowClick(e, rowIndex, columnIndex)}
                    onDoubleClick={() =>
                      handleDoubleClick(rowIndex, thead.field)
                    }
                  >
                    {/* editable 상태인 경우 input 요소로 렌더링 */}
                    {row.isEditable && !thead.readOnly ? (
                      <Form.Control
                        type="text"
                        data-field={thead.field}
                        defaultValue={row.isNew ? "" : row.item[thead.field]}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                        ref={(input) => {
                          if (input && columnRef.current === columnIndex) {
                            input.focus();
                          }
                        }}
                      />
                    ) : (
                      <div className="tableContents">
                        {row.item[thead.field]}
                      </div>
                    )}
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
        </tbody>
      </Table>
    </>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableTemp;
