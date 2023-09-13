import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보", "가족사항"],
};

export const MAIN_TAB = {
  primaryTabInputs: [
    { type: INPUT_TYPE.date, field: "daEnter", label: LABELS.daEnter, span: 2 },
    {
      type: INPUT_TYPE.noSocial,
      field: "noSocial",
      label: LABELS.noSocial,
      span: 2,
    },
    {
      type: INPUT_TYPE.textCodeHelper,
      field: "abbNation",
      label: LABELS.abbNation,
      span: 2,
    },
    { type: INPUT_TYPE.textCodeHelper, field: "cdNation", span: 2 },
    { type: INPUT_TYPE.address, field: "address", span: 2 },
    { type: INPUT_TYPE.callNumber, field: "telHome", span: 2 },
    { type: INPUT_TYPE.callNumber, field: "celEmp", span: 2 },
    { type: INPUT_TYPE.email, field: "emEmp", span: 2 },
    { type: INPUT_TYPE.text, field: "idMsn", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdDept", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdOccup", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdOffpos", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdSalcls", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdField", span: 2 },
    { type: INPUT_TYPE.textCodeHelper, field: "cdProject", span: 2 },
    { type: INPUT_TYPE.date, field: "daRetire", span: 2 },
    // 급여이체통장은 나중에 분리해서 추가...주민등록번호도 분리해서.. 변경예정...
  ],
  secondaryTabInputs: [],
};
