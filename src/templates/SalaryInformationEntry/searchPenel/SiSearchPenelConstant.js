import { labels } from "../../../model/CommonConstant";
import { INPUT_TYPE } from "../../HrManagement/MainTab/HrMainTabConstant";
  
export const SI_MAIN_SEARCHFIELD = [
    {
      type: INPUT_TYPE.date,
      field: "daEnter",
      label: labels.allowMonth,
    },
    {
      type: INPUT_TYPE.select,
      field: "ynMateDed",
      label: labels.inquiryYype,
    },
    {
      type: INPUT_TYPE.date,
      field: "ynMateDed",
      label: labels.paymentDate,
      codeHelper : "Y"
    },
  ];

export const SI_SUB_SEARCHFIELD = [
  {
    type: INPUT_TYPE.text,
    field: "searchCdEmp",
    label: labels.cdEmp,
    codeHelper : "Y"
  },{
    type: INPUT_TYPE.text,
    field: "searchCdDept",
    label: labels.cdDept,
    codeHelper : "Y"
  },{
    type: INPUT_TYPE.text,
    field: "searchRankNo",
    label: labels.rankNo,
  },{
    type: INPUT_TYPE.text,
    field: "searchCdOccup",
    label: labels.cdOccup,
  },
  // {
  //   type: INPUT_TYPE.date,
  //   field: "searchCdField",
  //   label: labels.allowMonth,
  // },  
  // {
  //   type: INPUT_TYPE.date,
  //   field: "searchCdProject",
  //   label: labels.allowMonth,
  // },  
  {
    type: INPUT_TYPE.text,
    field: "searchYnUnit",
    label: labels.ynUnit,
  },
  {
    type: INPUT_TYPE.text,
    field: "searchYnForlabor",
    label: labels.ynForlabor,
  },

]