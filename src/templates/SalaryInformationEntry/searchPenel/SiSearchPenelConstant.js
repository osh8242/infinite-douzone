import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";

  
export const SI_MAIN_SEARCHFIELD = [
    {
      type: INPUT_TYPE.month,
      field: "allowMonth",
      label: LABELS.allowMonth,
    },
    {
      type: INPUT_TYPE.select,
      field: "inquiryYype",
      label: LABELS.inquiryYype,
    },
    {
      type: INPUT_TYPE.date,
      field: "paymentDate",
      label: LABELS.paymentDate,
      
    },
  ];

export const SI_SUB_SEARCHFIELD = [
  {
    type: INPUT_TYPE.text,
    field: "searchCdEmp",
    label: LABELS.cdEmp,
    
  },{
    type: INPUT_TYPE.text,
    field: "searchCdDept",
    label: LABELS.cdDept,
    
  },{
    type: INPUT_TYPE.text,
    field: "searchRankNo",
    label: LABELS.rankNo,
  },{
    type: INPUT_TYPE.text,
    field: "searchCdOccup",
    label: LABELS.cdOccup,
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
    label: LABELS.ynUnit,
  },
  {
    type: INPUT_TYPE.text,
    field: "searchYnForlabor",
    label: LABELS.ynForlabor,
  },

]