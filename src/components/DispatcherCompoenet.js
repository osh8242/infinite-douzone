// import React, { useState } from "react";
// import DateForm from "./DateForm";
// import SelectForm from "./SelectForm";
// import RadioForm from "./RadioForm";
// import TextBoxComponent from "./TextBoxComponent";
// import AddressForm from "./AddressForm";
// import TempAdd from "./TempAdd";
// import LaborContractModel from "../model/LaborContract/TestModel";
// // const { state, actions } = TestModel();
// // const { leftTableData, mainTabData, subTableData } = state;

// const DispatcherComponent = (field) => {
//   const { state, actions, mainTablePkValue } = LaborContractModel();
//   const { leftTableData, mainTabData, subTableData } = state;

//   switch (field.component) {
//     case "TextBoxComponent":
//       console.log({ mainTabData }.mainTabData[field.field]);
//       // console.log({ mainTabData }.mainTabData["cdEmp"]);
//       // console.log("test");
//       // console.log({ mainTabData }.workTime);

//       return (
//         <TextBoxComponent
//           type={field.type}
//           label={field.label}
//           md={field.md}
//           isPeriod={field.isPeriod}
//           valueMd={field.valueMd}
//           subLabel={field.subLabel}
//           endLabel={field.endLabel}
//           selectList={field.selectList}
//           value={{ mainTabData }.mainTabData[field.field]}
//           // value={mainTabData}} // 해당 필드의 값
//           // value={mainTabData[field.field]} // 해당 필드의 값
//           // value={mainTabData`.${field}`}
//           // value={mainTabData`.${field.field}`}
//           // value={`${mainTabData}.${temp}`}
//         />
//       );
//     case "RadioForm":
//       return (
//         <RadioForm
//           label={field.label}
//           optionList={field.options}
//           md={field.md}
//         />
//       );
//     case "AddressForm":
//       return <AddressForm />;
//     // return <TempAdd label={field.label} />;
//     case "DateForm":
//       return (
//         <DateForm
//           label={field.label}
//           type={field.type}
//           isPeriod={field.isPeriod}
//           labelKey={field.labelKey}
//           labelKey2={field.labelKey2}
//           value={field.value}
//         />
//       );
//     case "SelectForm":
//       return (
//         <SelectForm
//           label={field.label}
//           optionList={field.optionList}
//           subLabel={field.subLabel}
//           endLabel={field.endLabel}
//         />
//       );
//     default:
//       return null;
//   }
// };
// export default DispatcherComponent;
