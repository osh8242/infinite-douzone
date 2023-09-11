// import { labels } from "./LaborContractConstant";
// import { incomeClassficationList } from "./LaborContractConstant";

export const LaborContractField = [
  {
    component: "DateTest",
    label: "업무의 내용",
    // label: labels.dateOfCreation,
    type: "date",
    stateName: "id",
    labelKey: "paymentDate",
  },
  {
    component: "SelectForm",
    label: "소득구분",
    optionList: [
      { key: "empAll", value: "0. 전체" },
      { key: "empRegistration", value: "1. 사원등록" },
      { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
    ],
    // label: labels.incomeClassfication,
    // optionList: incomeClassficationList,
  },
];

// export const LaborContractLeftField = [
//   {
//     component: "DateTest",
//     label: labels.dateOfCreation,
//     type: "date",
//     stateName: "id",
//     labelKey: "paymentDate",
//   },
//   {
//     component: "SelectForm",
//     label: labels.incomeClassfication,
//     optionList: incomeClassficationList,
//   },
// ];
