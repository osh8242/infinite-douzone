export const url = "http://localhost:8888";
// export const url = "http://52.78.198.96:8888"; // AWS 백엔드 서버

export const CODE_TYPE = {
  cdOffduty: "직무",
  cdOffpos: "직급",
  cdFamrel: "연말정산관계",
  cdJob: "직업",
  abbNation: "거주지국",
  cdNation: "국적",
  cdDept: "부서",
  cdOccup: "직종",
  rankNo: "직급",
  cdSalcls: "호봉",
  cdField: "현장",
  cdProject: "프로젝트",
  cdBank: "급여이제츤행",
};

export const CODE_VALUE = {
  [CODE_TYPE.cdOffduty]: {
    C001: "경영회계",
    C002: "국방안보",
    C003: "금융보험",
    C004: "교육과학",
    C005: "법률행정",
    C006: "보건의료",
    C007: "문화예술",
    C008: "농수산업",
  },
  [CODE_TYPE.cdFamrel]: {
    CF0: "본인",
    CF1: "직계존속",
    CF2: "배우자",
    CF3: "직계비속",
    CF4: "직계비속예외",
    CF5: "형제자매",
    CF6: "수급자",
    CF7: "기타",
  },
  [CODE_TYPE.cdJob]: {
    "001": "회사원",
    "002": "공무원",
    "003": "서비스업",
    "004": "판매업",
    "005": "농림어업",
    "006": "사업",
    "007": "기타 ",
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
  [CODE_TYPE.abbNation]: {
    AR: "아르헨티나",
    AU: "호주",
    AT: "오스트리아",
    BD: "방글라데시",
    BY: "벨라루스",
    BE: "벨기에",
    BR: "브라질",
    BG: "불가리아",
    KH: "캄보디아",
    CM: "카메룬",
    CA: "캐나다",
    CL: "칠레",
    CN: "중국",
    CO: "콜롬비아",
    DK: "덴마크",
    EC: "에콰도르",
    FJ: "피지",
    FR: "프랑스",
    GE: "조지아",
    DE: "독일",
    GH: "가나",
    GR: "그리스",
    GU: "괌",
    HK: "홍콩",
    IN: "인도",
    ID: "인도네시아",
    IE: "아일랜드",
    IT: "이탈리아",
    JP: "일본",
    KR: "대한민국",
    MX: "멕시코",
    PH: "필리핀",
    US: "미국",
  },
  [CODE_TYPE.cdNation]: {
    AR: "아르헨티나",
    AU: "호주",
    AT: "오스트리아",
    BD: "방글라데시",
    BY: "벨라루스",
    BE: "벨기에",
    BR: "브라질",
    BG: "불가리아",
    KH: "캄보디아",
    CM: "카메룬",
    CA: "캐나다",
    CL: "칠레",
    CN: "중국",
    CO: "콜롬비아",
    DK: "덴마크",
    EC: "에콰도르",
    FJ: "피지",
    FR: "프랑스",
    GE: "조지아",
    DE: "독일",
    GH: "가나",
    GR: "그리스",
    GU: "괌",
    HK: "홍콩",
    IN: "인도",
    ID: "인도네시아",
    IE: "아일랜드",
    IT: "이탈리아",
    JP: "일본",
    KR: "대한민국",
    MX: "멕시코",
    PH: "필리핀",
    US: "미국",
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
  [CODE_TYPE.cdOccup]: {
    J001: "경영사무",
    J002: "마케팅/광고/홍보",
    J003: "IT개발/인터넷",
    J004: "디자인",
    J005: "무역/유통",
    J006: "영업/고객상담",
    J007: "서비스",
    J008: "연구개발/설계",
    J009: "교육",
    J010: "건설/건축",
    J011: "의료",
    J012: "미디어/문화",
    J013: "전문/특수/연구직",
    J014: "관광레저서비스",
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
  [CODE_TYPE.cdSalcls]: {
    S001: "1",
    S002: "2",
    S003: "3",
    S004: "4",
    S005: "5",
    S006: "6",
    S007: "7",
    S008: "8",
    S009: "9",
    S010: "10",
    S011: "11",
    S012: "12",
    S013: "13",
    S014: "14",
    S015: "15",
    S016: "16",
    S017: "17",
    S018: "18",
    S019: "19",
    S020: "20",
    S021: "21",
    S022: "22",
    S023: "23",
    S024: "24",
    S025: "25",
    S026: "26",
    S027: "27",
    S028: "28",
    S029: "29",
    S030: "30",
    S031: "31",
    S032: "32",
    S033: "33",
    S034: "34",
    S035: "35",
    S036: "36",
    S037: "37",
    S038: "38",
    S039: "39",
    S040: "40",
  },
  [CODE_TYPE.cdField]: {
    F00A: "현장A",
    F00B: "현장B",
    F00C: "현장C",
    F00D: "현장D",
    F00E: "현장E",
    F00F: "현장F",
  },
  [CODE_TYPE.cdProject]: {
    P00A: "프로젝트A",
    P00B: "프로젝트B",
    P00C: "프로젝트C",
    P00D: "프로젝트D",
    P00E: "프로젝트E",
    P00F: "프로젝트F",
  },
  [CODE_TYPE.cdBank]: {
    B001: "KEB하나은행",
    B002: "SC제일은행",
    B003: "국민은행",
    B004: "신한은행",
    B005: "외환은행",
    B006: "우리은행",
    B007: "한국시티은행",
    B008: "경남은행",
    B009: "광주은행",
    B010: "대구은행",
    B011: "부산은행",
    B012: "전북은행",
    B013: "제주은행",
    B014: "기업은행",
    B015: "농협",
    B016: "수협",
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
  ],
  fgSchool: [
    { key: "1", value: "무학" },
    { key: "2", value: "초등학교" },
    { key: "3", value: "중학교" },
    { key: "4", value: "고등학교" },
    { key: "5", value: "전문대학" },
    { key: "6", value: "대학교" },
    { key: "7", value: "대학원" },
    { key: "8", value: "기타" },
  ],
  fgGraduation: [
    { key: "1", value: "검정" },
    { key: "2", value: "수료" },
    { key: "3", value: "입학" },
    { key: "4", value: "재학" },
    { key: "5", value: "졸업" },
    { key: "6", value: "증퇴" },
    { key: "7", value: "기타" },
  ],
  ynTogether: [
    { key: "0", value: "여" },
    { key: "1", value: "부" },
  ],
  ynLunarbir: [
    { key: "0", value: "양" },
    { key: "1", value: "음" },
  ],
  fgSex: [
    { key: "M", value: "남자" },
    { key: "F", value: "여자" },
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
  mnKeepestate: "소유부동산",
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
