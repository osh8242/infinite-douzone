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
      type: INPUT_TYPE.text,
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
    { type: INPUT_TYPE.text, field: "cdOffduty", label: LABELS.cdOffduty },
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
      field: "addHome1",
      label: LABELS.add_home1,
      span: 3,
    },
    {
      type: INPUT_TYPE.text,
      field: "originHome1",
      label: LABELS.origin_home1,
      span: 3,
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
      field: "fgOwnhouse",
      label: LABELS.fgOwnhouse,
    },
  ],
};
