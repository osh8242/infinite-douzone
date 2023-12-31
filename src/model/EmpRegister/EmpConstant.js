import { CODE_TYPE, CODE_VALUE, SELECT_LIST } from "../CommonConstant";

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
  mainTabMenuListForEmpRegister: ["기초정보"],
};

//왼쪽 테이블 헤더
export const EmpRegisterLeftHeaders = [
  { field: "cdEmp", text: "사원코드", isPk: true, width: "70px" },
  { field: "nmKrname", text: "성명" },
  {
    field: "ynFor",
    text: "내외국인",
    type: "select",
    optionList: SELECT_LIST.ynFor,
    width: "70px",
  },
  { field: "noSocial", text: "주민번호", width: "140px", type: "regNum" },
  {
    field: "jobOk",
    text: "구분",
    type: "select",
    optionList: SELECT_LIST.jobOk,
    width: "70px",
  },
];

//왼쪽 통계 테이블
export const leftStaticsTableConstant = {
  headers: [
    {
      field: "jobOkA",
      text: "전체",
    },
    {
      field: "jobOkY",
      text: "재직",
    },
  ],
};

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
    { item: { abbNation: "AR", nmAbbNation: "아르헨티나" } },
    { item: { abbNation: "AU", nmAbbNation: "호주" } },
    { item: { abbNation: "AT", nmAbbNation: "오스트리아" } },
    { item: { abbNation: "BD", nmAbbNation: "방글라데시" } },
    { item: { abbNation: "BY", nmAbbNation: "벨라루스" } },
    { item: { abbNation: "BE", nmAbbNation: "벨기에" } },
    { item: { abbNation: "BR", nmAbbNation: "브라질" } },
    { item: { abbNation: "BG", nmAbbNation: "불가리아" } },
    { item: { abbNation: "KH", nmAbbNation: "캄보디아" } },
    { item: { abbNation: "CM", nmAbbNation: "카메룬" } },
    { item: { abbNation: "CA", nmAbbNation: "캐나다" } },
    { item: { abbNation: "CL", nmAbbNation: "칠레" } },
    { item: { abbNation: "CN", nmAbbNation: "중국" } },
    { item: { abbNation: "CO", nmAbbNation: "콜롬비아" } },
    { item: { abbNation: "DK", nmAbbNation: "덴마크" } },
    { item: { abbNation: "EC", nmAbbNation: "에콰도르" } },
    { item: { abbNation: "FJ", nmAbbNation: "피지" } },
    { item: { abbNation: "FR", nmAbbNation: "프랑스" } },
    { item: { abbNation: "GE", nmAbbNation: "조지아" } },
    { item: { abbNation: "DE", nmAbbNation: "독일" } },
    { item: { abbNation: "GH", nmAbbNation: "가나" } },
    { item: { abbNation: "GR", nmAbbNation: "그리스" } },
    { item: { abbNation: "GU", nmAbbNation: "괌" } },
    { item: { abbNation: "HK", nmAbbNation: "홍콩" } },
    { item: { abbNation: "IN", nmAbbNation: "인도" } },
    { item: { abbNation: "ID", nmAbbNation: "인도네시아" } },
    { item: { abbNation: "IE", nmAbbNation: "아일랜드" } },
    { item: { abbNation: "IT", nmAbbNation: "이탈리아" } },
    { item: { abbNation: "JP", nmAbbNation: "일본" } },
    { item: { abbNation: "KR", nmAbbNation: "대한민국" } },
    { item: { abbNation: "MX", nmAbbNation: "멕시코" } },
    { item: { abbNation: "PH", nmAbbNation: "필리핀" } },
    { item: { abbNation: "US", nmAbbNation: "미국" } },
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
    { item: { cdNation: "AR", nmCdNation: "아르헨티나" } },
    { item: { cdNation: "AU", nmCdNation: "호주" } },
    { item: { cdNation: "AT", nmCdNation: "오스트리아" } },
    { item: { cdNation: "BD", nmCdNation: "방글라데시" } },
    { item: { cdNation: "BY", nmCdNation: "벨라루스" } },
    { item: { cdNation: "BE", nmCdNation: "벨기에" } },
    { item: { cdNation: "BR", nmCdNation: "브라질" } },
    { item: { cdNation: "BG", nmCdNation: "불가리아" } },
    { item: { cdNation: "KH", nmCdNation: "캄보디아" } },
    { item: { cdNation: "CM", nmCdNation: "카메룬" } },
    { item: { cdNation: "CA", nmCdNation: "캐나다" } },
    { item: { cdNation: "CL", nmCdNation: "칠레" } },
    { item: { cdNation: "CN", nmCdNation: "중국" } },
    { item: { cdNation: "CO", nmCdNation: "콜롬비아" } },
    { item: { cdNation: "DK", nmCdNation: "덴마크" } },
    { item: { cdNation: "EC", nmCdNation: "에콰도르" } },
    { item: { cdNation: "FJ", nmCdNation: "피지" } },
    { item: { cdNation: "FR", nmCdNation: "프랑스" } },
    { item: { cdNation: "GE", nmCdNation: "조지아" } },
    { item: { cdNation: "DE", nmCdNation: "독일" } },
    { item: { cdNation: "GH", nmCdNation: "가나" } },
    { item: { cdNation: "GR", nmCdNation: "그리스" } },
    { item: { cdNation: "GU", nmCdNation: "괌" } },
    { item: { cdNation: "HK", nmCdNation: "홍콩" } },
    { item: { cdNation: "IN", nmCdNation: "인도" } },
    { item: { cdNation: "ID", nmCdNation: "인도네시아" } },
    { item: { cdNation: "IE", nmCdNation: "아일랜드" } },
    { item: { cdNation: "IT", nmCdNation: "이탈리아" } },
    { item: { cdNation: "JP", nmCdNation: "일본" } },
    { item: { cdNation: "KR", nmCdNation: "대한민국" } },
    { item: { cdNation: "MX", nmCdNation: "멕시코" } },
    { item: { cdNation: "PH", nmCdNation: "필리핀" } },
    { item: { cdNation: "US", nmCdNation: "미국" } },
  ],
  searchField: ["cdNation", "nmCdNation"],
  usePk: "cdNation",
};
// 부서
export const codeHelperData_cdDept = {
  subject: "부서코드 조회",
  headers: [
    { field: "cdDept", text: "부서코드" },
    { field: "nmCdDept", text: "부서이름" },
  ],
  tableData: [
    { item: { cdDept: "D001", nmCdDept: "인사팀" } },
    { item: { cdDept: "D002", nmCdDept: "사업개발팀" } },
    { item: { cdDept: "D003", nmCdDept: "기획팀" } },
    { item: { cdDept: "D004", nmCdDept: "회계팀" } },
    { item: { cdDept: "D005", nmCdDept: "재무팀" } },
    { item: { cdDept: "D006", nmCdDept: "총무팀" } },
    { item: { cdDept: "D007", nmCdDept: "마케팅팀" } },
    { item: { cdDept: "D008", nmCdDept: "해외영업팀" } },
    { item: { cdDept: "D009", nmCdDept: "국내영업팀" } },
    { item: { cdDept: "D010", nmCdDept: "CS팀" } },
    { item: { cdDept: "D011", nmCdDept: "모바일팀" } },
    { item: { cdDept: "D012", nmCdDept: "플랫폼1팀" } },
    { item: { cdDept: "D013", nmCdDept: "플랫폼2팀" } },
    { item: { cdDept: "D014", nmCdDept: "ERP1팀" } },
    { item: { cdDept: "D015", nmCdDept: "ERP2팀" } },
    { item: { cdDept: "D016", nmCdDept: "솔루션팀" } },
    { item: { cdDept: "D017", nmCdDept: "경영지원팀" } },
  ],
  searchField: ["cdDept", "nmCdDept"],
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
    { item: { cdOccup: "J001", nmCdOccup: "경영사무" } },
    { item: { cdOccup: "J002", nmCdOccup: "마케팅/광고/홍보" } },
    { item: { cdOccup: "J003", nmCdOccup: "IT개발/인터넷" } },
    { item: { cdOccup: "J004", nmCdOccup: "디자인" } },
    { item: { cdOccup: "J005", nmCdOccup: "무역/유통" } },
    { item: { cdOccup: "J006", nmCdOccup: "영업/고객상담" } },
    { item: { cdOccup: "J007", nmCdOccup: "서비스" } },
    { item: { cdOccup: "J008", nmCdOccup: "연구개발/설계" } },
    { item: { cdOccup: "J009", nmCdOccup: "교육" } },
    { item: { cdOccup: "J010", nmCdOccup: "건설/건축" } },
    { item: { cdOccup: "J011", nmCdOccup: "의료" } },
    { item: { cdOccup: "J012", nmCdOccup: "미디어/문화" } },
    { item: { cdOccup: "J013", nmCdOccup: "전문/특수/연구직" } },
    { item: { cdOccup: "J014", nmCdOccup: "관광레저서비스" } },
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
    { item: { rankNo: "RK07", nmRankNo: "이사" } },
    { item: { rankNo: "RK08", nmRankNo: "상무" } },
    { item: { rankNo: "RK09", nmRankNo: "전무" } },
    { item: { rankNo: "RK10", nmRankNo: "부사장" } },
    { item: { rankNo: "RK11", nmRankNo: "사장" } },
    { item: { rankNo: "RK12", nmRankNo: "연구원" } },
    { item: { rankNo: "RK13", nmRankNo: "주임연구원" } },
    { item: { rankNo: "RK14", nmRankNo: "전임연구원" } },
    { item: { rankNo: "RK15", nmRankNo: "선임연구원" } },
    { item: { rankNo: "RK16", nmRankNo: "책임연구원" } },
    { item: { rankNo: "RK17", nmRankNo: "수석연구원" } },
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
    { item: { cdSalcls: "S001", nmCdSalcls: "1" } },
    { item: { cdSalcls: "S002", nmCdSalcls: "2" } },
    { item: { cdSalcls: "S003", nmCdSalcls: "3" } },
    { item: { cdSalcls: "S004", nmCdSalcls: "4" } },
    { item: { cdSalcls: "S005", nmCdSalcls: "5" } },
    { item: { cdSalcls: "S006", nmCdSalcls: "6" } },
    { item: { cdSalcls: "S007", nmCdSalcls: "7" } },
    { item: { cdSalcls: "S008", nmCdSalcls: "8" } },
    { item: { cdSalcls: "S009", nmCdSalcls: "9" } },
    { item: { cdSalcls: "S010", nmCdSalcls: "10" } },
    { item: { cdSalcls: "S011", nmCdSalcls: "11" } },
    { item: { cdSalcls: "S012", nmCdSalcls: "12" } },
    { item: { cdSalcls: "S013", nmCdSalcls: "13" } },
    { item: { cdSalcls: "S014", nmCdSalcls: "14" } },
    { item: { cdSalcls: "S015", nmCdSalcls: "15" } },
    { item: { cdSalcls: "S016", nmCdSalcls: "16" } },
    { item: { cdSalcls: "S017", nmCdSalcls: "17" } },
    { item: { cdSalcls: "S018", nmCdSalcls: "18" } },
    { item: { cdSalcls: "S019", nmCdSalcls: "19" } },
    { item: { cdSalcls: "S020", nmCdSalcls: "20" } },
    { item: { cdSalcls: "S021", nmCdSalcls: "21" } },
    { item: { cdSalcls: "S022", nmCdSalcls: "22" } },
    { item: { cdSalcls: "S023", nmCdSalcls: "23" } },
    { item: { cdSalcls: "S024", nmCdSalcls: "24" } },
    { item: { cdSalcls: "S025", nmCdSalcls: "25" } },
    { item: { cdSalcls: "S026", nmCdSalcls: "26" } },
    { item: { cdSalcls: "S027", nmCdSalcls: "27" } },
    { item: { cdSalcls: "S028", nmCdSalcls: "28" } },
    { item: { cdSalcls: "S029", nmCdSalcls: "29" } },
    { item: { cdSalcls: "S030", nmCdSalcls: "30" } },
    { item: { cdSalcls: "S031", nmCdSalcls: "31" } },
    { item: { cdSalcls: "S032", nmCdSalcls: "32" } },
    { item: { cdSalcls: "S033", nmCdSalcls: "33" } },
    { item: { cdSalcls: "S034", nmCdSalcls: "34" } },
    { item: { cdSalcls: "S035", nmCdSalcls: "35" } },
    { item: { cdSalcls: "S036", nmCdSalcls: "36" } },
    { item: { cdSalcls: "S037", nmCdSalcls: "37" } },
    { item: { cdSalcls: "S038", nmCdSalcls: "38" } },
    { item: { cdSalcls: "S039", nmCdSalcls: "39" } },
    { item: { cdSalcls: "S040", nmCdSalcls: "40" } },
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
    { item: { cdBank: "B001", nmCdBank: "KEB하나은행" } },
    { item: { cdBank: "B002", nmCdBank: "SC제일은행" } },
    { item: { cdBank: "B003", nmCdBank: "국민은행" } },
    { item: { cdBank: "B004", nmCdBank: "신한은행" } },
    { item: { cdBank: "B005", nmCdBank: "외환은행" } },
    { item: { cdBank: "B006", nmCdBank: "우리은행" } },
    { item: { cdBank: "B007", nmCdBank: "한국시티은행" } },
    { item: { cdBank: "B008", nmCdBank: "경남은행" } },
    { item: { cdBank: "B009", nmCdBank: "광주은행" } },
    { item: { cdBank: "B010", nmCdBank: "대구은행" } },
    { item: { cdBank: "B011", nmCdBank: "부산은행" } },
    { item: { cdBank: "B012", nmCdBank: "전북은행" } },
    { item: { cdBank: "B013", nmCdBank: "제주은행" } },
    { item: { cdBank: "B014", nmCdBank: "기업은행" } },
    { item: { cdBank: "B015", nmCdBank: "농협" } },
    { item: { cdBank: "B016", nmCdBank: "수협" } },
  ],
  searchField: ["cdBank", "nmCdBank"],
  usePk: "cdBank",
};

// 미삭제 사원 목록 테이블 헤더
// export const EmpRegisterUndeletedEmpHeaders = {
//   subject: "삭제 실패된 사원목록",
//   headers: [
//     { field: "cdEmp", text: "사원코드" },
//     { field: "nmKrname", text: "성명" },
//     { field: "useMenuList", text: "사용중인 메뉴" },
//   ],
//   tableData: [],
//   searchField: ["cdEmp", "nmKrname", "useMenuList"],
//   usePk: "cdEmp",
// };
