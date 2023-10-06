import { INPUT_TYPE, LABELS } from "../../../model/CommonConstant.js";
import {
  dayOffList,
  salaryTypeList,
  otherBenefitStatusList,
  bonusPaymentStatusList,
  salaryPaymentDateTypeList,
  paymentMethodList,
  empInsuranceList,
  compensationInsuranceList,
  healthInsuranceList,
  incomeClassficationList,
} from "../../../model/LaborContract/LaborContractConstant";

export const TAB_MENU_LIST = {
  mainTabMenuList: ["계약서 작성", "계약서 조회"],
  subTabMenuList: ["근로정보", "기타급여"],
};

export const SELECT_LIST = {
  tyEmploy: [
    { key: "public", value: "1. 공채" },
    { key: "special", value: "2. 특채" },
  ],
  tyReligion: [
    { key: "christianity", value: "기독교" },
    { key: "buddhism", value: "불교" },
    { key: "islam", value: "이슬람교" },
  ],
};
export const HEAD_TAB = {
  primaryTabInputs: [
    {
      type: INPUT_TYPE.dateCustom,
      label: "paymentDate",
      field: "paymentDate",
      dateType: "month",
    },
    {
      type: INPUT_TYPE.select,
      label: LABELS.incomeClassfication,
      field: "incomeClassfication",
      optionList: incomeClassficationList,
    },
  ],
};

export const MAIN_TAB = {
  primaryTabInputs: [
    {
      type: INPUT_TYPE.dateCustom,
      label: "startEmpContractPeriod",
      labelKey: "startEmpContractPeriod",
      labelKey2: "endEmpContractPeriod",
      field: "startEmpContractPeriod",
    },
    {
      type: INPUT_TYPE.dateCustom,
      label: "endEmpContractPeriod",
      labelKey: "endEmpContractPeriod",
      field: "endEmpContractPeriod",
    },
    // {
    //   type: INPUT_TYPE.dateCustom,
    //   label: "empContractPeriod",
    //   isPeriod: "true",
    //   labelKey: "startEmpContractPeriod",
    //   labelKey2: "endEmpContractPeriod",
    //   subField: "endEmpContractPeriod",
    //   field: "startEmpContractPeriod",
    //   span: 2,
    // },
    {
      type: INPUT_TYPE.addressCustom,
      field: "address",
      label: "address",
    },
    {
      type: INPUT_TYPE.text,
      field: "addDetail",
      label: LABELS.addDetail,
    },
    {
      type: INPUT_TYPE.text,
      field: "jobDescription",
      label: LABELS.jobDescription,
    },

    {
      type: INPUT_TYPE.dateCustom,
      label: "paymentDate",
      field: "paymentDate",
    },
    {
      type: INPUT_TYPE.text,
      field: "startWorktime",
      label: LABELS.startWorktime,
      isPeriod: "true",
      valueMd: "4",
      typeValue: "time",
    },
    {
      type: INPUT_TYPE.text,
      field: "endWorktime",
      label: LABELS.endWorktime,
      isPeriod: "true",
      valueMd: "4",
      typeValue: "time",
    },
    {
      type: INPUT_TYPE.text,
      field: "startBreakTime",
      label: LABELS.startBreakTime,
      isPeriod: "true",
      valueMd: "4",
      typeValue: "time",
    },
    {
      type: INPUT_TYPE.text,
      field: "endBreakTime",
      label: LABELS.endBreakTime,
      isPeriod: "true",
      valueMd: "4",
      typeValue: "time",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.workingDay,
      subLabel: "매 주 ",
      endLabel: "일 ",
      field: "workingDay",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.salaryPaymentDateType,
      optionList: salaryPaymentDateTypeList,
      field: "salaryPaymentDateType",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.dayOff,
      subLabel: "매 주 ",
      endLabel: "요일 ",
      optionList: dayOffList,
      field: "dayOff",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.salaryType,
      endLabel: "원 ",
      selectId: "salaryType",
      selectList: salaryTypeList,
      field: "salaryAmount",
      selectValue: "salaryType",
    },

    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.otherBenefits,
      optionList: otherBenefitStatusList,
      field: "otherBenefits",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.bonusAmount,
      endLabel: "원 ",
      selectList: bonusPaymentStatusList,
      selectValue: "bonusPaymentStatus",
      field: "bonusAmount",
      selectId: "bonusPaymentStatus",
    },

    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.paymentMethod,
      optionList: paymentMethodList,
      field: "paymentMethod",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.empInsurance,
      optionList: empInsuranceList,
      field: "empInsurance",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.compensationInsurance,
      optionList: compensationInsuranceList,
      field: "compensationInsurance",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.healthInsurance,
      optionList: healthInsuranceList,
      field: "healthInsurance",
    },
  ],
  secondaryTabInputs: [],
};

export const MAIN_TAB_SEARCH = {
  primaryTabInputs: [
    {
      type: INPUT_TYPE.dateCustom,
      label: "startEmpContractPeriod",
      labelKey: "startEmpContractPeriod",
      labelKey2: "endEmpContractPeriod",
      field: "startEmpContractPeriod",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.dateCustom,
      label: "endEmpContractPeriod",
      labelKey: "endEmpContractPeriod",
      field: "endEmpContractPeriod",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.addressCustom,
      field: "address",
      label: "address",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "jobDescription",
      label: LABELS.jobDescription,
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "addDetail",
      label: LABELS.addDetail,
      disabled: "true",
    },
    {
      type: INPUT_TYPE.dateCustom,
      label: "paymentDate",
      field: "paymentDate",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "startWorktime",
      label: LABELS.startWorktime,
      isPeriod: "true",
      valueMd: "4",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "endWorktime",
      label: LABELS.endWorktime,
      isPeriod: "true",
      valueMd: "4",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "startBreakTime",
      label: LABELS.startBreakTime,
      isPeriod: "true",
      valueMd: "4",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.text,
      field: "endBreakTime",
      label: LABELS.endBreakTime,
      isPeriod: "true",
      valueMd: "4",
      disabled: "true",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.workingDay,
      subLabel: "매 주 ",
      endLabel: "일 ",
      field: "workingDay",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.salaryPaymentDateType,
      optionList: salaryPaymentDateTypeList,
      field: "salaryPaymentDateType",
      disabled: "true",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.dayOff,
      subLabel: "매 주 ",
      endLabel: "요일 ",
      optionList: dayOffList,
      field: "dayOff",
      disabled: "true",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.salaryType,
      endLabel: "원 ",
      selectId: "salaryType",
      selectList: salaryTypeList,
      field: "salaryAmount",
      selectValue: "salaryType",
      disabled: "true",
    },

    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.otherBenefits,
      optionList: otherBenefitStatusList,
      field: "otherBenefits",
      disabled: "true",
    },

    {
      type: INPUT_TYPE.text,
      label: LABELS.bonusAmount,
      endLabel: "원 ",
      selectList: bonusPaymentStatusList,
      selectValue: "bonusPaymentStatus",
      field: "bonusAmount",
      selectId: "bonusPaymentStatus",
      disabled: true,
    },

    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.paymentMethod,
      optionList: paymentMethodList,
      disabled: "true",
      field: "paymentMethod",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.empInsurance,
      optionList: empInsuranceList,
      disabled: "true",
      field: "empInsurance",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.compensationInsurance,
      optionList: compensationInsuranceList,
      disabled: "true",
      field: "compensationInsurance",
    },
    {
      type: INPUT_TYPE.selectCustom,
      label: LABELS.healthInsurance,
      optionList: healthInsuranceList,
      disabled: "true",
      field: "healthInsurance",
    },
  ],
  secondaryTabInputs: [],
};
