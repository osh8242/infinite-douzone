export const url = "http://localhost:8888";

export const CODE_TYPE = {
  cdOffduty: "직무",
  cdOffpos: "직급",
  rankNo: "직급",
  cdDept: "부서",
};

export const CODE_VALUE = {
  [CODE_TYPE.cdOffduty]: {
    C001: "경영회계",
    C003: "금융보험",
    C004: "교육과학",
    C005: "법률행정",
    C006: "보건의료",
    C007: "문화예술",
    C008: "농림어업",
  },
  [CODE_TYPE.cdOffpos]: {
    R001: "사원",
    R002: "주임",
    R003: "대리",
    R004: "과장",
    R005: "차장",
    R006: "부장",
    R007: "이사",
    R008: "사장",
  },
  [CODE_TYPE.cdDept]: {
    D001: "인사팀",
    D002: "사업개발팀",
    D003: "기획팀",
    D004: "회계팀",
    D005: "재무팀",
    D006: "총무팀",
    D007: "마케팅팀",
    D008: "해외영업팀",
    D009: "국내영업팀",
    D010: "CS팀",
    D011: "모바일팀",
    D012: "플랫폼1팀",
    D013: "플랫폼2팀",
    D014: "ERP1팀",
    D015: "ERP2팀",
    D016: "솔루션팀",
    D017: "경영지원팀",
  },
  [CODE_TYPE.rankNo]: {
    RK01: "사원",
    RK02: "주임",
    RK03: "대리",
    RK04: "과장",
    RK05: "차장",
    RK06: "부장",
    RK07: "이사",
    RK08: "상무",
    RK09: "전무",
    RK10: "부사장",
    RK11: "사장",
    RK12: "연구원",
    RK13: "주임연구원",
    RK14: "전임연구원",
    RK15: "선임연구원",
    RK16: "책임연구원",
    RK17: "수석연구원",
  },
};

export const INPUT_TYPE = {
  text: 0,
  date: 1,
  select: 2,
  radio: 3,
  address: 4,
  textCodeHelper: 5,
  regNum: 6,
  callNumber: 100,
  email: 101,
  dateCustom: 300,
  addressCustom: 301,
  selectCustom: 302,
  month: 401,
  dateCodeHelper: 402,
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
  jobOk: [
    { key: "Y", value: "재직" },
    { key: "N", value: "퇴직" },
  ],
  ynFor: [
    { key: "K", value: "내국인" },
    { key: "F", value: "외국인" },
    { key: "A", value: "외계인" },
  ],
  fgSex: [
    { key: "M", value: "남자" },
    { key: "W", value: "여자" },
  ],
  ynEmploy: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
  ynSanjae: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
  ynLonginsur: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
  ynForlabor: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
  ynUnit: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
  ynOverwork: [
    { key: "Y", value: "0.여" },
    { key: "N", value: "1.부" },
  ],
};

export const RADIO_LIST = {
  fgSex: [
    { key: "M", value: "남자" },
    { key: "F", value: "여자" },
  ],
  fgWedding: [
    { key: "Y", value: "기혼" },
    { key: "N", value: "미혼" },
  ],
  ynDrawContracts: [
    { key: "Y", value: "작성" },
    { key: "N", value: "미작성" },
  ],
  ynForList: [
    { key: "0", value: "내국인" },
    { key: "1", value: "외국인" },
  ],
  fgDisorder: [
    { key: "N", value: "비장애" },
    { key: "Y", value: "장애" },
  ],
  fgOwnHouse: [
    { key: "Y", value: "소유" },
    { key: "N", value: "미소유" },
  ],
};

export const EMAIL_LIST = [
  { key: "empty", value: "선택없음" },
  { key: "daum", value: "daum.net" },
  { key: "gmail", value: "gmail.com" },
  { key: "hanmail", value: "hanmail.net" },
  { key: "kakao", value: "kakao.com" },
  { key: "msn", value: "msn.com" },
  { key: "mail", value: "mail.com" },
  { key: "nate", value: "nate.com" },
  { key: "naver", value: "naver.com" },
  { key: "tistory", value: "tistory.com" },
];
export const LABELS = {
  cdEmp: "사원코드",
  nmKrname: "성명",
  nmEnName: "영문성명",
  nmChName: "한자성명",
  noSocial: "주민등록번호",
  fgSex: "성별",
  daBirth: "생년월일",
  fgWedding: "결혼여부",
  cdDept: "부서",
  rankNo: "직급",
  cdOffduty: "직무",
  tyEmploy: "채용구분",
  dcMidretire: "중도퇴직정산",
  ynDrawContracts: "근로계약서",
  daEnter: "입사년월일",
  dateOfcreate: "작성일자",
  daRetire: "퇴사년월일",
  cdFamrel: "관계",
  ynFor: "외국인",
  fgSchool: "학력",
  fgGraduation: "졸업구분",
  ynTogether: "동거",
  ynLunarbir: "양음",
  cdJob: "직업",
  nmKrcom: "직장명",
  cdOffpos: "직급",
  fgDisorder: "장애여부",
  strHobby: "취미",
  nmSpecial: "특기",
  tyReligion: "종교",
  zipHome: "현주소 우편번호",
  addHome1: "현주소",
  addHome2: "현 상세주소",
  zipOrgin: "본적주소 우편번호",
  addOrgin1: "본적주소",
  addOrgin2: "본적 상세주소",
  mnKeepgarden: "소유동산",
  mnKeepstate: "소유부동산",
  fgOwnHouse: "자택소유",
  mnMmaverage: "월평균임금",
  ynEmploy: "고용보험적용",
  ynSanjae: "산재보험적용",
  ynLonginsur: "장기요양보험적용",

  abbNation: "거주지국",
  cdNation: "국적",
  telHome: "전화번호",
  celEmp: "모바일번호",
  telOffice: "담당전화",
  emEmp: "이메일",
  idMsn: "메신저ID",
  cdOccup: "직종",
  cdSalcls: "호봉",
  cdField: "현장",
  cdProject: "프로젝트",
  cdBank: "급여이체은행",
  noBnkacct: "계좌번호",
  nmBnkowner: "예금주",
  jobOk: "재직구분",

  mnReduction: "감면율",
  nmEmp: "사원이름",
  nmDeduct: "공제항목",
  nmAllow: "급여항목",
  allowPay: "금액",
  inquiryYype: "조회구분",
  searchText: "찾을내용",
  allowMonth: "귀속연월",
  paymentDate: "지급일",
  ynUnit: "생산직 여부",
  ynForlabor: "국외 근로여부",

  ynMateDed: "배우자공제",
  ynResident: "거주구분",
  ynOverwork: "연장근로비과세",
  num20Family: "20세",
  num60Family: "60세",
  numManyFamily: "다자녀",
  ynForLabor: "국외근무",

  allowMonth: "귀속연월",
  paymentDate: "지급일",
  ynUnit: "생산직여부",
  ynForlabor: "국외근로여부",

  // LaborContract
  empContractPeriod: "근로계약기간",
  workAddress: "근무장소",
  addDetail: "상세주소",
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
  dateOfcreate: "작성일자", ///

  address: "근무장소",
  startWorktime: "시작근로시간",
  endWorktime: "종료근로시간",
  startBreakTime: "시작휴게시간",
  endBreakTime: "종료휴게시간",
  bonusAmount: "상여금",
  paymentDate: "작성일자",
  startEmpContractPeriod: "계약시작기간",
  endEmpContractPeriod: "계약종료기간",
};

export const CODE = {
  URL: "/common/getCodeListForCodeHelper",
  PARENT_ID: {
    DEPT: "DEPT", // 부서 ( 경영지원팀, 인사팀, 솔루션팀, 플랫폼팀)
    RANK_NO: "RANK_NO", // 직급 ( 주임, 선임, 책임, 수석, 사장)
    OCCUP: "OCCUP", // 직종 ()
  },
};

export const CODEHELPER_EMPLIST_URL = "/emp/getEmpListForCodeHelper";
