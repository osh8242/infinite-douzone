import { faPlus, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import "../styles/tableForm.css";
import ConfirmComponent from "./ConfirmComponent";

const TableTest = ({
  tableHeaders, // [필수]
  tableData, // [필수]
  tableFooter, // [선택] tableFooter={tableFooter()}
  // 푸터 예시
  // const tableFooter = () => {
  //   return (
  //     <tr>
  //       <td colSpan="3">푸터입니다.</td>
  //     </tr>
  //   );
  // };
  pkValue, // [선택] 이 테이블의 pk가 노출되지 않지만 필요할 때
  actions = {}, // [대부분의 경우 => 필수] state값을 바꾸기 위한 set함수들..
  // 예시)
  // actions={{
  //   insertNewRow : actions.insertEmpFam // 추가행을 삽입하려면 필수
  //   updateEditedRow : actions.updateEmpFam // 행을 업데이트하려면 필수
  //   setSelectedRows: actions.setSelectedRows, // 체크박스를 이용하여 삭제하려면 필수
  //   setPkValue : actions.setLeftTablePkValue, // [선택] 현재 테이블의 pk값을 tableHeader나 tableData가 아닌 다른 곳에서 가져와야할 떄
  //   getRowObject: EmpFam, //객체화 함수 필수
  // }}
  tableName, //[선택] console.log에 출력해볼 테이블이름..
  codeHelper, //[선택] 코드헬퍼 사용시
  onRowClick, //[선택] 로우클릭 커스텀 이벤트 추가(파라미터 row 전달)

  // 가령, 이 테이블이 sub테이블이라서 main테이블 pk를 가져와야할 때)
  showCheckbox, // [선택] 체크박스 유무
  sortable, //
  readOnly, // [선택] 테이블을 읽기전용으로
  rowAddable, // [선택] 행 추가 가능여부
  defaultSelectedRow, // [선택] 테이블 랜더시 초기 선택행 옵션(숫자, 디폴트는 index = 0)
  defaultFocus, // [선택] 테이블 랜더시 최초 포커스 온(디폴트 false)
}) => {
  const [tableRows, setTableRows] = useState(tableData || []);

  useEffect(() => {
    setTableRows(tableData || []);
    if (defaultSelectedRow)
      switch (typeof defaultSelectedRow) {
        case "number":
          handleRowClick(null, defaultSelectedRow, 0);
          break;
        case "boolean":
          handleRowClick(null, 0, 0);
          break;
        default:
          break;
      }
  }, [tableData]);

  //테이블 자신을 가르키는 dom ref
  const myRef = useRef(false);

  //테이블 바디 dom ref
  const tbodyRef = useRef();

  //테이블의 수정된 행에 걸리는 ref
  const inputRef = useRef([]);

  //선택된 로우(인덱스)
  const [rowRef, setRowRef] = useState(-1);

  //선택된 컬럼(인덱스)
  const [columnRef, setColumnRef] = useState(-1);

  //정렬기준 열
  const [orderRef, setOrderRef] = useState(null);

  //오름차순여부 (true면 오름차순, false면 내림차순)
  const [isAsc, setIsAsc] = useState(null);

  //모달 경고창(인풋 pk누락)
  const [modalState, setModalState] = useState({ show: false });

  //테이블 포커스 여부 boolean ref
  const tableFocus = useRef(defaultFocus);

  //해당 테이블만 콘솔로그 찍어보고 싶을때..
  if (tableName === "EMP") {
    // console.log(tableName, tableRows, "Render");
    // console.log("inputRef", inputRef);
  }

  //정렬값이 바뀌면 테이블 정렬하기 useEffect
  useEffect(() => {
    if (!orderRef && !isAsc) return;
    const newTableRows = [...tableRows];
    newTableRows.sort((a, b) => {
      // 문자열비교(추후 숫자나 날짜도 비교가능해야함)
      if (a.item[orderRef] < b.item[orderRef]) return isAsc ? -1 : 1;
      else if (a.item[orderRef] > b.item[orderRef]) return isAsc ? 1 : -1;
      else return 0;
    });
    setTableRows(newTableRows);
  }, [orderRef, isAsc]);

  //로우와 컬럼 ref 해제 함수
  const releaseSelectedRef = useCallback(() => {
    setRowRef(-1);
    setColumnRef(-1);
  }, []);

  // 테이블 td마다 ref 설정
  const setInputRef = useCallback(
    (input, rowIndex, columnIndex) => {
      if (!readOnly) {
        if (!inputRef.current[rowIndex]) {
          inputRef.current[rowIndex] = [];
        }
        inputRef.current[rowIndex][columnIndex] = input;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableRows]
  );

  // 수정 중인 행의 index를 찾는 함수
  const editableRowIndex = useMemo(() => {
    return tableRows.findIndex((item) => item.isEditable);
  }, [tableRows]);

  //////// 랜더링 후에 처리할 SideEffect //////////
  useEffect(() => {
    //수정으로 바뀌면 해당 셀에 오토포커스
    if (editableRowIndex !== -1) {
      const input = inputRef.current[rowRef][columnRef];
      input.focus();
    }
  });

  // 선택된 행을 수정상태로 바꾸는 함수
  const setEditableRow = useCallback(
    (rowIndex) => {
      const newTableRows = [...tableRows];
      newTableRows[rowIndex].isEditable = true;
      setTableRows(newTableRows);
    },
    [tableRows]
  );

  //수정중인 행을 수정해제하는 함수
  const releaseEditable = useCallback(() => {
    const newTableRows = tableRows.map((row) => (row.isEditable = false));
    setTableRows(newTableRows);
  }, [tableRows]);

  //td의 className을 얻는 함수
  const getTdClassName = useCallback(
    (rowIndex, columnIndex) => {
      if (columnIndex === columnRef && rowIndex === rowRef) return "selectedTd";
    },
    [rowRef, columnRef]
  );

  //row의 className을 얻는 함수
  const getRowClassName = useCallback(
    (row, index) => (rowRef === index || row.checked ? "selectedTr" : ""),
    [rowRef]
  );

  // 현재 테이블의 모든 인풋요소들을 가져옴
  const getInputElements = useCallback(() => inputRef.current[rowRef], [rowRef]);

  // 새로운 행(빈행)을 만드는 함수
  const makeNewRow = useCallback(() => {
    let newRow = pkValue || {};
    newRow = actions.getRowObject ? actions.getRowObject(newRow) : newRow;
    return newRow;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkValue]);

  // 추가중이던 행 제거
  const removeNewRow = useCallback(() => {
    if (tableRows?.[tableRows.length - 1]?.isNew) tableRows.pop();
    setTableRows([...tableRows]);
  }, [tableRows]);

  //현재 행번호를 받아서 pkValue (객체)를 가져오는 함수
  const getPkValue = useCallback(
    (rowIndex) => {
      let pkValue = {};
      tableHeaders.forEach((header) => {
        if (header.isPk)
          pkValue[header.field] = tableRows[rowIndex]?.item[header.field];
      });
      return pkValue;
    },
    [tableHeaders, tableRows]
  );

  // pkValue 객체를 업데이트함
  const updatePkValue = useCallback(
    (rowIndex) => {
      if (actions.setPkValue) {
        if (rowRef !== rowIndex && rowIndex < tableRows.length) {
          let newPkValue = {};
          newPkValue = getPkValue(rowIndex);
          actions.setPkValue(newPkValue);
        } else {
          actions.setPkValue({});
        }
      }
    },
    [actions, rowRef, tableRows.length, getPkValue]
  );

  // row Click 이벤트 : 수정중인 row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback(
    (e, rowIndex, columnIndex) => {
      if (rowRef === rowIndex && columnRef === columnIndex) return;
      setRowRef(rowIndex);
      setColumnRef(columnIndex);
      releaseEditable(rowIndex);
      if (editableRowIndex !== rowIndex) removeNewRow(rowIndex);
      updatePkValue(rowIndex);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      rowRef,
      columnRef,
      releaseEditable,
      editableRowIndex,
      removeNewRow,
      updatePkValue,
    ]
  );

  // 테이블에 새로운 행(빈행)을 넣는 함수
  const pushNewRow = useCallback(() => {
    const newRow = makeNewRow();
    newRow["isNew"] = true;
    tableRows.push(newRow);
    setTableRows([...tableData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRows]);

  // row DoubliClick 이벤트 : 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = useCallback(
    (event, rowIndex, columnIndex) => {
      handleRowClick(event, rowIndex, columnIndex);
      if (readOnly) return;
      if (rowIndex === tableRows.length) pushNewRow();
      tableRows[rowIndex].isEditable = true;
      setTableRows([...tableRows]);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableRows, pushNewRow]
  );

  //인풋값에 pk 값이 누락되어있는지 체크하는 함수
  const isValidRow = useCallback(
    (inputs) => {
      for (let input of inputs) {
        const columnIndex = input.getAttribute("data-column-index");
        if (tableHeaders[columnIndex].isPk)
          if (input.innerText === "" || !input.innerText) return false;
        return true;
      }
    },
    [tableHeaders]
  );

  // 수정중인 행의 모든 입력필드를 업데이트한 행을 반환하는 함수
  const getEditedRow = useCallback(() => {
    let editedRow = {
      ...tableRows[rowRef],
      isEditable: false,
      isNew: tableRows[rowRef].isNew,
    };

    const currentRowInputs = getInputElements();

    // 입력필드에 pk값이 누락되었는지 체크
    if (!isValidRow(currentRowInputs)) return false;

    // 각 입력 필드의 값을 editedRow에 업데이트
    currentRowInputs.forEach((input, rowIndex) => {
      const field = input.getAttribute("data-field");
      editedRow.item[field] = input.innerText;
    });

    return editedRow;
  }, [tableRows, rowRef, getInputElements, isValidRow]);

  // 수정한 행에서 엔터키 입력 이벤트 처리
  const TdKeyDownHandler = useCallback(
    (event, rowIndex) => {
      if (readOnly) return;
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();

        const editedRow = getEditedRow();

        if (!editedRow) {
          setModalState({ show: true, message: "필수입력값 누락" });
          return;
        }
        if (editedRow.isNew) actions.insertNewRow(editedRow.item);
        else actions.updateEditedRow(editedRow.item);

        let newTableRows = [...tableRows];
        newTableRows[rowIndex] = { ...editedRow, isEditable: false };
        delete newTableRows[rowIndex].isNew;
        setTableRows(newTableRows);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getEditedRow, tableRows, editableRowIndex]
  );

  // 행 삭제 이벤트
  const deleteRow = useCallback(
    (rowRef) => {
      const newTableRows = tableRows.filter((row, index) => index !== rowRef);
      setTableRows(newTableRows);
    },
    [tableRows]
  );

  // 체크된 Row 개수 계산함수
  const checkedBoxCounter = useCallback(() => {
    const checkedBoxCount = tableRows.reduce(
      (sum, item) => (item.checked ? sum + 1 : sum),
      0
    );
    return checkedBoxCount;
  }, [tableRows]);

  // 체크박스 전체해제
  const releaseAllCheckbox = useCallback(() => {
    tableRows.forEach((row, index) => {
      tableRows[index].checked = false;
    });
    setTableRows([...tableRows]);
    if (actions.setSelectedRows) actions.setSelectedRows([]);
  }, [actions, tableRows]);

  // 전체체크 or 전체해제 함수
  const allCheckboxChangeHandler = useCallback(() => {
    const isAllChecked = checkedBoxCounter() === tableRows.length;
    tableRows.forEach((row, index) => {
      tableRows[index].checked = !isAllChecked;
    });
    setTableRows([...tableRows]);
    if (isAllChecked) actions.setSelectedRows([]);
    else actions.setSelectedRows(tableRows);
  }, [actions, checkedBoxCounter, tableRows]);

  // 체크된 행들을 반환하는 함수
  const getSelectedRows = useCallback(() => {
    if (actions.setSelectedRows) {
      let newSelectedRows;
      newSelectedRows = tableRows.filter((row) => row.checked);
      return newSelectedRows;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRows]);

  // 각 행의 체크박스 체크 이벤트
  const checkboxHandler = useCallback(
    (rowIndex) => {
      tableRows[rowIndex].checked = !tableRows[rowIndex].checked;
      if (actions.setSelectedRows) {
        const newSelectedRows = getSelectedRows();
        actions.setSelectedRows(newSelectedRows);
      }
      setTableRows([...tableRows]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableRows, getSelectedRows]
  );

  //화살표 컴포넌트 리턴함수
  const getArrowDirection = (field) => {
    if (field !== orderRef) return;
    return isAsc ? (
      <FontAwesomeIcon icon={faSortUp} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} />
    );
  };

  // 헤더클릭 이벤트 (정렬)
  const rowsOrderHandler = useCallback(
    (event, field) => {
      setOrderRef(field);
      if (orderRef !== field || !isAsc) setIsAsc(true);
      else if (isAsc) setIsAsc(false);
    },
    [isAsc, orderRef]
  );

  //테이블 바깥 영역 클릭 핸들러 함수
  const tableMouseDownHandler = useCallback(
    (event) => {
      //console.log("마우스 이벤트", event);
      if (myRef.current && !myRef.current.contains(event.target)) {
        if (tableFocus.current) {
          tableFocus.current = false;
          setColumnRef(-1);
          if (!actions.setPkValue) setRowRef(-1);
          releaseEditable();
          removeNewRow();
        }
      }
      if (myRef.current && myRef.current.contains(event.target)) {
        tableFocus.current = true;
      }
    },
    [releaseEditable, releaseSelectedRef, removeNewRow]
  );

  const tableKeyDownHandler = useCallback(
    (event) => {
      if (tableFocus.current) {
        console.log("이벤트키", event.key);
        // event.preventDefault();
        if (editableRowIndex !== -1) {
          switch (event.key) {
            case "Escape":
              releaseEditable();
              removeNewRow();
              break;
            default:
              break;
          }
        }

        if (editableRowIndex === -1) {
          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              if (rowRef < tableRows.length) setRowRef(rowRef + 1);
              updatePkValue(rowRef + 1);
              break;

            case "ArrowUp":
              event.preventDefault();
              if (rowRef > 0) setRowRef(rowRef - 1);
              updatePkValue(rowRef - 1);
              break;

            case "ArrowLeft":
              event.preventDefault();
              if (columnRef > 0) setColumnRef(columnRef - 1);
              break;

            case "ArrowRight":
              event.preventDefault();
              if (columnRef < tableHeaders.length - 1) setColumnRef(columnRef + 1);
              break;

            case "Enter":
              event.preventDefault();
              if (editableRowIndex === -1 && rowRef > -1) {
                handleRowClick(event, rowRef, columnRef);
                if (rowRef === tableRows.length) pushNewRow();
                setEditableRow(rowRef);
              }
              break;

            case " ":
              event.preventDefault();
              checkboxHandler(rowRef);
              break;

            case "Delete":
              event.preventDefault();
              setModalState({
                show: true,
                message: "해당 행을 삭제하시겠습니까?",
                onConfirm: () => {
                  actions.deleteRow(tableRows[rowRef]);
                  deleteRow(rowRef);
                  setModalState({ show: false });
                },
              });
              break;

            default:
              break;
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      tableHeaders,
      tableRows,
      editableRowIndex,
      rowRef,
      columnRef,
      releaseEditable,
      removeNewRow,
      updatePkValue,
      checkboxHandler,
      handleRowClick,
      pushNewRow,
      setEditableRow,
    ]
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

  return (
    <>
      <Table className="table" size="sm" bordered hover ref={myRef}>
        {/* header */}
        <thead>
          <tr>
            {/* checkBox 상단 아이콘 */}
            {showCheckbox && (
              <th className="tableCheckBoxHeader">
                <input
                  type="checkbox"
                  onChange={() => allCheckboxChangeHandler()}
                  checked={checkedBoxCounter() === tableRows.length}
                />
              </th>
            )}
            {/* th columns */}
            {tableHeaders.map((thead, rowIndex) => (
              <th
                className="tableHeader"
                data-field={thead.field}
                onClick={sortable ? (e) => rowsOrderHandler(e, thead.field) : null}
                key={rowIndex}
                style={thead.width && { width: thead.width }}
              >
                <div>{thead.text}</div>
                <div className="tableHeader-arrow">
                  {getArrowDirection(thead.field)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* content */}
        <tbody ref={tbodyRef}>
          {tableRows.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={getRowClassName(row, rowIndex)}
                onClick={(e) => {
                  if (onRowClick) onRowClick(e, row.item);
                }}
              >
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
                    className={getTdClassName(rowIndex, columnIndex)}
                    onClick={(e) => handleRowClick(e, rowIndex, columnIndex)}
                    onDoubleClick={(e) =>
                      handleDoubleClick(e, rowIndex, columnIndex)
                    }
                  >
                    {/* <Form.Control
                      type="text"
                      data-field={thead.field}
                      data-column-index={columnIndex}
                      // onFocus={(e) => {
                      //   setRowRef(rowIndex);
                      //   setColumnRef(columnIndex);
                      //   focusAtEnd(e.target);
                      // }}
                      disabled={!row.isEditable}
                      onKeyDown={(e) => TdKeyDownHandler(e, rowIndex)}
                      ref={(div) => setInputRef(div, rowIndex, columnIndex)}
                      defaultValue={row.isNew ? "" : row.item[thead.field]}
                    /> */}

                    <div
                      className="tableContents"
                      contentEditable={row.isEditable && !thead.readOnly}
                      suppressContentEditableWarning={true}
                      data-field={thead.field}
                      data-column-index={columnIndex}
                      onFocus={(e) => {
                        setRowRef(rowIndex);
                        setColumnRef(columnIndex);
                        focusAtEnd(e.target);
                      }}
                      onKeyDown={(e) => TdKeyDownHandler(e, rowIndex)}
                      ref={(div) => setInputRef(div, rowIndex, columnIndex)}
                    >
                      {row.isNew ? "" : row.item[thead.field]}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
          {/* 행추가가 가능한 rowAddable 옵션이 true 인 경우 */}
          {rowAddable && (
            <tr className={`sticky-row ${getRowClassName({}, tableRows.length)}`}>
              {showCheckbox && (
                <td
                  className="d-flex justify-content-center"
                  onClick={() => codeHelper && actions.setCodeHelper()}
                >
                  <div>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </td>
              )}

              {tableHeaders.map((thead, columnIndex) => (
                <td
                  className={getTdClassName(tableRows.length, columnIndex)}
                  key={columnIndex}
                  onDoubleClick={(e) =>
                    handleDoubleClick(e, tableRows.length, columnIndex)
                  }
                  onClick={(e) => handleRowClick(e, tableRows.length, columnIndex)}
                >
                  <div
                    className="tableContents"
                    ref={(div) => setInputRef(div, tableRows.length, columnIndex)}
                  >
                    {!showCheckbox && columnIndex === 0 && (
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => codeHelper && actions.setCodeHelper()}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          )}
        </tbody>
        {tableFooter && <tfoot>{tableFooter}</tfoot>}
      </Table>
      <ConfirmComponent
        show={modalState.show}
        message={modalState.message}
        onConfirm={
          modalState.onConfirm
            ? modalState.onConfirm
            : () => setModalState({ show: false })
        }
        onHide={() => setModalState({ show: false })}
      />
    </>
  );
};

TableTest.defaultProps = {
  tableHeaders: [],
  tableData: [],
};

TableTest.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  tableFooter: PropTypes.element,
  actions: PropTypes.object,
  tableName: PropTypes.string,
  showCheckbox: PropTypes.bool,
  sortable: PropTypes.bool,
  readOnly: PropTypes.bool,
  rowAddable: PropTypes.bool,
  defaultFocus: PropTypes.bool,
};

export default TableTest;
