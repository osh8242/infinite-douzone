import {
  labels,
  incomeClassficationList,
  dayOffList,
} from "./LaborContractConstant";

export const HeaderField = [
  {
    component: "DateForm",
    label: labels.dateOfCreation,
    // label: labels.dateOfCreation,
    type: "date",
    stateName: "id",
    labelKey: "paymentDate",
  },
  {
    component: "SelectForm",
    label: labels.incomeClassfication,
    optionList: incomeClassficationList,
    // label: labels.incomeClassfication,
    // optionList: incomeClassficationList,
  },
];

export const MainTabField = [
  {
    component: "DateForm",
    label: "근로계약기간",
    type: "date",
    isPeriod: "true",
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
    isPeriod: "true",
    valueMd: "4",
  },
  {
    component: "TextBoxComponent",
    label: "휴게시간",
    isPeriod: "true",
    valueMd: "4",
  },
  {
    component: "TextBoxComponent",
    label: "근무일",
    subLabel: "매 주 ",
    endLabel: "일 ",
  },
  {
    component: "SelectForm",
    label: "주휴일  ",
    subLabel: "매 주 ",
    endLabel: "요일 ",
    selectList: dayOffList,
  },
  {
    component: "TextBoxComponent",
    label: "임금유형",
    endLabel: "원 ",
    selectList: [
      { key: "monthlySal", value: "1. 월급" },
      { key: "dailySal", value: "2. 일급" },
      { key: "hourlySal", value: "3. 시급" },
    ],
  },
  {
    component: "SelectForm",
    label: "기타급여",
    optionList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
  },
  {
    component: "TextBoxComponent",
    label: "상여금",
    endLabel: "원 ",
    selectList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
  },
  {
    component: "SelectForm",
    label: "임금지급일",
    optionList: [
      { key: "month", value: "1. 매월" },
      { key: "week", value: "2. 매주" },
      { key: "day", value: "3. 매일" },
    ],
  },
  {
    component: "SelectForm",
    label: "지급방법",
    optionList: [
      { key: "account", value: "1. 예금통장에 입금" },
      { key: "direct", value: "2. 직접지급" },
    ],
  },
  {
    component: "SelectForm",
    label: "고용보험",
    optionList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
  },
  {
    component: "SelectForm",
    label: "산재보험",
    optionList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
  },
  {
    component: "SelectForm",
    label: "건강보험",
    optionList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
  },
  {
    component: "DateForm",
    label: "작성일자",
  },
];
