import React from "react";
import { Table } from "react-bootstrap";

// const initialData = [
//   { row1: "col1_value1", row2: "col2_value1", row3: "col3_value1" },
//   { row1: "col1_value2", row2: "col2_value2", row3: "col3_value2" },
//   { row1: "col1_value3", row2: "col2_value3", row3: "col3_value3" },
// ];

const TableForm = (props) => {
  const { data } = props;

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((columnName, columnIndex) => (
                <td key={columnIndex}>{item[columnName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableForm;
