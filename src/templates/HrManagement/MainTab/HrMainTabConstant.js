import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant.js";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보", "인적정보"],
  subTabMenuList: ["가족", "학력", "경력", "신체", "병역"],
};

export const MAIN_TAB = {
  primaryTabInputs: [
    { type: INPUT_TYPE.text, field: "nmEnName", label: LABELS.nmEnName },
    { type: INPUT_TYPE.text, field: "nmChName", label: LABELS.nmChName },
    {
      type: INPUT_TYPE.regNum,
      field: "noSocial",
      label: LABELS.noSocial,
      disabled: true,
    },
    {
      type: INPUT_TYPE.radio,
      field: "fgSex",
      label: LABELS.fgSex,
      disabled: true,
    },
    { type: INPUT_TYPE.date, field: "daBirth", label: LABELS.daBirth },
    { type: INPUT_TYPE.radio, field: "fgWedding", label: LABELS.fgWedding },
    {
      type: INPUT_TYPE.text,
      field: "cdDept",
      disabled: true,
    },
    {
      type: INPUT_TYPE.text,
      field: "rankNo",
      disabled: true,
    },
    {
      type: INPUT_TYPE.textCodeHelper,
      field: "cdOffduty",
      label: LABELS.cdOffduty,
    },
    {
      type: INPUT_TYPE.radio,
      field: "ynDrawContracts",
    },
    {
      type: INPUT_TYPE.date,
      field: "daEnter",
      disabled: true,
    },
    {
      type: INPUT_TYPE.date,
      field: "daRetire",
      disabled: true,
    },
  ],
  secondaryTabInputs: [
    {
      type: INPUT_TYPE.select,
      field: "tyEmploy",
      label: LABELS.tyEmploy,
    },
    {
      type: INPUT_TYPE.text,
      field: "dcMidretire",
      label: LABELS.dcMidretire,
    },
    {
      type: INPUT_TYPE.radio,
      field: "fgDisorder",
      label: LABELS.fgDisorder,
    },
    {
      type: INPUT_TYPE.text,
      field: "strHobby",
      label: LABELS.strHobby,
    },
    {
      type: INPUT_TYPE.text,
      field: "nmSpecial",
      label: LABELS.nmSpecial,
    },
    {
      type: INPUT_TYPE.text,
      field: "tyReligion",
      label: LABELS.tyReligion,
    },
    {
      type: INPUT_TYPE.text,
      field: "mnKeepgarden",
      label: LABELS.mnKeepgarden,
    },
    {
      type: INPUT_TYPE.text,
      field: "mnKeepstate",
      label: LABELS.mnKeepstate,
    },
    {
      type: INPUT_TYPE.radio,
      field: "fgOwnHouse",
      label: LABELS.fgOwnHouse,
    },
    {
      type: INPUT_TYPE.callNumber,
      field: "telHome",
      label: LABELS.telHome,
    },
    {
      type: INPUT_TYPE.callNumber,
      field: "celEmp",
      label: LABELS.celEmp,
    },
    {
      type: INPUT_TYPE.callNumber,
      field: "telOffice",
      label: LABELS.telOffice,
    },
    {
      type: INPUT_TYPE.address,
      field: "zipHome-addHome1",
      isZonecode: true,
      label: LABELS.addHome1,
      span: 2,
    },
    {
      type: INPUT_TYPE.text,
      field: "addHome2",
      label: LABELS.addHome2,
      span: 2,
    },
    {
      type: INPUT_TYPE.address,
      field: "zipOrgin-addOrgin1",
      isZonecode: true,
      label: LABELS.addOrgin1,
      span: 2,
    },
    {
      type: INPUT_TYPE.text,
      field: "addOrgin2",
      label: LABELS.addOrgin2,
      span: 2,
    },
  ],
};
