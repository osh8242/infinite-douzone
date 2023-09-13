import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보", "가족사항"],
};

export const MAIN_TAB = {
  primaryTabInputs: [
    { type: INPUT_TYPE.date, field: "daEnter", label: LABELS.daEnter },
    { type: INPUT_TYPE.noSocial, field: "noSocial", label: LABELS.noSocial },
    { type: INPUT_TYPE.abbNation, field: "abbNation", label: LABELS.abbNation },
    { type: INPUT_TYPE.cdNation, field: "cdNation" },
    { type: INPUT_TYPE.address, field: "address" },
    { type: INPUT_TYPE.callNumber, field: "telHome1" },
    { type: INPUT_TYPE.callNumber, field: "celEmp1" },
    { type: INPUT_TYPE.email, field: "emEmp" },
    { type: INPUT_TYPE.text, field: "idMsn" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdDept" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdOccup" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdOffpos" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdSalcls" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdField" },
    { type: INPUT_TYPE.textCodeHelper, field: "cdProject" },
    { type: INPUT_TYPE.date, field: "daRetire" },
    // 급여이체통장은 나중에 분리해서 추가...주민등록번호도 분리해서.. 변경예정...
  ],
  secondaryTabInputs: [],
};
