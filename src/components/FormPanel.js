import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import RadioForm from "../../../components/RadioForm";
import TextBoxComponent from "../../../components/TextBoxComponent";
// 라디오 리스트 상수 [필수]
import { RADIO_LIST, labels } from "../../../model/CommonConstant.js";
// 인풋 상수 [필수]
import { INPUT_TYPE, MAIN_TAB } from "./HrMainTabConstant";

const FormPanel = (props) => {
  const { formData, submitData, columnNumber = 2 } = props;

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

  const inputs = MAIN_TAB.primaryTabInputs;

  inputs.forEach((input, index) => {
    switch (input.type) {
      case INPUT_TYPE.text:
        columns.push(
          wrappingColTag(
            <TextBoxComponent
              id={input.field}
              label={labels[input.field]}
              disabled={input.disabled}
              value={formData.item?.[input.field] || ""}
              onEnter={submitData}
            />,
            index,
            input.span
          )
        );
        break;
      case INPUT_TYPE.date:
        columns.push(
          wrappingColTag(
            <TextBoxComponent
              id={input.field}
              type={"date"}
              label={labels[input.field]}
              disabled={input.disabled}
              value={formData.item?.[input.field] || ""}
              onChange={submitData}
            />,
            index,
            input.span
          )
        );
        break;
      case INPUT_TYPE.select:
        break;
      case INPUT_TYPE.radio:
        columns.push(
          wrappingColTag(
            <RadioForm
              id={input.field}
              label={labels[input.field]}
              disabled={input.disabled}
              optionList={RADIO_LIST[input.field]}
              checked={formData.item?.[input.field]}
              onChange={submitData}
            />,
            index,
            input.span
          )
        );
        break;
      default:
        break;
    }
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

  return <>{rows}</>;
};

FormPanel.defaultProp = {
  formData: { item: {} },
  submitData: () => {
    console.log("HrMainTab.js", "submitData", "default");
  },
  columnNumber: 2,
};

FormPanel.propsTypes = {
  formData: PropTypes.object.isRequired,
  submitData: PropTypes.func,
  columnNumber: PropTypes.number,
};

export default FormPanel;
