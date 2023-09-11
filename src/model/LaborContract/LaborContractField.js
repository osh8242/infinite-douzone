import {
  labels,
  incomeClassficationList,
  dayOffList,
  otherBenefitStatusList,
  salaryTypeList,
  bonusPaymentStatusList,
  salaryPaymentDateTypeList,
  paymentMethodList,
  empInsuranceList,
  compensationInsuranceList,
  healthInsuranceList,
} from "./LaborContractConstant";

export const HeaderField = [
  {
    component: "DateForm",
    label: labels.dateOfCreation,
    type: "date",
    stateName: "id",
    labelKey: "paymentDate",
  },
  {
    component: "SelectForm",
    label: labels.incomeClassfication,
    optionList: incomeClassficationList,
  },
];

export const MainTabField = [
  {
    component: "DateForm",
    label: labels.empContractPeriod,
    type: "date",
    isPeriod: "true",
    labelKey: "startEmpContractPeriod",
    labelKey2: "endEmpContractPeriod",
  },
  {
    component: "AddressForm",
    label: labels.workAddress,
  },
  {
    component: "TextBoxComponent",
    label: labels.jobDescription,
  },
  {
    component: "TextBoxComponent",
    label: labels.workTime,
    isPeriod: "true",
    valueMd: "4",
  },
  {
    component: "TextBoxComponent",
    label: labels.breakTime,
    isPeriod: "true",
    valueMd: "4",
  },
  {
    component: "TextBoxComponent",
    label: labels.workingDay,
    subLabel: "매 주 ",
    endLabel: "일 ",
  },
  {
    component: "SelectForm",
    label: labels.dayOff,
    subLabel: "매 주 ",
    endLabel: "요일 ",
    optionList: dayOffList,
  },
  {
    component: "TextBoxComponent",
    label: labels.salaryType,
    endLabel: "원 ",
    selectList: salaryTypeList,
  },
  {
    component: "SelectForm",
    label: labels.otherBenefits,
    optionList: otherBenefitStatusList,
  },
  {
    component: "TextBoxComponent",
    label: labels.bonusPaymentStatus,
    endLabel: "원 ",
    selectList: bonusPaymentStatusList,
  },
  {
    component: "SelectForm",
    label: labels.salaryPaymentDateType,
    optionList: salaryPaymentDateTypeList,
  },
  {
    component: "SelectForm",
    label: labels.paymentMethod,
    optionList: paymentMethodList,
  },
  {
    component: "SelectForm",
    label: labels.empInsurance,
    optionList: empInsuranceList,
  },
  {
    component: "SelectForm",
    label: labels.compensationInsurance,
    optionList: compensationInsuranceList,
  },
  {
    component: "SelectForm",
    label: labels.healthInsurance,
    optionList: healthInsuranceList,
  },
  {
    component: "DateForm",
    label: labels.dateOfCreation,
  },
];
