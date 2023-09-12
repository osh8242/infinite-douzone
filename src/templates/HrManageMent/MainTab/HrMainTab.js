import { Col, Row } from "react-bootstrap";
import RadioForm from "../../../components/RadioForm";
import TextBoxComponent from "../../../components/TextBoxComponent";
import { RADIO_LIST, labels } from "../../../model/CommonConstant.js";
import { INPUT_TYPE, MAIN_TAB } from "./HrMainTabConstant";

const MainTab = (props) => {
  const { formData = { item: {} }, submitData, columnNumber = 1 } = props;
  const columns = [];

  const wrappingColTag = (input, index, span) => {
    let md = 12 / columnNumber;
    if (span) md = md * span <= 12 && 12;

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
              value={formData?.item[input.field] || ""}
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
              value={formData?.item[input.field] || ""}
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
              checked={formData?.item[input.field]}
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
  for (let i = 0; i < columns.length; i += columnNumber) {
    rows.push(<Row key={i}>{columns.slice(i, i + columnNumber)}</Row>);
  }

  return <>{rows}</>;
};

export default MainTab;
