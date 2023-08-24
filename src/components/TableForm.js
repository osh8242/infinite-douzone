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
} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/tableForm.css';

const TableForm = ({ showCheckbox, showHeaderArrow, tableData, rowClickHandler}) => {
  // 예외처리 방법은 추후 수정
  // if (!tableData || tableData.length === 0) {
  //   return (
  //     <div>
  //       <h3>해당되는 데이터가 존재하지 않습니다.</h3>
  //     </div>
  //   );
  // }

  const columns = tableData?.[0] ? Object.keys(tableData[0]) : [];

  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const [checkBoxStates, setCheckBoxStates] = useState(
    columns.map(() => false),
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
    if (editableRowIndex !== rowIndex) {
      let index = showCheckbox ? 1 : 0;
      let id = e.currentTarget.children[index].children[0].textContent;
      if (rowClickHandler) rowClickHandler(id);
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
      setCheckBoxStates(columns.map(() => true));
    } else {
      // 전체 unchecked
      setCheckBoxStates(columns.map(() => false));
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

  return columns.length > 0 ? (
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
                onClick={(e) => handleRowClick(e, rowIndex)}
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
                          type="text"
                          value={
                            editedData[rowIndex]?.[columnName] ||
                            item[columnName]
                          }
                          onChange={(event) =>
                            handleInputChange(event, rowIndex, columnName)
                          }
                          onClick={(event)}
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
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableForm;
