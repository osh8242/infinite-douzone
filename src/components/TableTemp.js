/*
  작성자 : 김진
  parameter : showCheckbox, showHeaderArrow, tableData
  showCheckbox : true 일 경우 체크박스 생성, false 체크박스 제거
  showHeaderArrow : true 일 경우 table header 에 arrow icon 생성, false arrow icon 제거
  tableData : table 로 만들 데이터
*/

import {
  faCheck,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "../styles/tableForm.css";

const TableTemp = ({
  showCheckbox,
  showHeaderArrow,
  tableData,
  rowClickHandler,
  cellClickHandler,
}) => {
<<<<<<< HEAD
  // 예외처리 방법은 추후 수정
  // if (!tableData || tableData.length === 0) {
  //   return (
  //     <div>
  //       <h3>해당되는 데이터가 존재하지 않습니다.</h3>
  //     </div>
  //   );
  // }

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
  //console.log(tableName, tableData, "Render");

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
>>>>>>> 9b9c5ed21793365235161701f59c7e353288c601

  // 편집 가능 Row 관리
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  // 테이블 헤더의 화살표 방향 상태 관리 (첫 행이 존재할 때만 초기화)
  const [arrowDirections, setArrowDirections] = useState(
    columns.length > 0
      ? Object.keys(tableData[0]).reduce((arrowStates, columnName) => {
          arrowStates[columnName] = true;
          return arrowStates;
        }, {})
      : {}
  );

  // 더블 클릭 시 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = (rowIndex) => {
    setEditableRowIndex(rowIndex);
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
    () => tbodyRef.current.children[rowRef.current].querySelectorAll("input"),
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
    if (tableData[tableData.length - 1]?.isNew) tableData?.pop();
  }, [tableData]);

  // row Click 이벤트 : 수정중인 row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback(
    (e, rowIndex, columnIndex) => {
      if(readOnly) return;
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
          //actions.setTableData([...tableData]);
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
    setEditedData(updatedEditedData);
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // editable row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = (e, rowIndex) => {
    if (editableRowIndex !== rowIndex) {
      let index = showCheckbox ? 1 : 0;
      let id = e.currentTarget.children[index].children[0].textContent;
      if (rowClickHandler) rowClickHandler(id);
      setEditableRowIndex(null);
    } else {
      setEditableRowIndex(rowIndex);
    }
  };

  // handle table arrow -> DB 연결 이후 order by parameter 변경하여 주도록 수정 예정
  const handleArrowDirection = (columnName) => {
    // arrowDirection 의 Status 복제
    setArrowDirections((prevDirections) => ({
      ...prevDirections,
      // 클릭 시 arrowDirection toggle
      [columnName]: !prevDirections[columnName],
    }));
  };

  return columns.length > 0 ? (
    <>
      <Table size={"sm"} bordered hover>
        {/* header */}
        <thead>
          <tr>
            {/* checkBox 상단 아이콘 */}
            {showCheckbox && (
              <th id="tableCheckBoxHeader">
                <FontAwesomeIcon icon={faCheck} />
              </th>
            )}
            {/* th columns */}
            {columns.map((columnName, index) => (
              <th id="tableHeader" key={index}>
                <div onClick={() => handleArrowDirection(columnName)}>
                  <div>{columnName}</div>
                  {showHeaderArrow && (
                    <div id="tableHeader-arrow">
                      {arrowDirections[columnName] ? (
                        <FontAwesomeIcon icon={faSortUp} />
                      ) : (
                        <FontAwesomeIcon icon={faSortDown} />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* content */}
        <tbody>
          {tableData.map((item, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                onDoubleClick={() => handleDoubleClick(rowIndex)}
                onClick={(e) => handleRowClick(e, rowIndex)}
              >
                {/* 각 row 의 checkBox */}
                {showCheckbox && (
                  <td>
                    <div className="tableCheckBoxArea">
                      <input type="checkbox" />
                    </div>
                  </td>
                )}
                {/* 각 row 의 content */}
                {columns.map((columnName, columnIndex) => (
                  <td key={columnIndex}>
                    <div className="tableContents">
                      {/* editable 상태인 경우 input 요소로 렌더링 */}
                      {editableRowIndex === rowIndex ? (
                        <Form.Control
                          type="text"
                          value={
                            editedData[rowIndex]?.[columnName] ||
                            item[columnName]
                          }
                          onChange={(event) =>
                            handleInputChange(event, rowIndex, columnName)
                          }
                        />
                      ) : (
                        item[columnName]
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
          {/* 빈 행 */}
          {/* {minRow &&
            Array(Math.max(minRow - tableData.length, 0))
              .fill(null)
              .map((_, index) => (
                <tr key={index}>
                  <td
                    colSpan={showCheckbox ? columns.length + 1 : columns.length}
                    style={{ color: "transparent" }}
                  >
                    .
                  </td>
                </tr>
              ))} */}
        </tbody>
      </Table>
    </>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableTemp;
