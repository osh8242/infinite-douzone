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
  tableFooter, // [선택] <tfoot></tfoot>에 들어갈 <tr><td>.. 요소들
  // 푸터 예시
  // const tableFooter = () => {
  //   return (
  //     <tr>
  //       <td colSpan="3">푸터입니다.</td>
  //     </tr>
  //   );
  // };

  actions, // [대부분의 경우 => 필수] state값을 바꾸기 위한 set함수들..
  // 예시)
  // actions={{
  //   setTableData: actions.setSubTableData, // 테이블을 수정하려면 필수
  //   setEditedRow: actions.setEditedEmpFam,
  //   getRowObject: EmpFam, //객체화 함수
  // }}
  tableName, //[선택] console.log에 출력해볼 테이블이름..

  pkValue, // [선택] 현재 테이블의 pk값을 tableHeader나 tableData가 아닌 다른 곳에서 가져와야할 떄
  // 가령, 이 테이블이 sub테이블이라서 main테이블 pk를 가져와야할 때)
  showCheckbox, // [선택] 체크박스 유무
  selectedRows, // [선택] 체크된 행들을 관리하고 싶다면..(가령 삭제)
  showHeaderArrow, //
  readOnly, // [선택] 테이블을 읽기전용으로
  rowAddable, // [선택] 행 추가 가능여부
}) => {
  console.log(tableName, tableData, "Render");

  //테이블 자신을 가르키는 dom ref
  const myRef = useRef(null);
  //테이블 바디 dom ref
  const tbodyRef = useRef();
  //선택된 컬럼(인덱스)
  const columnRef = useRef();
  //선택된 로우(인덱스)
  const rowRef = useRef();
  //테이블 포커스 여부 boolean ref
  const tableFocus = useRef(rowRef.current && columnRef.current);

  //로우와 컬럼 ref 해제 함수
  const releaseSelectedRef = useCallback(() => {
    rowRef.current = null;
    columnRef.current = null;
  }, []);

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

  // 선택된 행을 수정상태로 바꾸는 함수
  const setEditableRow = useCallback(
    (rowIndex) => {
      tableData[rowIndex].isEditable = true;
      actions.setTableData([...tableData]);
    },
    [tableData]
  );

  //수정중인 행을 수정해제하는 함수
  const releaseEditable = useCallback(() => {
    const editableRowIndex = getEditableRowIndex();
    if (editableRowIndex !== -1) tableData[editableRowIndex].isEditable = false;
  }, [tableData]);

  //row의 className을 얻는 함수
  const getRowClassName = useCallback((currentRow, index) => {
    if (rowRef.current === index || currentRow.checked) return "selectedTr";
    if (index === rowRef.current) return "selectedTr";
    return "";
  }, []);

  // 현재 테이블의 모든 인풋요소들을 가져옴
  const getInputElements = useCallback(
    () =>
      tbodyRef.current.children[rowRef.current].querySelectorAll(
        "[contentEditable='true']"
      ),
    []
  );

  // 새로운 행(빈행)을 만드는 함수
  const makeNewRow = useCallback(() => {
    let newRow = pkValue || {};
    newRow = actions.getRowObject ? actions.getRowObject(newRow) : newRow;
    return newRow;
  }, [pkValue]);

  // 테이블에 새로운 행(빈행)을 넣는 함수
  const pushNewRow = useCallback(() => {
    const newRow = makeNewRow();
    newRow["isNew"] = true;
    tableData.push(newRow);
  }, [tableData]);

  // 추가중이던 행 제거
  const removeNewRow = useCallback(() => {
    if (tableData?.[tableData.length - 1].isNew) tableData?.pop();
  }, [tableData]);

  // row Click 이벤트 : 수정중인 row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback(
    (e, rowIndex, columnIndex) => {
      if (readOnly) return;
      rowRef.current = rowIndex;
      columnRef.current = columnIndex;
      if (rowIndex !== getEditableRowIndex()) {
        releaseEditable();
        removeNewRow();
      }

      releaseSelection();
      if (rowIndex > -1) {
        if (actions.setPkValue && rowRef.current < tableData.length)
          actions.setPkValue(getPkValue());
      }

      actions.setTableData([...tableData]);
    },
    [getEditableRowIndex, tableData]
  );

  // row DoubliClick 이벤트 : 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = useCallback(
    (rowIndex, field) => {
      if (readOnly) return;

      if (rowIndex === tableData.length) pushNewRow();

      tableData[rowIndex].isEditable = true;
      actions.setTableData([...tableData]);
    },
    [tableData, pkValue]
  );

  // 더블 클릭 후 편집한 데이터
  const TdKeyDownHandler = useCallback(
    (event, rowIndex) => {
      if (readOnly) return;
      if (event.key === "Enter") {
        event.preventDefault();

        // 현재 수정 중인 행의 모든 입력 필드를 가져옴
        const currentRowInputs = getInputElements();

        let editedRow = {
          ...tableData[rowIndex],
          isEditable: false,
          isNew: tableData[rowIndex].isNew,
        };

        // 각 입력 필드의 값을 updatedRow와 editedRow에 저장
        currentRowInputs.forEach((input, rowIndex) => {
          const field = input.getAttribute("data-field");
          editedRow.item[field] = input.innerText;
        });
        tableData[rowIndex] = editedRow;
        console.log("editedRow", editedRow);

        //수정된 행을 반영하여 tableData를 수정함
        actions.setTableData([...tableData]);

        //수정된 행을 setState하여 update 요청을 보냄
        actions.setEditedRow(editedRow);
      }
    },
    [tableData]
  );

  // 전체체크 or 전체해제
  const allCheckboxChangeHandler = useCallback(() => {
    const isAllChecked = checkedBoxCounter() === tableData.length;
    tableData.forEach((row, index) => {
      tableData[index].checked = !isAllChecked;
    });
    actions.setTableData([...tableData]);
    if (isAllChecked) actions.setSelectedRows(tableData);
    else actions.setSelectedRows([]);
  }, [tableData]);

  // 각 행의 체크박스 체크 이벤트
  const checkboxHandler = useCallback(
    (rowIndex) => {
      tableData[rowIndex].checked = !tableData[rowIndex].checked;
      let newSelectedRows = [...selectedRows];
      if (tableData[rowIndex].checked) {
        if (actions.setSelectedRows) {
          newSelectedRows.push(tableData[rowIndex]);
        }
      }
      if (!tableData[rowIndex].checked) {
        tableData[rowIndex].selected = false;
        newSelectedRows = tableData.filter((row) => row.checked);
      }
      actions.setSelectedRows(newSelectedRows);
      actions.setTableData([...tableData]);
    },
    [tableData, actions]
  );

  /////// 정렬 화살표 기능.. 구현예정
  const arrowDirectionHandler = (columnName) => {};

  // 체크된 Row 개수 계산함수
  const checkedBoxCounter = useCallback(() => {
    const checkedBoxCount = tableData.reduce(
      (sum, item) => (item.checked ? sum + 1 : sum),
      0
    );
    return checkedBoxCount;
  }, [tableData]);

  //현재 행번호를 받아서 pkValue (객체)를 가져오는 함수
  const getPkValue = useCallback(() => {
    let pkValue = {};
    tableHeaders.forEach((header) => {
      if (header.isPk)
        pkValue[header.field] = tableData[rowRef.current].item[header.field];
    });
    return pkValue;
  }, [tableData, rowRef]);

  //테이블 바깥 영역 클릭 핸들러 함수
  const tableMouseDownHandler = useCallback(
    (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        if (tableFocus.current) {
          releaseSelectedRef();
          releaseEditable();
          removeNewRow();
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
        const editableRowIndex = getEditableRowIndex();
        let isValidKeyEvent = false;

        if (editableRowIndex !== -1) {
          switch (event.key) {
            case "Escape":
              releaseEditable();
              removeNewRow();
              isValidKeyEvent = true;
              break;
            default:
              break;
          }
        }

        if (editableRowIndex === -1) {
          switch (event.key) {
            case "ArrowDown":
              if (!rowRef) break;
              if (rowRef.current < tableData.length) rowRef.current++;
              isValidKeyEvent = true;
              break;
            case "ArrowUp":
              if (!rowRef) break;
              if (rowRef.current > 0) rowRef.current--;
              isValidKeyEvent = true;
              break;
            case "ArrowLeft":
              if (!columnRef) break;
              if (columnRef.current > 0) columnRef.current--;
              isValidKeyEvent = true;
              break;
            case "ArrowRight":
              if (!columnRef) break;
              if (columnRef.current < tableHeaders.length - 1)
                columnRef.current++;
              isValidKeyEvent = true;
              break;
            case "Enter":
              if (editableRowIndex === -1 && rowRef) {
                event.preventDefault();
                handleRowClick(event, rowRef.current, columnRef.current);
                if (rowRef.current === tableData.length) pushNewRow();
                setEditableRow(rowRef.current);
              }
              isValidKeyEvent = true;
              break;
            case " ":
              checkboxHandler(rowRef.current);
              isValidKeyEvent = true;
              break;
            default:
              break;
          }
        }

        if (isValidKeyEvent) actions.setTableData([...tableData]);
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

  // 입력커서 맨 뒤로 이동시키는 함수
  const focusAtEnd = (element) => {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

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
                  onChange={() => allCheckboxChangeHandler()}
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
                <div onClick={() => arrowDirectionHandler(thead)}>
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
              <tr key={rowIndex} className={getRowClassName(row, rowIndex)}>
                {/* 각 row 의 checkBox */}
                {showCheckbox && (
                  <td>
                    <div className="tableCheckBoxArea">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => checkboxHandler(rowIndex)}
                      />
                    </div>
                  </td>
                )}
                {/* 각 row의 td */}
                {tableHeaders.map((thead, columnIndex) => (
                  <td
                    key={columnIndex}
                    id={
                      columnIndex === columnRef.current &&
                      rowRef.current === rowIndex &&
                      "selectedTd"
                    }
                    onClick={(e) => handleRowClick(e, rowIndex, columnIndex)}
                    onDoubleClick={() =>
                      handleDoubleClick(rowIndex, thead.field)
                    }
                  >
                    <div className="tableContents">
                      {/* editable 상태인 경우 input 요소로 렌더링 */}
                      {row.isEditable && !thead.readOnly ? (
                        <div
                          contentEditable
                          data-field={thead.field}
                          onKeyDown={(e) => TdKeyDownHandler(e, rowIndex)}
                          ref={(input) => {
                            if (input && columnRef.current === columnIndex) {
                              input.focus();
                              focusAtEnd(input);
                            }
                          }}
                        >
                          {row.isNew ? "" : row.item[thead.field]}
                        </div>
                      ) : (
                        <div>{row.item[thead.field]}</div>
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
              className={getRowClassName({}, tableData.length)}
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
        {tableFooter && <tfoot>{tableFooter}</tfoot>}
      </Table>
    </>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableTemp;
