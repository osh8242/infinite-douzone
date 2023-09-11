import { labels } from "../../model/LaborContract/LaborContractConstant";

export const HeaderField = [
  {
    component: "DateForm",
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

export const MainTabField = [
  {
    component: "DateForm",
    label: "근로계약기간",
    type: "date",
    labelKey: "startEmpContractPeriod",
    labelKey2: "endEmpContractPeriod",
  },
  {
    component: "AddressForm",
    label: "근무장소",
  },
  {
    component: "TextBoxComponent",
    label: "업무의 내용",
  },
  {
    component: "TextBoxComponent",
    label: "소정근로시간 ",
  },
  {
    component: "TextBoxComponent",
    label: "휴게시간",
    // isPeriod: "true",
  },
  {
    component: "TextBoxComponent",
    label: "근무일",
  },
  {
    component: "TextBoxComponent",
    label: "주휴일  ",
  },
  {
    component: "TextBoxComponent",
    label: "임금유형",
  },
  {
    component: "TextBoxComponent",
    label: "기타급여",
  },
  {
    component: "TextBoxComponent",
    label: "상여금",
  },
  {
    component: "TextBoxComponent",
    label: "임금지급일",
  },
  {
    component: "TextBoxComponent",
    label: "지급방법",
  },
  {
    component: "TextBoxComponent",
    label: "고용보험",
  },
  {
    component: "TextBoxComponent",
    label: "산재보험",
  },
  {
    component: "TextBoxComponent",
    label: "건강보험",
  },
  {
    component: "DateForm",
    label: "작성일자",
  },
];
