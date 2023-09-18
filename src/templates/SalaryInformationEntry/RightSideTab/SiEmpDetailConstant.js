import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

export const SI_EMP_DETAIL = [
  {
    type: INPUT_TYPE.text,
    field: "daEnter",
    id : "daEnter",
    label: LABELS.daEnter,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynMateDed",
    id : "ynMateDed",
    label: LABELS.ynMateDed,
  },
  {
    type: INPUT_TYPE.text,
    field: "num20Family",
    id : "num20Family",
    label: LABELS.num20Family,
  },
  {
    type: INPUT_TYPE.text,
    field: "num60Family",
    id : "num60Family",
    label: LABELS.num60Family,
  },
  {
    type: INPUT_TYPE.text,
    field: "numManyFamily",
    id : "numManyFamily",
    label: LABELS.numManyFamily,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynResident",
    id : "ynResident",
    label: LABELS.ynResident,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynUnit",
    id : "ynUnit",
    label: LABELS.ynUnit,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynForLabor",
    id : "ynForLabor",
    label: LABELS.ynForLabor,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynOverwork",
    id : "ynOverwork",
    label: LABELS.ynOverwork,
  },

  {
    type: INPUT_TYPE.text,
    field: "daRetire",
    id : "daRetire",
    label: LABELS.daRetire,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdOccup",
    id: "cdOccup",
    label: LABELS.cdOccup,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdDept",
    id: "cdDept",
    label: LABELS.cdDept,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdField",
    id: "cdField",
    label: LABELS.cdField,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdProject",
    id: "cdProject",
    label: LABELS.cdProject,
  },
  {
    type: INPUT_TYPE.text,
    field: "noSocial",
    id: "noSocial",
    label: LABELS.noSocial,
  },
];

export const SI_EMP_PAYROLL_CRITERIA = [
  {
    type: INPUT_TYPE.text,
    field: "workday",
    id: "workday",
    label: "현재 귀속일 근무일수",
  },
  {
    type: INPUT_TYPE.text,
    field: "overTime",
    id: "overTime",
    label: "현재 귀속월 추가 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "allowMonthWorktime",
    id: "allowMonthWorktime",
    label: "현재 귀속월 총 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "hourlywage",
    id: "hourlywage",
    label: "통상시급(원)",
  },
];