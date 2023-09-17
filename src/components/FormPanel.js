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
import TestAdd from "./TestAdd";
import DateForm from "./DateForm";
const FormPanel = ({
  INPUT_CONSTANT,
  formData,
  submitData,
  columnNumber = 2,
  id,
  codeHelperFn,
  onChange,
  actions,
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
      { formData }.formData[input.field] ||
      "";

    const isZonecode = input.isZonecode || false; // AddressForm 관련 변수

    const codeHelper = codeHelperFn ? codeHelperFn[input.field] : null; // 배열에서 해당 인덱스의 codeHelperFn 가져오기
    const disabled = input.disabled;
    const onChangeFn = onChange ? onChange[input.field] : null;

    switch (input.type) {
      case INPUT_TYPE.text:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            disabled={disabled}
            value={value}
            onEnter={submitData}
            onChange={(e, value) => onChangeFn && onChangeFn(value)}
            // laborContract
            subValue={{ formData }.formData[input.subField]}
            subLabel={input.subLabel}
            endLabel={input.endLabel}
            selectList={input.selectList}
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
      case INPUT_TYPE.month:
        component = (
          <TextBoxComponent
            type={"month"}
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
            // laborContract
            subLabel={input.subLabel}
            endLabel={input.endLabel}
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
      case INPUT_TYPE.address:
        component = (
          <AddressForm
            id={id}
            label={label}
            isZonecode={isZonecode}
            value={value}
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
            value={value}
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
            value={value}
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
      case INPUT_TYPE.dateCodeHelper:
        component = (
          <TextBoxComponent
            id={id}
            type="date"
            label={label}
            value={value}
            onClickCodeHelper={codeHelper}
            onChange={(e, value) => {
              onChangeFn(value);
              console.log("온체인지");
            }}
          />
        );
        break;
      case INPUT_TYPE.addressCustom:
        component = (
          <TestAdd
            id={input.field}
            label={LABELS[input.field]}
            disabled={input.disabled}
            onChange={submitData}
            value={{ formData }.formData[input.field]}
            subValue={{ formData }.formData[input.subField]}
            selectList={input.selectList}
            actions={{
              setEdited: actions.setEditedSwsm,
            }}
          />
        );
        break;
      case INPUT_TYPE.dateCustom:
        component = (
          <DateForm
            id={input.field}
            label={LABELS[input.label]}
            subId={input.subField}
            type={"date"}
            disabled={input.disabled}
            value={{ formData }.formData[input.field]}
            subValue={{ formData }.formData[input.subField]}
            onChange={submitData}
            isPeriod={input.isPeriod}
            labelKey={input.field}
            labelKey2={input.subField}
            valueMd={input.valueMd}
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
  codeHelperFn: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.arrayOf(PropTypes.object),
};
export default FormPanel;
