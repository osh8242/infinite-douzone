import {
  dayOffList,
  labels,
  salaryTypeList,
  otherBenefitStatusList,
  bonusPaymentStatusList,
  salaryPaymentDateTypeList,
  paymentMethodList,
  empInsuranceList,
  compensationInsuranceList,
  healthInsuranceList,
} from "../../../model/LaborContract/LaborContractConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["계약서 작성", "계약서 조회"],
  subTabMenuList: ["근로정보", "기타급여"],
};

export const INPUT_TYPE = {
  text: 0,
  date: 1,
  select: 2,
  radio: 3,
  address: 4,
};

export const MAIN_TAB = {
  primaryTabInputs: [
    {
      type: INPUT_TYPE.date,
      label: labels.empContractPeriod,
      isPeriod: "true",
      labelKey: "startEmpContractPeriod",
      labelKey2: "endEmpContractPeriod",
      field: "startEmpContractPeriod",
      subField: "endEmpContractPeriod",
    },
    {
      type: INPUT_TYPE.address,
      field: "workAddress",
      label: labels.workAddress,
    },
    {
      type: INPUT_TYPE.text,
      field: "jobDescription",
      label: labels.jobDescription,
    },
    {
      type: INPUT_TYPE.text,
      label: labels.workTime,
      isPeriod: "true",
      valueMd: "4",
      field: "startWorktime",
      subField: "endWorktime",
    },
    {
      type: INPUT_TYPE.text,
      label: labels.breakTime,
      isPeriod: "true",
      valueMd: "4",
      field: "startBreakTime",
      subField: "endBreakTime",
    },
    {
      type: INPUT_TYPE.text,
      label: labels.workingDay,
      subLabel: "매 주 ",
      endLabel: "일 ",
      field: "workingDay",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.dayOff,
      subLabel: "매 주 ",
      endLabel: "요일 ",
      optionList: dayOffList,
      field: "",
    },
    {
      type: INPUT_TYPE.text,
      label: labels.salaryType,
      endLabel: "원 ",
      selectList: salaryTypeList,
      field: "salaryAmount",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.otherBenefits,
      optionList: otherBenefitStatusList,
      field: "",
    },
    {
      type: INPUT_TYPE.text,
      label: labels.bonusPaymentStatus,
      endLabel: "원 ",
      selectList: bonusPaymentStatusList,
      field: "bonusAmount",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.salaryPaymentDateType,
      optionList: salaryPaymentDateTypeList,
      field: "",
    },

    {
      type: INPUT_TYPE.select,
      label: labels.paymentMethod,
      optionList: paymentMethodList,
      field: "",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.empInsurance,
      optionList: empInsuranceList,
      field: "",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.compensationInsurance,
      optionList: compensationInsuranceList,
      field: "",
    },
    {
      type: INPUT_TYPE.select,
      label: labels.healthInsurance,
      optionList: healthInsuranceList,
      field: "",
    },
    {
      type: INPUT_TYPE.date,
      label: labels.dateOfCreation,
      field: "paymentDate",
    },
  ],
};
