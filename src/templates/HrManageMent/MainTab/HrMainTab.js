import { Col, Row } from "react-bootstrap";
import RadioForm from "../../../components/RadioForm";
import TextBoxComponent from "../../../components/TextBoxComponent";
import { RADIO_LIST, labels } from "../../../model/CommonConstant.js";
import { INPUT_TYPE, MAIN_TAB } from "./HrMainTabConstant";

const MainTab = (props) => {
  const { formData = { item: {} }, submitData, columnNumber = 2 } = props;
  const inputs = [];
  const md = 12 / columnNumber;

  const wrappingColTag = (input) => {
    return (
      <>
        <Col xs md={md}>
          {input}
        </Col>
      </>
    );
  };

  MAIN_TAB.primaryTabInputs.forEach((input, index) => {
    switch (input.type) {
      case INPUT_TYPE.text:
        inputs.push(
          wrappingColTag(
            <TextBoxComponent
              id={input.field}
              label={labels[input.field]}
              disabled={input.disabled}
              value={formData?.item[input.field] || ""}
              onEnter={submitData}
            />
          )
        );
        break;
      case INPUT_TYPE.date:
        inputs.push(
          wrappingColTag(
            <TextBoxComponent
              id={input.field}
              type={"date"}
              label={labels[input.field]}
              disabled={input.disabled}
              value={formData?.item[input.field] || ""}
              onChange={submitData}
            />
          )
        );
        break;
      case INPUT_TYPE.select:
        break;
      case INPUT_TYPE.radio:
        inputs.push(
          wrappingColTag(
            <RadioForm
              id={input.field}
              label={labels[input.field]}
              disabled={input.disabled}
              optionList={RADIO_LIST[input.field]}
              checked={formData?.item[input.field]}
              onChange={submitData}
            />
          )
        );
        break;
      default:
        break;
    }
  });

  const rows = [];
  for (let i = 0; i < inputs.length; i += columnNumber) {
    rows.push(<Row key={i}>{inputs.slice(i, i + columnNumber)}</Row>);
  }

  return <>{rows}</>;
};

export default MainTab;
