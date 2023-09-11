export const labels = [
  {
    empContractPeriod: "근로계약기간",
  },
];

// 상단 조회 - 소득구분 목록
export const incomeClassficationList = [
  { key: "empAll", value: "0. 전체" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];

export const url = "http://localhost:8888";

// 좌측테이블 - 사원 목록
export const SwsmLeftTableHeaders = [
  { field: "cdEmp", text: "사원코드", orderBy: "asc", isPk: true },
  { field: "nmKrname", text: "성명", orderBy: "asc" },
  { field: "noSocial", text: "주민번호" },
];

// 우측하단테이블 - 기타급여 목록
export const SwsmSubTabHeaders = [
  { field: "otherType", text: "항목" },
  { field: "otherMoney", text: "금액" },
];
