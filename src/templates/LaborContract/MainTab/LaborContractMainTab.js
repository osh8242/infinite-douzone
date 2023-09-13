import { Col, Row } from "react-bootstrap";
import RadioForm from "../../../components/RadioForm";
import TextBoxComponent from "../../../components/TextBoxComponent";
import DateForm from "../../../components/DateForm";
import { RADIO_LIST, labels } from "../../../model/CommonConstant.js";
import { INPUT_TYPE, MAIN_TAB } from "./LaborContractTabConstant";
import SelectForm from "../../../components/SelectForm";
import AddressForm from "../../../components/AddressForm";

const MainTab = (props) => {
  const { formData, submitData, columnNumber = 1 } = props;
  const columns = [];

  const wrappingColTag = (input, index, span) => {
    let md = 12 / columnNumber;
    if (span) md = md * span <= 12 && 12;

    return (
      <Col xs md={10} key={index}>
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
              subId={input.subField}
              label={input.label}
              disabled={input.disabled}
              value={{ formData }.formData[input.field]}
              subValue={{ formData }.formData[input.subField]}
              onEnter={submitData}
              isPeriod={input.isPeriod}
              valueMd={input.valueMd}
              subLabel={input.subLabel}
              endLabel={input.endLabel}
              selectList={input.selectList}
            />,
            index,
            input.span
          )
        );
        break;
      case INPUT_TYPE.date:
        columns.push(
          wrappingColTag(
            <DateForm
              id={input.field}
              subId={input.subField}
              type={"date"}
              label={input.label}
              disabled={input.disabled}
              value={{ formData }.formData[input.field]}
              subValue={{ formData }.formData[input.subField]}
              onChange={submitData}
              isPeriod={input.isPeriod}
              labelKey={input.field}
              labelKey2={input.subField}
              valueMd={input.valueMd}
            />,
            index,
            input.span
          )
        );
        break;
      case INPUT_TYPE.select:
        columns.push(
          wrappingColTag(
            <SelectForm
              id={input.field}
              label={input.label}
              disabled={input.disabled}
              value={{ formData }.formData[input.field]}
              onChange={submitData}
              optionList={input.optionList}
              subLabel={input.subLabel}
              endLabel={input.endLabel}
            />,
            index,
            input.span
          )
        );
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
      case INPUT_TYPE.address:
        columns.push(
          wrappingColTag(
            <AddressForm
              id={input.field}
              label={labels[input.field]}
              disabled={input.disabled}
              //   onChange={submitData}
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
