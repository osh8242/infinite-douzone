// 작성자 : 오승환
// SelectForm 사용시 필수 parameter
// label : 라벨이름
// optionList : 선택옵션명 (리스트)

// 사용예시
/* 
  <SelectForm label="구분" optionList=[
    {key : "empName",   value : "사원명"},
    {key : "birthDate", value : "생년월일"},
    {key : "age",       value : "나이"}
  ]/> 
*/

import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function SelectForm({ label, optionList }) {
  return (
    <Row className="py-1">
      {label && (
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
      )}
      <Col className="d-flex align-items-center justify-content-center">
        <Form.Select>
          {optionList.map((option, index) => (
            <option value={option.key} key={index}>
              {option.value}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SelectForm;
