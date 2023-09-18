////////////////////////////// 요청 Mapping Pattern
export const urlPattern = {
  getAllEmp: "/emp/getAllEmp",
  getEmpByCdEmp: "/emp/getEmpByCdEmp",
  insertEmp: "/emp/insertEmp",
  updateEmp: "/emp/updateEmp",
  deleteEmp: "/emp/deleteEmp",
};

//메뉴 탭 리스트
export const tabConstant = {
  mainTabMenuListForEmpRegister: ["기초정보", "가족사항"],
};

//왼쪽 테이블 헤더
export const EmpRegisterLeftHeaders = [
  { field: "cdEmp", text: "사원코드", isPk: true },
  { field: "nmKrname", text: "성명" },
  { field: "ynFor", text: "내외국인" },
  { field: "noSocial", text: "주민번호" },
  { field: "jobOk", text: "구분" },
];

//메인 탭 사용 필드
export const EmpRegisterMainHeaders = [
  { field: "daEnter", text: "입사일자" },
  { field: "ynFor", text: "내외국인" },
  { field: "noSocial", text: "주민번호" },
  { field: "fgSex", text: "성별" },
  { field: "addNation", text: "거주지국" },
  { field: "cdNation", text: "국적" },
  { field: "zipHome", text: "우편번호" },
  { field: "addHome1", text: "주소" },
  { field: "addHome2", text: "상세주소" },
  { field: "telHome1", text: "전화번호1" },
  { field: "telHome2", text: "전화번호2" },
  { field: "telHome3", text: "전화번호3" },
  { field: "celEmp1", text: "모바일번호1" },
  { field: "celEmp2", text: "모바일번호2" },
  { field: "celEmp3", text: "모바일번호3" },
  { field: "emEmp", text: "이메일" },
  { field: "idMsn", text: "메신저ID" },
  { field: "cdDept", text: "부서" },
  { field: "cdOccup", text: "직종" },
  { field: "rankNo", text: "직급" },
  { field: "cdSalcls", text: "호봉" },
  { field: "cdField", text: "현장" },
  { field: "cdProject", text: "프로젝트" },
  { field: "daRetire", text: "퇴사일자" },
  { field: "cdBank", text: "급여이체은행" },
  { field: "noBnkacct", text: "계좌번호" },
  { field: "nmBnkowner", text: "예금주" },
];

export const LABELS_EMP = {
  telHome: "전화번호",
  celEmp: "모바일번호",
  addHome1: "주소",
  addHome2: "상세주소",
};

// 코드도움 상수 모음
// 거주지국
export const codeHelperData_abbNation = {
  subject: "거주지국코드 조회",
  headers: [
    { field: "abbNation", text: "거주지국코드" },
    { field: "nmAbbNation", text: "거주지국명" },
  ],
  tableData: [
    { item: { abbNation: "KR", abbNation_display: "대한민국" } },
    { item: { abbNation: "US", abbNation_display: "미국" } },
    { item: { abbNation: "CN", abbNation_display: "중국" } },
    { item: { abbNation: "JP", abbNation_display: "일본" } },
    { item: { abbNation: "IN", abbNation_display: "인도" } },
    { item: { abbNation: "PH", abbNation_display: "필리핀" } },
  ],
  searchField: ["abbNation", "abbNation_display"],
  usePk: "abbNation",
};
// 국적
export const codeHelperData_cdNation = {
  subject: "국적코드 조회",
  headers: [
    { field: "cdNation", text: "국적코드" },
    { field: "nmCdNation", text: "국적명" },
  ],
  tableData: [
    { item: { cdNation: "KR", cdNation_display: "대한민국" } },
    { item: { cdNation: "US", cdNation_display: "미국" } },
    { item: { cdNation: "CN", cdNation_display: "중국" } },
    { item: { cdNation: "JP", cdNation_display: "일본" } },
    { item: { cdNation: "IN", cdNation_display: "인도" } },
    { item: { cdNation: "PH", cdNation_display: "필리핀" } },
  ],
  searchField: ["cdNation", "cdNation_display"],
  usePk: "cdNation",
};
// 부서
export const codeHelperData_cdDept = {
  subject: "부서코드 조회",
  headers: [
    { field: "cdDept", text: "부서코드" },
    { field: "nmDept", text: "부서이름" },
  ],
  tableData: [
    { item: { cdDept: "D001", cdDept_display: "인사팀" } },
    { item: { cdDept: "D002", cdDept_display: "경영지원팀" } },
    { item: { cdDept: "D003", cdDept_display: "개발팀" } },
  ],
  searchField: ["cdDept", "cdDept_display"],
  usePk: "cdDept",
};
// 직종
export const codeHelperData_cdOccup = {
  subject: "직종코드 조회",
  headers: [
    { field: "cdOccup", text: "직종코드" },
    { field: "nmCdOccup", text: "직종명" },
  ],
  tableData: [
    { item: { cdOccup: "J001", cdOccup_display: "직종A" } },
    { item: { cdOccup: "J002", cdOccup_display: "직종B" } },
    { item: { cdOccup: "J003", cdOccup_display: "직종C" } },
    { item: { cdOccup: "J004", cdOccup_display: "직종D" } },
    { item: { cdOccup: "J005", cdOccup_display: "직종E" } },
    { item: { cdOccup: "J006", cdOccup_display: "직종F" } },
  ],
  searchField: ["cdOccup", "cdOccup_display"],
  usePk: "cdOccup",
};
// 직급
export const codeHelperData_rankNo = {
  subject: "직급코드 조회",
  headers: [
    { field: "rankNo", text: "직급코드" },
    { field: "nmRankNo", text: "직급명" },
  ],
  tableData: [
    { item: { rankNo: "RK01", rankNo_display: "사원" } },
    { item: { rankNo: "RK02", rankNo_display: "주임" } },
    { item: { rankNo: "RK03", rankNo_display: "대리" } },
    { item: { rankNo: "RK04", rankNo_display: "과장" } },
    { item: { rankNo: "RK05", rankNo_display: "차장" } },
    { item: { rankNo: "RK06", rankNo_display: "부장" } },
    { item: { rankNo: "RK11", nmRankrankNo_displayNo: "연구원" } },
    { item: { rankNo: "RK12", rankNo_display: "주임연구원" } },
    { item: { rankNo: "RK13", rankNo_display: "선임연구원" } },
    { item: { rankNo: "RK14", rankNo_display: "책임연구원" } },
  ],
  searchField: ["rankNo", "rankNo_display"],
  usePk: "rankNo",
};
// 호봉
export const codeHelperData_cdSalcls = {
  subject: "호봉코드 조회",
  headers: [
    { field: "cdSalcls", text: "호봉코드" },
    { field: "nmCdSalcls", text: "호봉" },
  ],
  tableData: [
    { item: { cdSalcls: "S00A", cdSalcls_display: "호봉A" } },
    { item: { cdSalcls: "S00B", cdSalcls_display: "호봉B" } },
    { item: { cdSalcls: "S00C", cdSalcls_display: "호봉C" } },
  ],
  searchField: ["cdSalcls", "cdSalcls_display"],
  usePk: "cdSalcls",
};
// 현장
export const codeHelperData_cdField = {
  subject: "현장코드 조회",
  headers: [
    { field: "cdField", text: "현장코드" },
    { field: "nmCdField", text: "현장" },
  ],
  tableData: [
    { item: { cdField: "F00A", cdField_display: "현장A" } },
    { item: { cdField: "F00B", cdField_display: "현장B" } },
    { item: { cdField: "F00C", cdField_display: "현장C" } },
    { item: { cdField: "F00D", cdField_display: "현장D" } },
    { item: { cdField: "F00E", cdField_display: "현장E" } },
    { item: { cdField: "F00F", cdField_display: "현장F" } },
  ],
  searchField: ["cdField", "cdField_display"],
  usePk: "cdField",
};
// 프로젝트
export const codeHelperData_cdProject = {
  subject: "프로젝트코드 조회",
  headers: [
    { field: "cdProject", text: "프로젝트 코드" },
    { field: "nmCdProject", text: "프로젝트명" },
  ],
  tableData: [
    { item: { cdProject: "P00A", cdProject_display: "프로젝트A" } },
    { item: { cdProject: "P00B", cdProject_display: "프로젝트B" } },
    { item: { cdProject: "P00C", cdProject_display: "프로젝트C" } },
    { item: { cdProject: "P00D", cdProject_display: "프로젝트D" } },
    { item: { cdProject: "P00E", cdProject_display: "프로젝트E" } },
    { item: { cdProject: "P00F", cdProject_display: "프로젝트F" } },
  ],
  searchField: ["cdProject", "cdProject_display"],
  usePk: "cdProject",
};
// 급여이체은행
export const codeHelperData_cdBank = {
  subject: "급여이체은행 조회",
  headers: [
    { field: "cdBank", text: "은행코드" },
    { field: "nmCdBank", text: "은행명" },
  ],
  tableData: [
    { item: { cdBank: "B001", cdBank_display: "국민" } },
    { item: { cdBank: "B002", cdBank_display: "기업" } },
    { item: { cdBank: "B003", cdBank_display: "농협" } },
    { item: { cdBank: "B004", cdBank_display: "신한" } },
    { item: { cdBank: "B005", cdBank_display: "우리" } },
    { item: { cdBank: "B006", cdBank_display: "하나" } },
  ],
  searchField: ["cdBank", "cdBank_display"],
  usePk: "cdBank",
};

// 미삭제 사원 목록 테이블 헤더
export const EmpRegisterUndeletedEmpHeaders = {
  subject: "삭제 실패된 사원목록",
  headers: [
    { field: "cdEmp", text: "사원코드" },
    { field: "nmKrname", text: "성명" },
    { field: "useMenuList", text: "사용중인 메뉴" },
  ],
  tableData: [],
  searchField: ["cdEmp", "nmKrname", "useMenuList"],
  usePk: "cdEmp",
};
