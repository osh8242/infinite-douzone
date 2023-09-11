import DateForm from "./DateForm";
import SelectForm from "./SelectForm";
import RadioForm from "./RadioForm";
import TextBoxComponent from "./TextBoxComponent";
import AddressForm from "./AddressForm";
import TempAdd from "./TempAdd";

const DispatcherComponent = (field) => {
  switch (field.component) {
    case "TextBoxComponent":
      return (
        <TextBoxComponent
          type={field.type}
          label={field.label}
          md={field.md}
          isPeriod={field.isPeriod}
          valueMd={field.valueMd}
          subLabel={field.subLabel}
          endLabel={field.endLabel}
          selectList={field.selectList}
        />
      );
    case "RadioForm":
      return (
        <RadioForm
          label={field.label}
          optionList={field.options}
          md={field.md}
        />
      );
    case "AddressForm":
      return <TempAdd label={field.label} />;
    case "DateForm":
      return (
        <DateForm
          label={field.label}
          type={field.type}
          isPeriod={field.isPeriod}
          labelKey={field.labelKey}
          labelKey2={field.labelKey2}
        />
      );
    case "SelectForm":
      return (
        <SelectForm
          label={field.label}
          optionList={field.optionList}
          subLabel={field.subLabel}
          endLabel={field.endLabel}
        />
      );
    default:
      return null;
  }
};
export default DispatcherComponent;
