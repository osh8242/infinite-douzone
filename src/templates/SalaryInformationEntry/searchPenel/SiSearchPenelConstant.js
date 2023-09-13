import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";
import { forLaborOption, salaryDivisionOption, unitOption } from "../../../model/SalaryInformationEntry/SalConstant";

  
export const SI_MAIN_SEARCHFIELD = [
    {
      id: "allowMonth",
      type: INPUT_TYPE.month,
      field: "allowMonth",
      label: LABELS.allowMonth,
    },
    {
      id: "inquiryYype",
      type: INPUT_TYPE.select,
      field: "inquiryYype",
      label: LABELS.inquiryYype,
      optionList: salaryDivisionOption,
    },
    {
      id: "paymentDate",
      type: INPUT_TYPE.dateCodeHelper,
      field: "paymentDate",
      label: LABELS.paymentDate,
      value: "2023-09-03"
    },
  ];

export const SI_SUB_SEARCHFIELD = [
  {
    id: "searchCdEmp",
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdEmp",
    label: LABELS.cdEmp,
  },{
    id: "searchCdDept",
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdDept",
    label: LABELS.cdDept,
    
  },{
    id: "searchRankNo",
    type: INPUT_TYPE.textCodeHelper,
    field: "searchRankNo",
    label: LABELS.rankNo,
  },{
    id: "searchCdOccup",
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdOccup",
    label: LABELS.cdOccup,
  },{
    id: "searchYnUnit",
    type: INPUT_TYPE.select,
    field: "searchYnUnit",
    label: LABELS.ynUnit,
    optionList: unitOption
  },{
    id: "searchYnForlabor",
    type: INPUT_TYPE.select,
    field: "searchYnForlabor",
    label: LABELS.ynForlabor,
    optionList : forLaborOption
  },

]