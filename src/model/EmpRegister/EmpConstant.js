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
  { field: "telHome1", text: "전화번호" },
  // { field: "telHome2", text: "전화번호2" },
  // { field: "telHome3", text: "전화번호3" },
  { field: "celEmp1", text: "모바일번호" },
  // { field: "celEmp2", text: "모바일번호2" },
  // { field: "celEmp3", text: "모바일번호3" },
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
  telHome1: "전화번호",
  celEmp1: "모바일번호",
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
    { item: { abbNation: "KR", nmAbbNation: "대한민국" } },
    { item: { abbNation: "US", nmAbbNation: "미국" } },
    { item: { abbNation: "CN", nmAbbNation: "중국" } },
    { item: { abbNation: "JP", nmAbbNation: "일본" } },
    { item: { abbNation: "IN", nmAbbNation: "인도" } },
    { item: { abbNation: "PH", nmAbbNation: "필리핀" } },
  ],
  searchField: ["abbNation", "nmAbbNation"],
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
    { item: { cdNation: "KR", nmCdNation: "대한민국" } },
    { item: { cdNation: "US", nmCdNation: "미국" } },
    { item: { cdNation: "CN", nmCdNation: "중국" } },
    { item: { cdNation: "JP", nmCdNation: "일본" } },
    { item: { cdNation: "IN", nmCdNation: "인도" } },
    { item: { cdNation: "PH", nmCdNation: "필리핀" } },
  ],
  searchField: ["cdNation", "nmCdNation"],
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
    { item: { cdDept: "D001", nmDept: "인사팀" } },
    { item: { cdDept: "D002", nmDept: "경영지원팀" } },
    { item: { cdDept: "D003", nmDept: "개발팀" } },
  ],
  searchField: ["cdDept", "nmDept"],
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
    { item: { cdOccup: "J001", nmCdOccup: "직종A" } },
    { item: { cdOccup: "J002", nmCdOccup: "직종B" } },
    { item: { cdOccup: "J003", nmCdOccup: "직종C" } },
    { item: { cdOccup: "J004", nmCdOccup: "직종D" } },
    { item: { cdOccup: "J005", nmCdOccup: "직종E" } },
    { item: { cdOccup: "J006", nmCdOccup: "직종F" } },
  ],
  searchField: ["cdOccup", "nmCdOccup"],
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
    { item: { rankNo: "RK01", nmRankNo: "사원" } },
    { item: { rankNo: "RK02", nmRankNo: "주임" } },
    { item: { rankNo: "RK03", nmRankNo: "대리" } },
    { item: { rankNo: "RK04", nmRankNo: "과장" } },
    { item: { rankNo: "RK05", nmRankNo: "차장" } },
    { item: { rankNo: "RK06", nmRankNo: "부장" } },
    { item: { rankNo: "RK11", nmRankNo: "연구원" } },
    { item: { rankNo: "RK12", nmRankNo: "주임연구원" } },
    { item: { rankNo: "RK13", nmRankNo: "선임연구원" } },
    { item: { rankNo: "RK14", nmRankNo: "책임연구원" } },
  ],
  searchField: ["rankNo", "nmRankNo"],
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
    { item: { cdSalcls: "S00A", nmCdSalcls: "호봉A" } },
    { item: { cdSalcls: "S00B", nmCdSalcls: "호봉B" } },
    { item: { cdSalcls: "S00C", nmCdSalcls: "호봉C" } },
  ],
  searchField: ["cdSalcls", "nmCdSalcls"],
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
    { item: { cdField: "F00A", nmCdField: "현장A" } },
    { item: { cdField: "F00B", nmCdField: "현장B" } },
    { item: { cdField: "F00C", nmCdField: "현장C" } },
    { item: { cdField: "F00D", nmCdField: "현장D" } },
    { item: { cdField: "F00E", nmCdField: "현장E" } },
    { item: { cdField: "F00F", nmCdField: "현장F" } },
  ],
  searchField: ["cdField", "nmCdField"],
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
    { item: { cdProject: "P00A", nmCdProject: "프로젝트A" } },
    { item: { cdProject: "P00B", nmCdProject: "프로젝트B" } },
    { item: { cdProject: "P00C", nmCdProject: "프로젝트C" } },
    { item: { cdProject: "P00D", nmCdProject: "프로젝트D" } },
    { item: { cdProject: "P00E", nmCdProject: "프로젝트E" } },
    { item: { cdProject: "P00F", nmCdProject: "프로젝트F" } },
  ],
  searchField: ["cdProject", "nmCdProject"],
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
    { item: { cdBank: "B001", nmCdBank: "국민" } },
    { item: { cdBank: "B002", nmCdBank: "기업" } },
    { item: { cdBank: "B003", nmCdBank: "농협" } },
    { item: { cdBank: "B004", nmCdBank: "신한" } },
    { item: { cdBank: "B005", nmCdBank: "우리" } },
    { item: { cdBank: "B006", nmCdBank: "하나" } },
  ],
  searchField: ["cdBank", "nmCdBank"],
  usePk: "cdBank",
};

// // 코드도움 상수 모음
// export const codeHelperData = {
//   // 부서
//   cdDept: {
//     title: "부서코드 조회",
//     tableHeaders: [
//       { field: "cdDept", text: "부서코드" },
//       { field: "description", text: "부서이름" },
//     ],
//     tableData: [
//       { cdDept: "D001", description: "인사팀" },
//       { cdDept: "D002", description: "경영지원팀" },
//       { cdDept: "D003", description: "개발팀" },
//     ],
//     searchField: ["description"],
//   },
//   // 사원조회
//   emplist: {
//     title: "사원조회",
//     url: "/emp/getEmpListForCodeHelper",
//     headers: [
//       { field: "cdEmp", text: "사원코드" },
//       { field: "nmKrname", text: "사원명" },
//       { field: "noSocial", text: "주민(외국인)번호" },
//       { field: "daRetire", text: "퇴사일자" },
//     ],
//     params: { ynFor: "n", daRetire: "" },
//     searchField: ["nmKrname", "noSocial"],
//   },
//   //직급
//   rankNo: {
//     title: "직급",
//     tableHeaders: [
//       { field: "rankNo", text: "직급코드" },
//       { field: "description", text: "직급명" },
//     ],
//     tableData: [
//       { rankNo: "RK01", description: "사원" },
//       { rankNo: "RK02", description: "주임" },
//       { rankNo: "RK03", description: "대리" },
//       { rankNo: "RK04", description: "과장" },
//       { rankNo: "RK05", description: "차장" },
//       { rankNo: "RK06", description: "부장" },
//       { rankNo: "RK11", description: "연구원" },
//       { rankNo: "RK12", description: "주임연구원" },
//       { rankNo: "RK13", description: "선임연구원" },
//       { rankNo: "RK14", description: "책임연구원" },
//     ],
//     searchField: ["description"],
//   },
//   // 직종
//   cdOccup: {
//     title: "직종",
//     tableHeaders: [
//       { field: "cdOccup", text: "직종코드" },
//       { field: "description", text: "직종명" },
//     ],
//     tableData: [
//       { cdOccup: "J001", description: "직종A" },
//       { cdOccup: "J002", description: "직종B" },
//       { cdOccup: "J003", description: "직종C" },
//       { cdOccup: "J004", description: "직종D" },
//       { cdOccup: "J005", description: "직종E" },
//       { cdOccup: "J006", description: "직종F" },
//     ],
//   },
//   // 현장
//   cdField: {
//     title: "현장",
//     tableHeaders: [
//       { field: "cdField", text: "현장코드" },
//       { field: "description", text: "현장" },
//     ],
//     tableData: [
//       { cdField: "F00A", description: "현장A" },
//       { cdField: "F00B", description: "현장B" },
//       { cdField: "F00C", description: "현장C" },
//       { cdField: "F00D", description: "현장D" },
//       { cdField: "F00E", description: "현장E" },
//       { cdField: "F00F", description: "현장F" },
//     ],
//     searchField: ["description"],
//   },
//   // 프로젝트
//   cdProject: {
//     title: "프로젝트",
//     tableHeaders: [
//       { field: "cdProject", text: "프로젝트코드" },
//       { field: "description", text: "프로젝트명" },
//     ],
//     tableData: [
//       { cdProject: "P00A", description: "프로젝트A" },
//       { cdProject: "P00B", description: "프로젝트B" },
//       { cdProject: "P00C", description: "프로젝트C" },
//       { cdProject: "P00D", description: "프로젝트D" },
//       { cdProject: "P00E", description: "프로젝트E" },
//       { cdProject: "P00F", description: "프로젝트F" },
//     ],
//     searchField: ["description"],
//   },
//   // 거주지국
//   abbNation: {
//     title: "거주지국",
//     tableHeaders: [
//       { field: "abbNation", text: "거주지국코드" },
//       { field: "description", text: "거주지국명" },
//     ],
//     tableData: [
//       { abbNation: "KR", description: "대한민국" },
//       { abbNation: "US", description: "미국" },
//       { abbNation: "CN", description: "중국" },
//       { abbNation: "JP", description: "일본" },
//       { abbNation: "IN", description: "인도" },
//       { abbNation: "PH", description: "필리핀" },
//     ],
//     searchField: ["description"],
//   },
//   // 국적
//   cdNation: {
//     title: "국적",
//     tableHeaders: [
//       { field: "cdNation", text: "국적코드" },
//       { field: "description", text: "국적명" },
//     ],
//     tableData: [
//       { cdNation: "KR", description: "대한민국" },
//       { cdNation: "US", description: "미국" },
//       { cdNation: "CN", description: "중국" },
//       { cdNation: "JP", description: "일본" },
//       { cdNation: "IN", description: "인도" },
//       { cdNation: "PH", description: "필리핀" },
//     ],
//     searchField: ["description"],
//   },
//   // 호봉
//   cdSalcls: {
//     title: "호봉",
//     tableHeaders: [
//       { field: "cdSalcls", text: "호봉코드" },
//       { field: "description", text: "호봉" },
//     ],
//     tableData: [
//       { cdSalcls: "S00A", description: "호봉A" },
//       { cdSalcls: "S00B", description: "호봉B" },
//       { cdSalcls: "S00C", description: "호봉C" },
//     ],
//     searchField: ["description"],
//   },
// };

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

// 호봉
// export const codeHelperData_cdSalcls = {
//   title: "호봉",
//   tableHeaders: [
//     { field: "cdSalcls", text: "호봉코드" },
//     { field: "nmCdSalcls", text: "호봉" },
//   ],
//   tableData: [
//     { cdSalcls: "S00A", nmCdSalcls: "호봉A" },
//     { cdSalcls: "S00B", nmCdSalcls: "호봉B" },
//     { cdSalcls: "S00C", nmCdSalcls: "호봉C" },
//   ],
//   searchField: ["cdSalcls", "nmCdSalcls"],
//   usePk: "cdSalcls",
// };
