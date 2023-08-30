import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import SearchPanel from './SearchPanel';
import TextBoxComponent from './TextBoxComponent';

const CodeHelpComponent = ({ onRowClick, table, setData }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (pk) => {
    setSelectedRow(pk);
    setData(pk);
    onRowClick();
  };

  const filteredData = table.tableData.filter((row) =>
    row.pk.includes(searchTerm)
  );

  return (
    <div className="container">
      <Form.Group>
        <SearchPanel>
          <TextBoxComponent 
            label={"검색"} 
            value={searchTerm} 
            onChange={setSearchTerm}
          />
        </SearchPanel>
      </Form.Group>
      <Table>
        <thead>
          <tr onClick={(e) => handleRowClick(e)}>
            {table.tableHeaders.map((header) => (
              <th key={header.field}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''} onClick={() => handleRowClick(row.pk)}>
              {Object.keys(row).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CodeHelpComponent;
