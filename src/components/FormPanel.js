import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import {
  INPUT_TYPE,
  LABELS,
  RADIO_LIST,
  SELECT_LIST,
} from "../model/CommonConstant.js";
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
  onChange
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
    const value = input.value || formData.item?.[input.field] || "";
    const disabled = input.disabled;
    const codeHelper = codeHelperFn? codeHelperFn[input.field] : null;
    const onChangeFn = onChange? onChange[input.field] : null;

    switch (input.type) {
      case INPUT_TYPE.text:
        component = (
          <TextBoxComponent
            id={id}
            label={label}
            disabled={disabled}
            value={value}
            onEnter={submitData}
            onChange={(e, value) => onChangeFn(value)}
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
      case INPUT_TYPE.textCodeHelper:
        component = (
          <TextBoxComponent
            id={id}
            type="text"
            label={label}
            value={value}
            onClickCodeHelper={codeHelper}
            onChange={(e, value) => onChangeFn(value)}
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
            onChange={(e, value) => {onChangeFn(value); console.log("온체인지");}}
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
