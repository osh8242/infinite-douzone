// 작성자 : 오승환
// 1. 파라미터 설명
// label : 선택폼의 라벨명
// optionList : 선택폼의 옵션리스트 (ex. optionList = [{key:name, value:"이름"}, {key:birth-date, value:"생년월일"}])

// 2. 사용예시
//    const optionList = [
//      { key: "ename", value: "이름" },
//      { key: "ecode", value: "사원번호" },
//    ];
//
//    <SelectForm label="구분" optionList={optionList}/>
//

import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function SelectForm({ label, optionList, selectRef }) {
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
        <Form.Select ref={selectRef}>
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
