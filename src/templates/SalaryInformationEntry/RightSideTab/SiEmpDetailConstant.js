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
    field: "num2060many",
    id : "num2060many",
    label: LABELS.num2060many,
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
    label: LABELS.ynUnitForlabor,
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
    field: "workDay",
    id: "workDay",
    label: "현재 귀속일 근무일수",
  },
  {
    type: INPUT_TYPE.text,
    field: "overWorkTime",
    id: "overWorkTime",
    label: "현재 귀속월 추가 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "overWorkTime",
    id: "overWorkTime",
    label: "현재 귀속월 총 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "HourlyWage",
    id: "HourlyWage",
    label: "통상시급(원)",
  },
];