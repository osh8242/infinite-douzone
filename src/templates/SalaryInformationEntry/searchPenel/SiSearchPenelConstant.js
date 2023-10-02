import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant";
import { forLaborOption, salaryDivisionOption, unitOption } from "../../../model/SalaryInformationEntry/SalConstant";

export const SI_MAIN_SEARCHFIELD = [
    {
      type: INPUT_TYPE.month,
      field: "allowMonth",
      label: LABELS.allowMonth,
    },
    {
      type: INPUT_TYPE.select,
      field: "salDivision",
      label: LABELS.inquiryYype,
      optionList: salaryDivisionOption,
    },
    {
      type: INPUT_TYPE.dateCodeHelper,
      field: "paymentDate",
      label: LABELS.paymentDate,
    },
  ];

export const SI_SUB_SEARCHFIELD = [
  {
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdEmp",
    label: LABELS.cdEmp,
  },{
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdDept",
    label: LABELS.cdDept,
    
  },{
    type: INPUT_TYPE.textCodeHelper,
    field: "searchCdOccup",
    label: LABELS.rankNo,
  },{
    type: INPUT_TYPE.select,
    field: "searchYnUnit",
    label: LABELS.ynUnit,
    optionList: unitOption
  }
]