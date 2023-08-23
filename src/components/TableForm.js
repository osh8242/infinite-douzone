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
import {
  faArrowDown,
  faArrowUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/tableForm.css";

// const dummyData = [
//   {
//     code: "A1234567",
//     사원명: "오승환",
//     "내/외": "내국인",
//     주민번호: "910101-1234567",
//     구분: "재직",
//   },
//   {
//     code: "B2345678",
//     사원명: "이서연",
//     "내/외": "외국인",
//     주민번호: "920202-2345678",
//     구분: "재직",
//   },
//   {
//     code: "C3456789",
//     사원명: "현소현",
//     "내/외": "내국인",
//     주민번호: "930303-3456789",
//     구분: "퇴직",
//   },
//   {
//     code: "D4567890",
//     사원명: "김진",
//     "내/외": "외국인",
//     주민번호: "940404-4567890",
//     구분: "재직",
//   },
//   {
//     code: "E5678901",
//     사원명: "김이긴",
//     "내/외": "내국인",
//     주민번호: "950505-5678901",
//     구분: "퇴직",
//   },
// ];

const TableForm = ({ showCheckbox, showHeaderArrow, tableData }) => {
  // 예외처리 방법은 추후 수정
  // if (!tableData || tableData.length === 0) {
  //   return (
  //     <div>
  //       <h3>해당되는 데이터가 존재하지 않습니다.</h3>
  //     </div>
  //   );
  // }

  const columns = Object.keys(tableData[0]);

  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const [checkBoxStates, setCheckBoxStates] = useState(
    tableData.map(() => false)
  );

  const [arrowDirections, setArrowDirections] = useState(
    columns.reduce((arrowStates, columnName) => {
      arrowStates[columnName] = true;
      return arrowStates;
    }, {})
  );

  // 더블 클릭 시 해당 row 를 editable row 로 변경 (편집 가능)
  const handleDoubleClick = useCallback((rowIndex) => {
    setEditableRowIndex(rowIndex);
  });

  // //////////////////////////////////////////////////////////////// 더블 클릭 후 편집한 데이터 -> DB 연결 이후 실반영되도록 수정 예정
  const handleInputChange = useCallback((event, rowIndex, columnName) => {
    const updatedEditedData = { ...editedData };
    updatedEditedData[rowIndex] = {
      ...updatedEditedData[rowIndex],
      [columnName]: event.target.value,
    };
    setEditedData(updatedEditedData);
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // editable row 이외 row 클릭 시 해당 row 비활성화
  const handleRowClick = useCallback((e, rowIndex) => {
    let index = { showCheckbox } ? 1 : 0;
    let id = e.currentTarget.children[index].children[0].textContent;
    if (rowClickHandler) rowClickHandler(id);
    if (editableRowIndex !== rowIndex) {
      setEditableRowIndex(null);
    } else {
      setEditableRowIndex(rowIndex);
    }
  });

  // handle all check
  const handleAllCheckboxChange = useCallback(() => {
    // checkboxStates 배열 중 false 인 요소가 하나라도 있는지 확인
    // 하나 이상 있는 경우 아이콘 클릭 시 전체 checkBox checked
    if (checkBoxStates.some((state) => !state)) {
      setCheckBoxStates(tableData.map(() => true));
    } else {
      // 전체 unchecked
      setCheckBoxStates(tableData.map(() => false));
    }
  });

  // handle check
  const handleCheckboxChange = useCallback((index) => {
    // checkBox 의 Status 복제
    setCheckBoxStates((prevStates) => {
      const newStates = [...prevStates];
      // check <-> unchecked
      newStates[index] = !newStates[index];
      return newStates;
    });
  });

  // handle table arrow -> DB 연결 이후 order by parameter 변경하여 주도록 수정 예정
  const handleArrowDirection = useCallback((columnName) => {
    // arrowDirection 의 Status 복제
    setArrowDirections((prevDirections) => ({
      ...prevDirections,
      // 클릭 시 arrowDirection toggle
      [columnName]: !prevDirections[columnName],
    }));
  });

  return (
    <>
      <Table size={'sm'} striped bordered hover>
        {/* header */}
        <thead>
          <tr>
            {/* checkBox 상단 아이콘 */}
            {showCheckbox && (
              <th id="tableCheckBoxHeader">
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={handleAllCheckboxChange}
                />
              </th>
            )}
            {/* th columns */}
            {columns.map((columnName, index) => (
              <th key={index}>
                <div
                  className="tableHeader"
                  onClick={() => handleArrowDirection(columnName)}
                >
                  <div>{columnName}</div>
                  {showHeaderArrow && (
                    <div id="tableHeader-arrow">
                      {arrowDirections[columnName] ? (
                        <FontAwesomeIcon icon={faArrowUp} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} />
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
                onClick={(e) => {
                  if (!editableRowIndex) handleRowClick(e, rowIndex);
                }}
              >
                {/* 각 row 의 checkBox */}
                {showCheckbox && (
                  <td>
                    <div className="tableCheckBoxArea">
                      <input
                        type="checkbox"
                        checked={checkBoxStates[rowIndex]}
                        onChange={() => handleCheckboxChange(rowIndex)}
                      />
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
                          size="text"
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
        </tbody>
      </Table>
    </>
  );
};

export default TableForm;
