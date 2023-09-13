import { INPUT_TYPE , LABELS } from "../../../model/CommonConstant";

export const SI_EMP_DETAIL = {
    empDetailInputs: [
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
        field: "num20Family",
        label: "20세/60세/다자녀",
      },
      {
        type: INPUT_TYPE.text,
        field: "ynResident",
        label: LABELS.ynResident,
      },
      {
        type: INPUT_TYPE.text,
        field: "ynUnit",
        label: "생산/국외",
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

    ],
}