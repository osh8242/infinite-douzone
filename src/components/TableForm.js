// 작성자 : 김진
// parameter : showCheckbox, tableData
// showCheckbox : true 일 경우 체크박스 생성, false 체크박스 제거
// tableData : table 로 만들 데이터

import React, { useCallback, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

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

const TableForm = ({ showCheckbox, tableData }) => {
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
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const [arrowDirections, setArrowDirections] = useState(
    columns.reduce((acc, col) => {
      acc[col] = true;
      return acc;
    }, {})
  );

  // 더블 클릭 시 편집 가능
  const handleDoubleClick = (rowIndex) => {
    setEditableRowIndex(rowIndex);
    setActiveRowIndex(rowIndex);
  };

  // 더블 클릭 후 편집한 데이터 -> DB 연결 이후 실반영되도록 수정 예정
  const handleInputChange = (event, rowIndex, columnName) => {
    const updatedEditedData = { ...editedData };
    updatedEditedData[rowIndex] = {
      ...updatedEditedData[rowIndex],
      [columnName]: event.target.value,
    };
    setEditedData(updatedEditedData);
  };

  // focus 외 요소 클릭 시 readOnly 속성 부여 (비활성화)
  const handleRowClick = (rowIndex) => {
    if (activeRowIndex === rowIndex) {
      return;
    }
    // 활성화 이후 다른 곳 클릭 시 활성화 제거
    if (editableRowIndex !== null && editableRowIndex !== activeRowIndex) {
      setEditableRowIndex(null);
    }
    setActiveRowIndex(rowIndex);
  };

  // handle table arrow -> DB 연결 이후 order by parameter 변경하여 주도록 수정 예정
  const handleArrowDirection = (columnName) => {
    setArrowDirections((prevDirections) => ({
      ...prevDirections,
      [columnName]: !prevDirections[columnName],
    }));
  };

  return (
    <>
      <Table striped bordered hover>
        {/* header */}
        <thead>
          <tr>
            {showCheckbox && (
              <th>
                <FontAwesomeIcon icon={faCheck} />
              </th>
            )}
            {columns.map((columnName, index) => (
              <th key={index}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{columnName}</div>
                  <div onClick={() => handleArrowDirection(columnName)}>
                    {arrowDirections[columnName] ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </div>
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
                onClick={() => handleRowClick(rowIndex)}
              >
                {showCheckbox && (
                  <td>
                    <input type="checkbox" />
                  </td>
                )}
                {columns.map((columnName, columnIndex) => (
                  <td key={columnIndex}>
                    {editableRowIndex === rowIndex ? (
                      <input
                        type="text"
                        value={
                          editedData[rowIndex]?.[columnName] || item[columnName]
                        }
                        onChange={(event) =>
                          handleInputChange(event, rowIndex, columnName)
                        }
                      />
                    ) : (
                      item[columnName]
                    )}
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
