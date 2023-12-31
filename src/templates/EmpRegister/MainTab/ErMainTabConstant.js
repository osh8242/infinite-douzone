import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";
import { LABELS_EMP } from "../../../model/EmpRegister/EmpConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보"],
};

export const MAIN_TAB = {
  primaryTabInputs: [
    { type: INPUT_TYPE.date, field: "daEnter", label: LABELS.daEnter, span: 1 },
    { type: INPUT_TYPE.select, field: "jobOk", label: LABELS.jobOk, span: 1 },
    {
      type: INPUT_TYPE.text,
      field: "nmKrname",
      label: LABELS.nmKrname,
      span: 1,
    },
    {
      type: INPUT_TYPE.regNum,
      field: "noSocial",
      label: LABELS.noSocial,
      span: 1,
    },
    { type: INPUT_TYPE.select, field: "ynFor", label: LABELS.ynFor, span: 1 },
    { type: INPUT_TYPE.select, field: "fgSex", label: LABELS.fgSex, span: 1 },
    { type: INPUT_TYPE.text, field: "idMsn", span: 1 },
    { type: INPUT_TYPE.email, field: "emEmp", span: 1 },
    {
      type: INPUT_TYPE.callNumber,
      field: "telHome",
      label: LABELS_EMP.telHome,
      span: 1,
    },
    {
      type: INPUT_TYPE.callNumber,
      field: "celEmp",
      label: LABELS_EMP.celEmp,
      span: 1,
    },
    {
      type: INPUT_TYPE.address,
      field: "zipHome-addHome1",
      label: LABELS_EMP.addHome1,
      isZonecode: true,
      span: 2,
    },
    {
      type: INPUT_TYPE.text,
      field: "addHome2",
      label: LABELS_EMP.addHome2,
      span: 2,
    },
    { type: INPUT_TYPE.date, field: "daRetire", span: 1 },
    {
      type: INPUT_TYPE.textCodeHelper,
      field: "abbNation",
      label: LABELS.abbNation,
      span: 1,
    },
    { type: INPUT_TYPE.textCodeHelper, field: "cdNation", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdDept", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdOccup", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "rankNo", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdSalcls", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdField", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdProject", span: 1 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdBank", span: 1 },
    { type: INPUT_TYPE.text, field: "nmBnkowner", span: 1 },
    { type: INPUT_TYPE.text, field: "noBnkacct", span: 1 },
  ],
  // secondaryTabInputs: [
  //   {
  //     // 월평균임금
  //     type: INPUT_TYPE.text,
  //     field: "mnMmaverage",
  //     label: LABELS.mnMmaverage,
  //     span: 2,
  //     endLabel: "원",
  //   },
  //   // 고용보험적용 /여부
  //   {
  //     type: INPUT_TYPE.select,
  //     field: "ynEmploy",
  //     label: LABELS.ynEmploy,
  //     span: 1,
  //   },
  //   // 산재보험적용 /여부
  //   {
  //     type: INPUT_TYPE.select,
  //     field: "ynSanjae",
  //     label: LABELS.ynSanjae,
  //     span: 1,
  //   },
  //   // 장기요양보험적용 /여부
  //   {
  //     type: INPUT_TYPE.select,
  //     field: "ynLonginsur",
  //     label: LABELS.ynLonginsur,
  //     span: 1,
  //   },
  //   // 국외근로 /여부
  //   {
  //     type: INPUT_TYPE.select,
  //     field: "ynForlabor",
  //     label: LABELS.ynForlabor,
  //     span: 1,
  //   },
  //   // 생산직 /여부
  //   { type: INPUT_TYPE.select, field: "ynUnit", label: LABELS.ynUnit, span: 1 },
  //   // 연장근로 비과세적용 (disabled)
  //   {
  //     type: INPUT_TYPE.select,
  //     field: "ynOverwork",
  //     label: LABELS.ynOverwork,
  //     span: 1,
  //   },
  // ],
};
