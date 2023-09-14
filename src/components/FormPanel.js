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
const FormPanel = ({
  INPUT_CONSTANT,
  formData,
  submitData,
  columnNumber = 2,
  id,
  codeHelperFn,
}) => {
  const defaultMd = 12 / columnNumber;
  const columns = [];
  const wrappingColTag = (component, field, span = 1) => {
    let md = defaultMd * span;
    if (md > 12) md = 12;
    return (
      <Col xs md={md} key={field}>
        {component}
      </Col>
    );
  };
  const inputs = INPUT_CONSTANT;
  inputs.forEach((input, index) => {
    let component = <div>input type null</div>;
    const id = input.field;
    const label = input.label || LABELS[input.field] || "라벨없음";
    const value =
      input.value ||
      formData.item?.[input.field] ||
      formData?.[input.field] ||
      "";

    const isZonecode = input.isZonecode || false; // AddressForm 관련 변수

    const pkValue = input.pkValue || ""; // 나중에 삭제 예정..
    const actions = input.actions || []; // 나중에 삭제 예정..

    const codeHelper = codeHelperFn ? codeHelperFn[input.field] : null; // 배열에서 해당 인덱스의 codeHelperFn 가져오기
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
      case INPUT_TYPE.regNum:
        component = (
          <TextBoxComponent
            type="regNum"
            id={id}
            label={label}
            disabled={disabled}
            value={value}
            onChange={submitData}
          />
        );
        break;
      // 나중에 깔끔하게 정리할 예정
      case INPUT_TYPE.address:
        component = (
          <AddressForm
            label={label}
            disabled={disabled}
            isZonecode={isZonecode}
            zipHome={formData.zipHome}
            addHome1={formData.addHome1}
            pkValue={formData.cdEmp}
            onChange={submitData}
          />
        );
        break;
      case INPUT_TYPE.callNumber:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            type="callNumber"
            value={formData.celEmp1}
            onEnter={submitData}
          />
        );
        break;
      case INPUT_TYPE.email:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            type="email"
            value={formData.emEmp}
            onEnter={submitData}
          />
        );
        break;
      case INPUT_TYPE.textCodeHelper:
        component = (
          <TextBoxComponent
            type="text"
            label={label}
            value={value}
            onClickCodeHelper={codeHelper}
          />
        );
        break;
      default:
        break;
    }
    columns.push(wrappingColTag(component, input.field, input.span));
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
    rows.push(<Row key={`row-${i}`}>{tempRow}</Row>);
  }
  return <div id={id}>{rows}</div>;
};
FormPanel.defaultProps = {
  formData: { item: {} },
  submitData: () => {
    console.log("FormPanel.js", "submitData", "default");
  },
  columnNumber: 2,
};
FormPanel.propsTypes = {
  INPUT_CONSTANT: PropTypes.array.isRequired,
  formData: PropTypes.object,
  submitData: PropTypes.func,
  columnNumber: PropTypes.number,
};
export default FormPanel;
