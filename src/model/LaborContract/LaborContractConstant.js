export const url = "http://localhost:8888";

export const labels = {
  empContractPeriod: "근로계약기간",
  workAddress: "근무장소",
  jobDescription: "업무의 내용",
  workTime: "소정근로시간",
  breakTime: "휴게시간",
  workingDay: "근무일",
  dayOff: "주휴일",
  salaryType: "임금유형",
  otherBenefits: "기타급여",
  bonusPaymentStatus: "상여금",
  salaryPaymentDateType: "임금지급일",
  paymentMethod: "지급방법",
  empInsurance: "고용보험",
  compensationInsurance: "산재보험",
  nationalPension: "국민연금", //
  healthInsurance: "건강보험",
  dateOfCreation: " 작성일자",
  incomeClassfication: "소득구분", ///
};

// 상단 조회 - 소득구분 목록
export const incomeClassficationList = [
  { key: "empAll", value: "0. 전체" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];

export const subTabMenuList = {
  WorkInformation: "근로정보",
  otherBenefit: "기타급여",
};

// 좌측테이블 - 사원 목록
export const LeftTableHeaders = [
  { field: "cdEmp", text: "사원코드", orderBy: "asc", isPk: true },
  { field: "nmKrname", text: "성명", orderBy: "asc" },
  { field: "noSocial", text: "주민번호" },
];

// 우측하단테이블 - 기타급여 목록
export const SubTabHeaders = [
  { field: "otherType", text: "항목" },
  { field: "otherMoney", text: "금액" },
];

// 주휴일 목록
export const dayOffList = [
  { key: "mon", value: "1. 월" },
  { key: "tue", value: "2. 화" },
  { key: "wed", value: "3. 수" },
  { key: "thu", value: "4. 목" },
  { key: "fri", value: "5. 금" },
  { key: "sat", value: "6. 토" },
  { key: "sun", value: "7. 일" },
];

// 기타급여 목록
export const otherBenefitStatusList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];

// 임금유형 목록
export const salaryTypeList = [
  { key: "monthlySal", value: "1. 월급" },
  { key: "dailySal", value: "2. 일급" },
  { key: "hourlySal", value: "3. 시급" },
];
// 상여금 목록
export const bonusPaymentStatusList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 임금지급일 목록
export const salaryPaymentDateTypeList = [
  { key: "month", value: "1. 매월" },
  { key: "week", value: "2. 매주" },
  { key: "day", value: "3. 매일" },
];
// 지급방법 목록
export const paymentMethodList = [
  { key: "account", value: "1. 예금통장에 입금" },
  { key: "direct", value: "2. 직접지급" },
];
// 고용보험 목록
export const empInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 산재보험 목록
export const compensationInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 국민연금 목록
export const nationalPensionList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 건강보험 목록
export const healthInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];