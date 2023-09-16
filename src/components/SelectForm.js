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

import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

SelectForm.defaultProps = {
  optionList: [],
};

function SelectForm(props) {
  const {
    id,
    label,
    optionList,
    selectedOption,
    selectRef,
    onChange,
    subLabel,
    endLabel,
  } = props;

  const [selectedValue, setSelectedValue] = useState(selectedOption);
  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    const newValue = selectRef ? selectRef.current.value : event.target.value;
    if (onChange) onChange(event, newValue);
    setSelectedValue(newValue);
  };

  return (
    <Row>
      <div className="py-1 widthFull labelAndContent">
        {label && (
          // <div className="d-flex align-items-center justify-content-center">
          <div className="label">{label}</div>
        )}
        {/* <div className="d-flex align-items-center justify-content-center"> */}
        <div className="widthFull d-flex align-items-center justify-content-center">
          {subLabel && (
            <Col md={2} style={{ marginLeft: 50, marginRight: 5 }}>
              {subLabel}
            </Col>
          )}

          <Form.Select
            id={id}
            ref={selectRef}
            value={selectedValue}
            onChange={(e) => handleSelectChange(e)}
          >
            {optionList.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
          {endLabel && (
            <Col md={2} style={{ marginLeft: 10, marginRight: 50 }}>
              {endLabel}
            </Col>
          )}
        </div>
      </div>
    </Row>
  );
}

export default SelectForm;
