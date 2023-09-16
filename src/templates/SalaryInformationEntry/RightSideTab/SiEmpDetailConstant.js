import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

export const SI_EMP_DETAIL = [
  {
    type: INPUT_TYPE.text,
    field: "daEnter",
    label: LABELS.daEnter,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynMateDed",
    label: LABELS.ynMateDed,
  },
  {
    type: INPUT_TYPE.text,
    field: "num2060many",
    label: LABELS.num2060many,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynResident",
    label: LABELS.ynResident,
  },
  {
    type: INPUT_TYPE.text,
    field: "ynUnit",
    label: LABELS.ynUnitForlabor,
  },

  {
    type: INPUT_TYPE.text,
    field: "ynOverwork",
    label: LABELS.ynOverwork,
  },

  {
    type: INPUT_TYPE.text,
    field: "daRetire",
    label: LABELS.daRetire,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdOccup",
    label: LABELS.cdOccup,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdDept",
    label: LABELS.cdDept,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdField",
    label: LABELS.cdField,
  },
  {
    type: INPUT_TYPE.text,
    field: "cdProject",
    label: LABELS.cdProject,
  },
  {
    type: INPUT_TYPE.text,
    field: "noSocial",
    label: LABELS.noSocial,
  },
];
export const SI_EMP_PAYROLL_CRITERIA = [
  {
    type: INPUT_TYPE.text,
    field: "workDay",
    label: "현재 귀속일 근무일수",
  },
  {
    type: INPUT_TYPE.text,
    field: "overWorkTime",
    label: "현재 귀속월 추가 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "overWorkTime",
    label: "현재 귀속월 총 근무시간",
  },
  {
    type: INPUT_TYPE.text,
    field: "HourlyWage",
    label: "통상시급(원)",
  },
];