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
      label: LABELS.cdDept,
      disabled: true,
    },
    {
      type: INPUT_TYPE.text,
      field: "rankNo",
      label: LABELS.rankNo,
      disabled: true,
    },
    { type: INPUT_TYPE.text, field: "cdOffduty", label: LABELS.cdOffduty },
    {
      type: INPUT_TYPE.radio,
      field: "ynDrawContracts",
      label: LABELS.ynDrawContracts,
    },
    {
      type: INPUT_TYPE.date,
      field: "daEnter",
      label: LABELS.daEnter,
      disabled: true,
    },
    {
      type: INPUT_TYPE.date,
      field: "daRetire",
      label: LABELS.daRetire,
      disabled: true,
    },
  ],
  secondaryTabInputs: [],
};
