export const url = "http://localhost:8888";

export const mainTabMenuListForEmpRegister = ["기초정보", "가족사항"];

export const INPUT_TYPE = {
  text: 0,
  date: 1,
  select: 2,
  radio: 3,
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
    { key: "2", value: "외계인" },
  ],
};

export const emailList = [
  { key: "daum.net", value: "daum.net" },
  { key: "gmail.com", value: "gmail.com" },
  { key: "hanmail.net", value: "hanmail.net" },
  { key: "kakao.com", value: "kakao.com" },
  { key: "msn.com", value: "msn.com" },
  { key: "mail.com", value: "mail.com" },
  { key: "nate.com", value: "nate.com" },
  { key: "naver.com", value: "naver.com" },
  { key: "tistory.com", value: "tistory.com" },
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
  ynDrawContracts: "근로계약서",
  daEnter: "입사년월일",
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
  abbNation: "거주지국",
  cdNation: "국적",
  telHome: "전화번호",
  calEmp: "모바일번호",
  emEmp: "이메일",
  idMsn: "메신저ID",
  cdOccup: "직종",
  cdSalcls: "호봉",
  cdField: "현장",
  cdProject: "프로젝트",
  cdBank: "급여이체은행",

  mnReduction: "감면율",
  nmEmp: "사원이름",
  nmDeduct: "공제항목",
  nmAllow: "급여항목",
  allowPay: "금액",

  inquiryYype: "조회구분",
  searchText : "찾을내용",

  ynResident : "거주구분",
  ynMateDed : "배우자공제",
  ynOverwork : "연장근로비과세",

  allowMonth :"귀속연월",
  paymentDate : "지급일",
  ynUnit : "생산직여부",
  ynForlabor : "국외근로여부"
};

export const CODE = {
  URL: "/common/getCodeListForCodeHelper",  
  PARENT_ID: { DEPT: "DEPT", // 부서 ( 경영지원팀, 인사팀, 솔루션팀, 플랫폼팀)
      RANK_NO: "RANK_NO", // 직급 ( 주임, 선임, 책임, 수석, 사장)
      OCCUP: "OCCUP", // 직종 ()
  }  
};

export const CODEHELPER_EMPLIST_URL = "/emp/getEmpListForCodeHelper";
