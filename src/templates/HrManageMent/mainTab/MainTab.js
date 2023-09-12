import { RadioForm, TextBoxComponent } from "../../../components/TextBoxComponent";
import { RADIO_LIST, labels } from "../../../model/CommonConstant.js";
import { INPUT_TYPE, MAIN_TAB } from "./MainTabConstant";

const MainTab = (props) => {
  const { mainTabData, submitMainTabData, columnNumber } = props;
  const md = 12 / columnNumber;
  const inputs = [];
  MAIN_TAB.primaryTabInputs.map((input, index) => {
    switch (input.type) {
      case INPUT_TYPE.text:
        inputs.push(
          <TextBoxComponent
            id={input.field}
            label={labels[input.field]}
            disabled={input.disabled}
            value={mainTabData.item[input.field]}
            onEnter={submitMainTabData}
          />
        );
        break;
      case INPUT_TYPE.date:
        break;
      case INPUT_TYPE.select:
        break;
      case INPUT_TYPE.radio:
        inputs.push(
          <RadioForm
            id={input.field}
            label={labels[input.field]}
            disabled={input.disabled}
            optionList={RADIO_LIST[input.field]}
          />
        );
        break;
      default:
        break;
    }
  });
};

export default MainTab;
