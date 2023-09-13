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

import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

SelectForm.defaultProps = {
  optionList: [],
};

function SelectForm(props) {
  const {
    label,
    optionList,
    selectedOption,
    selectRef,
    onChange,
    subLabel,
    endLabel,
  } = props;

  const handleSelectChange = (event) => {
    const selectedValue = selectRef ? selectRef.current.value : event.target.value;
    if (onChange) onChange(selectedValue);
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
          {subLabel ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ marginLeft: 15, marginRight: 15 }}
            >
              {subLabel}
            </div>
          ) : (
            ""
          )}

        <Form.Select ref={selectRef} onChange={(e) => handleSelectChange(e)}>
          {optionList.map((option, index) => (
            <option
              value={option.key}
              key={index}
              selected={option.key === selectedOption}
            >
              {option.value}
            </option>
          ))}
        </Form.Select>
        {endLabel ? (
          <Col md={2} style={{ marginLeft: 15, marginRight: 15 }}>
            {endLabel}
          </Col>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
}

export default SelectForm;
