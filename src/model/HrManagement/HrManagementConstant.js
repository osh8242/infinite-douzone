////////////////////////////// 요청 Mapping Pattern
export const urlPattern = {
  insertEmp: "",
  updateEmp: "",
  deleteEmp: "/emp/deleteEmp",
  insertEmpPhoto: "/empPhoto/insertEmpPhoto",
  insertEmpFam: "/empFam/insertEmpFam",
  updateEmpFam: "/empFam/updateEmpFamBySeqValAndCdEmp",
  deleteEmpFam: "/empFam/deleteEmpFam",
};

////////////////////////////// 상위 조건조회
export const searchOption = [
  {
    key: "yAndOnThisYear",
    value: "재직자 + 당해년도 퇴사자",
  },
  { key: "Y", value: "재직자" },
  { key: "N", value: "퇴직자" },
];

export const orderList = [
  { key: "cdEmp", value: "코드순" },
  { key: "nmKrname", value: "이름순" },
];

////////////////////////////// 왼쪽 그리드영역
export const leftTableConstant = {
  headers: [
    {
      field: "cdEmp",
      text: "사원코드",
      isPk: true,
      width: "120px",
    },
    { field: "nmKrname", text: "성명" },
  ],
};
export const leftStaticsTableConstant = {
  headers: [
    {
      field: "jobOkY",
      text: "재직",
    },
    {
      field: "jobOkN",
      text: "퇴직",
    },
    {
      field: "jobOkSum",
      text: "총합",
    },
  ],
};

export const codeHelperParams = {
  emp: {
    title: "사원조회",
    url: "/emp/getEmpListForHrManagement",
    headers: [
      { field: "cdEmp", text: "사원코드" },
      { field: "nmKrname", text: "사원명" },
    ],
    params: { jobOk: "Y", refYear: "2023", orderRef: "cdEmp" },
    searchField: ["cdEmp", "nmKrname"],
  },
};

/////////////////////////////////// 우측 메인탭
export const tabConstant = {
  mainTabMenuList: ["기초정보", "인적정보"],
  subTabMenuList: ["가족", "학력", "경력", "신체", "병역"],
};

////////////////////////////////// 우측 서브그리드

export const subTableConstant = {
  headers: [
    { field: "cdFamrel", text: "관계" },
    { field: "nmKrname", text: "성명" },
    { field: "ynFor", text: "외국인" },
    { field: "noSocial", text: "주민등록번호" },
    { field: "fgSchool", text: "학력" },
    { field: "fgGraduation", text: "졸업구분" },
    { field: "ynTogether", text: "동거" },
    { field: "ynLunarbir", text: "양음" },
    { field: "daBirth", text: "생년월일" },
    { field: "cdJob", text: "직업" },
    { field: "nmKrcom", text: "직장명" },
    { field: "cdOffpos", text: "직급" },
  ],
};
