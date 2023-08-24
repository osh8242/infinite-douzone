import React from 'react';
import {
  faSortUp,
  faSortDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/tableForm.css';

const TableTemp = (
  showCheckbox,
  showHeaderArrow,
  tableData,
  rowClickHandler,
  minRow,
) => {
  return 1 > 0 ? (
    <>
      <Table size={'sm'} bordered hover>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        {/* content */}
        <tbody></tbody>
      </Table>
    </>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default TableTemp;
