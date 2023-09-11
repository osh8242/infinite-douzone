import { labels } from "../../../model/CommonConstant.js";

export const INPUT_TYPE = {
  text: 0,
  date: 1,
  select: 2,
  radio: 3,
};

export const MAIN_TAB = [
  { type: INPUT_TYPE.text, field: "nmEnName", label: labels.nmEnName },
  { type: INPUT_TYPE.text, field: "nmChName", label: labels.nmChName },
  { type: INPUT_TYPE.text, field: "noSocial", label: labels.noSocial },
  { type: INPUT_TYPE.radio, field: "fgSex", label: labels.fgSex },
  { type: INPUT_TYPE.text, field: "daBirth", label: labels.daBirth },
  { type: INPUT_TYPE.radio, field: "fgWedding", label: labels.fgWedding },
  { type: INPUT_TYPE.text, field: "cdDept", label: labels.cdDept },
  { type: INPUT_TYPE.text, field: "rankNo", label: labels.rankNo },
  { type: INPUT_TYPE.text, field: "cdOffduty", label: labels.cdOffduty },
  {
    type: INPUT_TYPE.radio,
    field: "ynDrawContracts",
    label: labels.ynDrawContracts,
  },
  { type: INPUT_TYPE.text, field: "daEnter", label: labels.daEnter },
  { type: INPUT_TYPE.text, field: "daRetire", label: labels.daRetire },
];
