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
    const value = formData.item?.[input.field] || "";
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
            label={LABELS[input.field]}
            disabled={disabled}
            optionList={SELECT_LIST[input.field]}
            selectedOption={value}
            onChange={submitData}
          />
        );
        break;
      case INPUT_TYPE.radio:
        component = (
          <RadioForm
            id={id}
            label={LABELS[input.field]}
            disabled={disabled}
            optionList={RADIO_LIST[input.field]}
            checked={value}
            onChange={submitData}
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
      mdSum += inputs[j].span ? Math.min(defaultMd * inputs[j].span, 12) : defaultMd;
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
