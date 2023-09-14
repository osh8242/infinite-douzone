import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보", "가족사항"],
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
    // {
    //   type: INPUT_TYPE.noSocial,
    //   field: "noSocial",
    //   label: LABELS.noSocial,
    //   span: 2,
    // },
    { type: INPUT_TYPE.text, field: "idMsn", span: 2 },
    { type: INPUT_TYPE.email, field: "emEmp", span: 2 },
    { type: INPUT_TYPE.callNumber, field: "telHome", span: 2 },
    { type: INPUT_TYPE.callNumber, field: "celEmp", span: 2 },
    { type: INPUT_TYPE.address, field: "address", isZonecode: true, span: 2 },
    { type: INPUT_TYPE.text, field: "addHome2", span: 2 },
    { type: INPUT_TYPE.date, field: "daRetire", span: 2 },
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
    { type: INPUT_TYPE.text, field: "noBnkacct", span: 2 },
  ],
  secondaryTabInputs: [],
};
