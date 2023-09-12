import { labels } from "../../../model/CommonConstant.js";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["기초정보", "인적정보"],
  subTabMenuList: ["가족", "학력", "경력", "신체", "병역"],
};

export const INPUT_TYPE = {
  text: 0,
  date: 1,
  select: 2,
  radio: 3,
};

export const MAIN_TAB = {
  primaryTabInputs: [
    { type: INPUT_TYPE.text, field: "nmEnName", label: labels.nmEnName },
    { type: INPUT_TYPE.text, field: "nmChName", label: labels.nmChName },
    {
      type: INPUT_TYPE.text,
      field: "noSocial",
      label: labels.noSocial,
      disabled: true,
      span: 2,
    },
    {
      type: INPUT_TYPE.radio,
      field: "fgSex",
      label: labels.fgSex,
      disabled: true,
    },
    { type: INPUT_TYPE.date, field: "daBirth", label: labels.daBirth },
    { type: INPUT_TYPE.radio, field: "fgWedding", label: labels.fgWedding },
    {
      type: INPUT_TYPE.text,
      field: "cdDept",
      label: labels.cdDept,
      disabled: true,
    },
    {
      type: INPUT_TYPE.text,
      field: "rankNo",
      label: labels.rankNo,
      disabled: true,
      span: 2,
    },
    { type: INPUT_TYPE.text, field: "cdOffduty", label: labels.cdOffduty },
    {
      type: INPUT_TYPE.radio,
      field: "ynDrawContracts",
      label: labels.ynDrawContracts,
    },
    {
      type: INPUT_TYPE.date,
      field: "daEnter",
      label: labels.daEnter,
      disabled: true,
    },
    {
      type: INPUT_TYPE.date,
      field: "daRetire",
      label: labels.daRetire,
      disabled: true,
    },
  ],
};
