const CommonConstant = () => {
  return {
    searchOption: [
      {
        key: "yAndOnThisYear",
        value: "재직자 + 당해년도 퇴사자",
      },
      { key: "Y", value: "재직자" },
      { key: "N", value: "퇴직자" },
    ],
    orderList: [
      { key: "cdEmp", value: "코드순" },
      { key: "nmKrname", value: "이름순" },
    ],
    mainTabMenuList: ["기초정보", "인적정보"],
    mainTabMenuListForEmpRegister: ["기초정보", "가족사항"],
    subTabMenuList: ["가족", "학력", "경력", "신체", "병역"],
    genderRadioList: [
      { key: "M", value: "남자" },
      { key: "F", value: "여자" },
    ],
    marryRadioList: [
      { key: "Y", value: "기혼" },
      { key: "N", value: "미혼" },
    ],
    contractRadioList: [
      { key: "Y", value: "작성" },
      { key: "N", value: "미작성" },
    ],
    emailList: [
      { key: "daum.net", value: "daum.net" },
      { key: "gmail.com", value: "gmail.com" },
      { key: "hanmail.net", value: "hanmail.net" },
      { key: "kakao.com", value: "kakao.com" },
      { key: "msn.com", value: "msn.com" },
      { key: "mail.com", value: "mail.com" },
      { key: "nate.com", value: "nate.com" },
      { key: "naver.com", value: "naver.com" },
      { key: "tistory.com", value: "tistory.com" },
    ],
    ynForList: [
      { key: "0", value: "내국인" },
      { key: "1", value: "외국인" },
    ],
    //테이블 헤더
    LRlevel2GridLeftTableHeaders: [
      {
        field: "cdEmp",
        text: "사원코드",
        isPk: true,
      },
      { field: "nmKrname", text: "성명", isPk: true },
    ],
    LRlevel2GridSubTableHeaders: [
      { field: "cdFamrel", text: "관계" },
      { field: "nmKrname", text: "성명" },
      { field: "ynFor", text: "외국인" },
      { field: "noSocial", text: "주민등록번호", isPk: true },
      { field: "fgSchool", text: "학력" },
      { field: "fgGraduation", text: "졸업구분" },
      { field: "ynTogether", text: "동거" },
      { field: "ynLunarbir", text: "양음" },
      { field: "daBirth", text: "생년월일" },
      { field: "cdJob", text: "직업" },
      { field: "nmKrcom", text: "직장명" },
      { field: "cdOffpos", text: "직급" },
    ],
    EmpRegisterLeftHeaders: [
      { field: "cdEmp", text: "사원코드", isPk: true },
      { field: "nmKrname", text: "성명" },
      { field: "ynFor", text: "내외국인" },
      { field: "noSocial", text: "주민번호" },
      { field: "jobOk", text: "구분" },
    ],
    EmpRegisterMainHeaders: [
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
    ],
    labels: {
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
      daEnterForEmpRegister: "입사일자",
      addNation: "거주지국",
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
    },
  };
};

export default CommonConstant;
