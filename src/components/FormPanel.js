import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import {
  INPUT_TYPE,
  LABELS,
  RADIO_LIST,
  SELECT_LIST,
} from "../model/CommonConstant.js";
import AddressForm from "../../src/components/AddressForm.js";
import RadioForm from "./RadioForm";
import SelectForm from "./SelectForm.js";
import TextBoxComponent from "./TextBoxComponent";
import NoSocialFormForEmpRegister from "./NoSocialFormForEmpRegister.js";
const FormPanel = ({
  INPUT_CONSTANT,
  formData,
  submitData,
  columnNumber = 2,
  id,
}) => {
  const defaultMd = 12 / columnNumber;
  const columns = [];
  const wrappingColTag = (input, index, span = 1) => {
    let md = defaultMd * span;
    if (md > 12) md = 12;
    return (
      <Col xs md={md} key={index}>
        {input}
      </Col>
    );
  };
  const inputs = INPUT_CONSTANT;
  inputs.forEach((input, index) => {
    let component;
    const id = input.field;
    const label = input.label || LABELS[input.field] || "라벨없음";
    const value = input.value || formData.item?.[input.field] || "";
    // AddressForm 관련 변수들.. 나중에 깔끔하게 수정 예정...
    const isZonecode = input.isZonecode || false; //
    const zipHome = input.zipHome || ""; //
    const addHome1 = input.addHome1 || ""; //
    const addHome2 = input.addHome2 || ""; //
    // 주민번호 관련 변수들.. 나중에 깔끔하게 수정 예정...
    const ynFor = input.ynFor || ""; //
    const fgSex = input.fgSex || ""; //
    const noSocial = input.noSocial || ""; //
    const pkValue = input.pkValue || ""; // 나중에 삭제 예정..
    const actions = input.actions || []; // 나중에 삭제 예정..
    const disabled = input.disabled;
    switch (input.type) {
      case INPUT_TYPE.text:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            disabled={disabled}
            value={value}
            onEnter={submitData}
          />
        );
        break;
      case INPUT_TYPE.date:
        component = (
          <TextBoxComponent
            type={"date"}
            id={id}
            label={label}
            disabled={disabled}
            value={value}
            onChange={submitData}
          />
        );
        break;
      case INPUT_TYPE.select:
        component = (
          <SelectForm
            id={id}
            label={label}
            disabled={disabled}
            optionList={input?.optionList || SELECT_LIST[input.field]}
            selectedOption={value}
            onChange={submitData}
          />
        );
        break;
      case INPUT_TYPE.radio:
        component = (
          <RadioForm
            id={id}
            label={label}
            disabled={disabled}
            optionList={input?.optionList || RADIO_LIST[input.field]}
            checked={value}
            onChange={submitData}
          />
        );
        break;
      // 나중에 깔끔하게 정리할 예정
      case INPUT_TYPE.address:
        component = (
          <AddressForm
            // id={id}
            label={label}
            disabled={disabled}
            isZonecode={isZonecode}
            zipHome={zipHome}
            addHome1={addHome1}
            addHome2={addHome2}
            pkValue={pkValue}
            actions={actions}
          />
        );
        break;
      case INPUT_TYPE.callNumber:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            type="callNumber"
            value={value}
            // onEnter={submitData}
          />
        );
        break;
      case INPUT_TYPE.email:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            type="email"
            value={value}
            // onEnter={submitData}
          />
        );
        break;
      case INPUT_TYPE.noSocial:
        component = (
          <NoSocialFormForEmpRegister
            label={label}
            ynFor={ynFor}
            fgSex={fgSex}
            noSocial={noSocial}
            pkValue={pkValue}
          />
        );
        break;
      default:
        break;
    }
    columns.push(wrappingColTag(component, input, input.span));
  });
  const rows = [];
  for (let i = 0; i < columns.length; ) {
    let mdSum = 0;
    let tempRow = [];
    for (let j = i; j < columns.length; j++) {
      mdSum += inputs[j].span
        ? Math.min(defaultMd * inputs[j].span, 12)
        : defaultMd;
      if (mdSum <= 12) {
        tempRow.push(columns[j]);
        i++;
      } else break;
    }
    rows.push(<Row key={i}>{tempRow}</Row>);
  }
  return <div id={id}>{rows}</div>;
};
FormPanel.defaultProps = {
  formData: { item: {} },
  submitData: () => {
    console.log("HrMainTab.js", "submitData", "default");
  },
  columnNumber: 2,
};
FormPanel.propsTypes = {
  INPUT_CONSTANT: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  submitData: PropTypes.func,
  columnNumber: PropTypes.number,
};
export default FormPanel;
