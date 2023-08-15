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
  const [arrowDirection, setArrowDirection] = useState(true);

  // 이후 체크박스 ... 수정
  //const handleCheckboxChange = (event, id) => {
  //   // ...
  // };

  const handleDoubleClick = (rowIndex) => {
    setEditableRowIndex(rowIndex);
    setActiveRowIndex(rowIndex);
  };

  const handleInputChange = (event, rowIndex, columnName) => {
    const updatedEditedData = { ...editedData };
    updatedEditedData[rowIndex] = {
      ...updatedEditedData[rowIndex],
      [columnName]: event.target.value,
    };
    setEditedData(updatedEditedData);
  };

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

  const handleArrowDirection = (e) => {
    setArrowDirection(!arrowDirection);
  };

  return (
    <>
      <Table striped bordered hover>
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
                  {/* toggle event 로 전환 */}
                  <div onClick={handleArrowDirection}>
                    {arrowDirection ? (
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
