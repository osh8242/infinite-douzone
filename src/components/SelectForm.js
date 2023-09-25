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
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../styles/commonComponent.css";

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

  const [selectedValue, setSelectedValue] = useState(selectedOption || "");
  useEffect(() => {
    setSelectedValue(selectedOption || "");
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    const newValue = selectRef ? selectRef.current.value : event.target.value;
    if (onChange) onChange(event, newValue);
    console.log(newValue);
    setSelectedValue(newValue);
  };

  return (
    <Row className="py-1">
      <div className="labelAndContent">
        {label && <div className="label">{label}</div>}
        <div className="widthFull d-flex align-items-center justify-content-center">
          {subLabel ? (
            <div className="widthFull d-flex align-items-center justify-content-between">
              <div className="widthFull d-flex align-items-center">
                <div
                  style={{ width: "28%" }}
                  className="d-flex justify-content-end"
                >
                  {subLabel}
                </div>
                <div
                  style={{
                    width: "38%",
                    paddingLeft: 20,
                  }}
                >
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
                </div>
                <div
                  className="d-flex justify-content-start"
                  style={{
                    width: "30%",
                    paddingLeft: 10,
                  }}
                >
                  {endLabel}
                </div>
              </div>
            </div>
          ) : (
            // 일반 Select
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
          )}
        </div>
      </div>
    </Row>
  );
}

export default SelectForm;
