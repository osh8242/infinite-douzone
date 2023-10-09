// 작성자 : 오승환
// 1. 파라미터 설명
// label : 선택폼의 라벨명
// optionList : 선택폼의 옵션리스트 (ex. optionList = [{key:name, value:"이름"},
// { key: birth - date, value: "생년월일" }])

// 2. 사용예시
//    const optionList = [
//      { key: "ename", value: "이름" },
//      { key: "ecode", value: "사원번호" },
//    ];
//    <SelectForm label="구분" optionList={optionList}/>
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../styles/commonComponent.css";
import "../styles/fonts.css";

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
    onEnter,
    onChange,
    subLabel,
    endLabel,
    disabled,
  } = props;

  const [selectedValue, setSelectedValue] = useState(optionList[0].key || "");
  const [isDisabled, setDisabled] = useState();

  useEffect(() => {
    if (disabled) setDisabled(true);
    else setDisabled(false);
  }, [isDisabled]);

  useEffect(() => {
    setSelectedValue(selectedOption || "");
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    const newValue = selectRef ? selectRef.current.value : event.target.value;
    if (onChange) onChange(event, newValue);
    // console.log(newValue);
    setSelectedValue(newValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Select가 펼쳐져 있는지 확인
      if (!event.target.size) {
        // Select가 닫혀있는 상태에서 엔터 키를 눌렀을 때
        if (onEnter) {
          console.log("셀렉트폼 엔터");
          event.preventDefault();
          event.stopPropagation();
          onEnter(event, event.target.value);
        }
      }
    }
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
                    disabled={isDisabled}
                    className="p-10"
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
            <div className="widthFull">
              <Form.Select
                id={id}
                ref={selectRef}
                value={selectedValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleSelectChange(e)}
                disabled={isDisabled}
              >
                {optionList.map((option, index) => (
                  <option value={option.key} key={index}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}

export default SelectForm;
