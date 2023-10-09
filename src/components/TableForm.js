import {
  faPlus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Table } from "react-bootstrap";
import { CODE_VALUE } from "../model/CommonConstant";
import "../styles/tableForm.css";
import { makeCommaNumber } from "../utils/NumberUtils";
import CodeHelperModal from "./CodeHelperModal";
import ConfirmComponent from "./ConfirmComponent";
import ModalComponent from "./ModalComponent";
import SelectForm from "./SelectForm";
import TextBoxComponent from "./TextBoxComponent";

const TableForm = ({
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
  deleteMessage, //[선택] 삭제메세지

  // 가령, 이 테이블이 sub테이블이라서 main테이블 pk를 가져와야할 때)
  showCheckbox, // [선택] 체크박스 유무
  sortable, //
  readOnly, // [선택] 테이블을 읽기전용으로
  rowAddable, // [선택] 행 추가 가능여부
  defaultFocus, // [선택] 테이블 랜더시 최초 포커스 온 1번째행 셀렉트 디폴트 false)
}) => {
  const [tableRows, setTableRows] = useState(tableData || []);
  const [refresh, setRefresh] = useState(false);

  //초기행 선택이었으나 부작용으로 인해 잠시 주석처리..
  useEffect(() => {
    setTableRows(tableData);
    defaultFocus && setRefresh(!refresh);
  }, [tableData]);

  useEffect(() => {
    if (defaultFocus) {
      tableFocus.current = true;
      if (tableData.length !== 0) {
        let defaultRow = 0;
        if (tableData[tableData.length - 1]?.insertedRow) {
          defaultRow = tableData.length - 1;
        }
        setRowRef(defaultRow);
        setColumnRef(0);
        handleRowClick(null, defaultRow, 0);
        actions.setPkValue && actions.setPkValue(getPkValue(defaultRow));
      }
    }
  }, [refresh]);

  //테이블 자신을 가르키는 dom ref
  const myRef = useRef(false);

  //테이블 바디 dom ref
  const tbodyRef = useRef();

  //선택된 로우(인덱스)
  const [rowRef, setRowRef] = useState(-1);

  //선택된 컬럼(인덱스)
  const [columnRef, setColumnRef] = useState(-1);

  //정렬기준 열
  const [orderRef, setOrderRef] = useState(null);

  //오름차순여부 (true면 오름차순, false면 내림차순)
  const [isAsc, setIsAsc] = useState(null);

  //모달 경고창(인풋 pk누락)
  const [confirmModalState, setConfirmModalState] = useState({ show: false });

  //코드헬퍼 모달
  const [modalState, setModalState] = useState({ show: false });

  //테이블 포커스 여부 boolean ref
  const tableFocus = useRef(defaultFocus);

  //해당 테이블만 콘솔로그 찍어보고 싶을때..
  if (tableName === "empAdd") {
    // console.log("tableData", tableData);
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

  //rowRef에 따라서 updatePkValue하기
  useEffect(() => {
    actions.setPkValue && actions.setPkValue(getPkValue(rowRef));
  }, [tableRows, rowRef]);

  // modal창이 뜨면 테이블 포커스를 비활성화
  useEffect(() => {
    if (modalState.show || confirmModalState.show) tableFocus.current = false;
    else tableFocus.current = true;
  }, [modalState, confirmModalState]);

  //로우와 컬럼 ref 해제 함수
  const releaseSelectedRef = useCallback(() => {
    setRowRef(-1);
    setColumnRef(-1);
  }, []);

  // 수정 중인 행의 index를 찾는 함수
  const editableRowIndex = useMemo(() => {
    return tableRows.findIndex((item) => item.isEditable);
  }, [tableRows]);

  //////// 랜더링 후에 처리할 SideEffect //////////
  useEffect(() => {
    //수정으로 바뀌면 해당 셀에 오토포커스
    if (editableRowIndex !== -1) {
      const columnIndex = showCheckbox ? columnRef + 1 : columnRef;
      const input =
        tbodyRef.current.children[rowRef].children[columnIndex].querySelector(
          "input, select"
        );
      input && input.focus();
      // focusAtEnd(input);
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
    if (editableRowIndex !== -1) {
      const newTableRows = tableRows.map((row) => {
        return { ...row, isEditable: false };
      });
      setTableRows(newTableRows);
      return newTableRows;
    }
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
  const getInputElements = useCallback((event, rowIndex, columnIndex) => {
    return tbodyRef.current.children[rowIndex].querySelectorAll(
      "input, select"
    );
  }, []);

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
      if (editableRowIndex !== rowIndex) {
        removeNewRow(rowIndex);
        releaseEditable(rowIndex);
      }
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
    (inputs, columnIndex) => {
      for (let input of inputs) {
        if (input.type === "checkbox") continue;
        let inputIndex = tableHeaders.findIndex(
          (header) => header.field === input.id
        );
        if (tableHeaders[inputIndex].isPk)
          if (input.value === "" || !input.value) return false;
      }
      return true;
    },
    [tableHeaders]
  );

  const findKeyByValue = (obj, value) => {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return null;
  };

  const findKeyInCodeValue = (value) => {
    for (let type in CODE_VALUE) {
      const key = findKeyByValue(CODE_VALUE[type], value);
      if (key) {
        return key;
      }
    }
    return null;
  };

  // 수정중인 행의 모든 입력필드를 업데이트한 행을 반환하는 함수
  const getEditedRow = useCallback(
    (event, rowIndex, columnIndex) => {
      let editedRow = {
        ...tableRows[rowIndex],
        isEditable: false,
        isNew: tableRows[rowIndex]?.isNew,
      };

      const currentRowInputs = getInputElements(event, rowIndex, columnIndex);

      // 입력필드에 pk값이 누락되었는지 체크
      if (!isValidRow(currentRowInputs, columnIndex)) return false;

      // 각 입력 필드의 값을 editedRow에 업데이트
      currentRowInputs.forEach((input, index) => {
        const field = input.id;
        const type = tableHeaders[index]?.type;
        if (type && type === "textCodeHelper") {
          editedRow.item[field] = findKeyInCodeValue(input.value);
        } else {
          editedRow.item[field] = input.value;
        }
      });

      return editedRow;
    },
    [tableRows, getInputElements, isValidRow]
  );

  // 수정한 행에서 엔터키 입력 이벤트 처리
  const TdKeyDownHandler = useCallback(
    (event, rowIndex, columnIndex) => {
      event.preventDefault();
      event.stopPropagation();
      if (readOnly) {
        onRowClick();
        return;
      }
      if (event.key === "Enter" && editableRowIndex !== -1) {
        const editedRow = getEditedRow(event, rowIndex, columnIndex);

        if (!editedRow) {
          tableFocus.current = false;
          setConfirmModalState({
            show: true,
            message: "필수입력값 누락",
            onlyConfirm: true,
            onConfirm: () => setConfirmModalState({ show: false }),
          });
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

  //수정행에 대한 TextBoxComponent 반환함수
  const getInputTd = useCallback(
    (rowIndex, columnIndex) => {
      const row = tableRows[rowIndex];
      const type = tableHeaders[columnIndex].type;
      const field = tableHeaders[columnIndex].field;
      switch (type) {
        case "select":
          return (
            <SelectForm
              id={field}
              optionList={tableHeaders[columnIndex].optionList}
              selectedOption={row.item[field]}
              onEnter={(e) => {
                TdKeyDownHandler(e, rowIndex, columnIndex);
              }}
              // onChange={(e, value) => {
              //   let EditedRow = { ...tableRows[rowIndex] }.item;
              //   EditedRow[field] = value;
              //   actions.updateEditedRow(EditedRow);
              // }}
            />
          );
        case "date":
          return (
            <TextBoxComponent
              type="date"
              id={field}
              value={row.isNew ? "" : row.item[field]}
              onEnter={(e) => TdKeyDownHandler(e, rowIndex, columnIndex)}
            />
          );
        case "textCodeHelper":
          return (
            <TextBoxComponent
              id={field}
              type="text"
              value={getTdValue(rowIndex, columnIndex)}
              readOnly
              onEnter={(e) => {
                TdKeyDownHandler(e, rowIndex, columnIndex);
              }}
              onClickCodeHelper={(setInputValue) => {
                let codeHelperData = codeHelper[field];

                setModalState({
                  show: true,
                  title: codeHelperData.title,
                  tableHeaders: codeHelperData.headers,
                  tableData: codeHelperData.tableData,
                  searchField: codeHelperData.searchField,
                  usePk: codeHelperData.usePk,
                  setRowData: (e, pkValue) => {
                    let codeHelperData = codeHelper[field];
                    let tableData = codeHelperData.tableData;
                    const value = pkValue[field];
                    let targetIndex = tableData.findIndex(
                      (row) => row.item[field] === value
                    );
                    const newField =
                      field.charAt(0).toUpperCase() + field.slice(1);
                    setInputValue(
                      targetIndex !== -1
                        ? tableData[targetIndex].item[`nm${newField}`]
                        : ""
                    );
                  },
                });
              }}
            />
          );
        case "rate":
          return (
            <TextBoxComponent
              id={field}
              type={"number"}
              readOnly={!row.isEditable}
              onEnter={(e) => TdKeyDownHandler(e, rowIndex, columnIndex)}
              value={row.isNew ? "" : row.item[field]}
              placeholder="0~100 사이 숫자입력"
              rate
              step="0.1"
            />
          );
        // case "number":
        // return (
        //   <TextBoxComponent
        //     id={field}
        //     type={"commaNumber"}
        //     readOnly={!row.isEditable}
        //     onEnter={(e) => TdKeyDownHandler(e, rowIndex, columnIndex)}
        //     value={row.isNew ? "" : row.item[field]}
        //     placeholder = "숫자입력"
        //     processThousandSeparator
        //   />
        // );
        default: // 타입이 명시되지않으면 일반 text 타입 반환
          return (
            <TextBoxComponent
              id={field}
              type={type || "text"}
              readOnly={!row.isEditable}
              onEnter={(e) => TdKeyDownHandler(e, rowIndex, columnIndex)}
              value={row.isNew ? "" : row.item[field]}
              thousandSeparator={type === "number" || true}
            />
          );
      }
    },
    [codeHelper, tableHeaders, tableRows]
  );

  const getTdValue = useCallback(
    (rowIndex, columnIndex) => {
      const type = tableHeaders[columnIndex]?.type;
      const field = tableHeaders[columnIndex].field;
      const value = tableRows[rowIndex].item[field];
      switch (type) {
        case "select":
          let selectFormValue;
          const optionList = tableHeaders[columnIndex].optionList;
          optionList.forEach((option, index) => {
            if (option.key === value) selectFormValue = option.value;
          });
          return selectFormValue;
        case "textCodeHelper":
          let codeHelperData = codeHelper[field];
          let tableData = codeHelperData.tableData;
          let targetIndex = tableData.findIndex(
            (row) => row.item[field] === value
          );
          const newField = field.charAt(0).toUpperCase() + field.slice(1);
          return targetIndex !== -1
            ? tableData[targetIndex].item[`nm${newField}`]
            : "";
        case "number":
          return makeCommaNumber(value);
        default:
          const row = tableRows[rowIndex];
          return row.isNew ? "" : row.item[field];
      }
    },
    [tableRows, tableHeaders]
  );

  //테이블 바깥 영역 클릭 핸들러 함수
  const tableMouseDownHandler = useCallback(
    (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        if (tableFocus.current) {
          setColumnRef(-1);
          if (!actions.setPkValue) setRowRef(-1);
          removeNewRow();
          releaseEditable();
          tableFocus.current = false;
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
        if (editableRowIndex !== -1) {
          switch (event.key) {
            case "Escape":
              removeNewRow();
              releaseEditable();
              break;
            case "Tab":
              event.preventDefault();
              if (event.shiftKey) {
                if (columnRef > 0) setColumnRef(columnRef - 1);
              } else {
                if (columnRef < tableHeaders.length - 1)
                  setColumnRef(columnRef + 1);
              }
              break;
            default:
              break;
          }
        }

        if (editableRowIndex === -1) {
          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              if (rowRef < tableRows.length) {
                setRowRef(rowRef + 1);
                if (!rowAddable && rowRef === tableRows.length - 1)
                  setRowRef(rowRef);
              }
              break;

            case "ArrowUp":
              event.preventDefault();
              if (rowRef > 0) {
                setRowRef(rowRef - 1);
              }
              break;

            case "ArrowLeft":
              event.preventDefault();
              if (columnRef > 0) setColumnRef(columnRef - 1);
              break;

            case "ArrowRight":
              event.preventDefault();
              if (columnRef < tableHeaders.length - 1)
                setColumnRef(columnRef + 1);
              break;

            case "Home":
              event.preventDefault();
              setRowRef(0);
              break;

            case "End":
              event.preventDefault();
              setRowRef(rowAddable ? tableRows.length : tableRows.length - 1);
              break;

            case "Enter":
              onRowClick && onRowClick(event, tableRows[rowRef].item);
              event.preventDefault();
              event.stopPropagation();
              if (editableRowIndex === -1 && rowRef > -1) {
                if (rowRef === tableRows.length) {
                  if (actions.newRowCodeHelper) {
                    tableFocus.current = false;
                    actions.newRowCodeHelper(tableFocus);
                    return;
                  }
                  pushNewRow();
                }
                if (!readOnly) setEditableRow(rowRef);
              }
              break;

            case " ":
              event.preventDefault();
              showCheckbox && checkboxHandler(rowRef);
              break;

            case "Delete":
              event.preventDefault();
              if (rowAddable && rowRef === tableRows.length) return;
              tableFocus.current = false;
              setConfirmModalState({
                show: true,
                message: "해당 행을 삭제하시겠습니까?",
                onConfirm: () => {
                  actions.deleteRow(tableRows[rowRef]);
                  deleteRow(rowRef);
                  setConfirmModalState({ show: false });
                },
                onHide: () => {
                  setConfirmModalState({ show: false });
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
                onClick={
                  sortable ? (e) => rowsOrderHandler(e, thead.field) : null
                }
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
                    {row.isEditable && !thead.readOnly ? (
                      getInputTd(rowIndex, columnIndex)
                    ) : (
                      <div className="tableContents">
                        {getTdValue(rowIndex, columnIndex)}
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
              className={`sticky-row ${getRowClassName({}, tableRows.length)}`}
              onDoubleClick={(e) => {
                actions.newRowCodeHelper
                  ? actions.newRowCodeHelper(tableFocus)
                  : handleDoubleClick(e, tableRows.length);
              }}
            >
              {showCheckbox && (
                <td className="d-flex justify-content-center">
                  <div>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() =>
                        actions.newRowCodeHelper &&
                        actions.newRowCodeHelper(tableFocus)
                      }
                    />
                  </div>
                </td>
              )}

              {tableHeaders.map((thead, columnIndex) => (
                <td
                  className={getTdClassName(tableRows.length, columnIndex)}
                  key={columnIndex}
                  onClick={(e) =>
                    handleRowClick(e, tableRows.length, columnIndex)
                  }
                >
                  <div className="tableContents">
                    {!showCheckbox && columnIndex === 0 && (
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() =>
                          actions.newRowCodeHelper &&
                          actions.setCodeHelper(tableFocus)
                        }
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
        show={confirmModalState.show}
        message={deleteMessage || confirmModalState.message}
        onlyConfirm={confirmModalState.onlyConfirm}
        onConfirm={() => {
          confirmModalState.onConfirm();
          tableFocus.current = true;
        }}
        onHide={() => {
          confirmModalState.onHide();
          tableFocus.current = true;
        }}
      ></ConfirmComponent>
      <ModalComponent
        title={modalState.title}
        size={modalState.size}
        show={modalState.show}
        onHide={() => {
          setModalState({ show: false });
          tableFocus.current = true;
        }}
      >
        {modalState.message ? (
          modalState.message
        ) : (
          <CodeHelperModal
            setRowData={modalState.setRowData}
            tableHeaders={modalState.tableHeaders}
            tableData={modalState.tableData}
            searchField={modalState.searchField}
            usePk={modalState.usePk}
            onHide={() => setModalState({ show: false })}
          />
        )}
      </ModalComponent>
    </>
  );
};

TableForm.defaultProps = {
  tableHeaders: [],
  tableData: [],
};

TableForm.propTypes = {
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

export default TableForm;
