import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import SearchPanel from './SearchPanel';
import TextBoxComponent from './TextBoxComponent';

const CodeHelpComponent = ({onRowClick, tableData, setData}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleRowClick = (pk) => {
    setSelectedRow(pk);
    setData(pk);
    onRowClick();
  };

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Form.Group>
        <SearchPanel>
            <TextBoxComponent label={"검색"} value={searchTerm} onChange={setSearchTerm} />
        </SearchPanel>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>코드번호</th>
            <th>코드이름</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.pk} className={selectedRow === row.pk ? 'selected' : ''}  onClick={() => handleRowClick(row.pk)}>
              <td>{row.pk}</td>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CodeHelpComponent;