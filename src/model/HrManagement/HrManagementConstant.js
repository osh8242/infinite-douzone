import { SELECT_LIST } from "../CommonConstant";

////////////////////////////// 요청 Mapping Pattern
export const urlPattern = {
  insertEmp: "/emp/insertEmp",
  updateEmp: "",
  deleteEmp: "/emp/deleteEmp",
  deleteEmpAdd: "/empAdd/deleteEmpAdd",
  getEmpPhoto: "/empPhoto/getEmpPhotoByCdEmp",
  insertEmpPhoto: "/empPhoto/insertEmpPhoto",
  updateEmpPhoto: "/empPhoto/updateEmpPhoto",
  deleteEmpPhoto: "/empPhoto/deleteEmpPhoto",
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

export const CODE_HELPER_DATA = {
  leftTableCodeHelper: {
    title: "사원 조회",
    headers: [
      { field: "cdEmp", text: "사원코드" },
      { field: "nmKrname", text: "사원명" },
    ],
    tableData: [],
    searchField: ["cdEmp", "nmKrname"],
  },
  cdOffduty: {
    title: "직무 조회",
    headers: [
      { field: "cdOffduty", text: "직무코드" },
      { field: "nmCdOffduty", text: "직무명" },
    ],
    tableData: [
      { item: { cdOffduty: "C001", nmCdOffduty: "경영회계" } },
      { item: { cdOffduty: "C003", nmCdOffduty: "금융보험" } },
      { item: { cdOffduty: "C004", nmCdOffduty: "교육과학" } },
      { item: { cdOffduty: "C005", nmCdOffduty: "법률행정" } },
      { item: { cdOffduty: "C006", nmCdOffduty: "보건의료" } },
      { item: { cdOffduty: "C007", nmCdOffduty: "문화예술" } },
      { item: { cdOffduty: "C008", nmCdOffduty: "농림어업" } },
    ],
    searchField: ["cdOffduty", "nmCdOffduty"],
    usePk: "cdOffduty",
  },
  rankNo: {
    title: "직급 조회",
    headers: [
      { field: "rankNo", text: "직급코드" },
      { field: "nmRankNo", text: "직급명" },
    ],
    tableData: [
      { item: { rankNo: "R001", nmRankNo: "사원" } },
      { item: { rankNo: "R002", nmRankNo: "주임" } },
      { item: { rankNo: "R003", nmRankNo: "대리" } },
      { item: { rankNo: "R004", nmRankNo: "과장" } },
      { item: { rankNo: "R005", nmRankNo: "차장" } },
      { item: { rankNo: "R006", nmRankNo: "부장" } },
      { item: { rankNo: "R007", nmRankNo: "이사" } },
      { item: { rankNo: "R008", nmRankNo: "사장" } },
    ],
    searchField: ["rankNo", "nmRankNo"],
    usePk: "rankNo",
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
    { field: "cdFamrel", text: "관계", width: "70px" },
    { field: "nmKrname", text: "성명", width: "70px" },
    {
      field: "ynFor",
      text: "외국인",
      width: "90px",
      type: "select",
      optionList: SELECT_LIST.ynFor,
    },
    { field: "noSocial", text: "주민등록번호", width: "150px" },
    { field: "fgSchool", text: "학력", width: "70px" },
    { field: "fgGraduation", text: "졸업구분", width: "70px" },
    { field: "ynTogether", text: "동거", width: "40px" },
    { field: "ynLunarbir", text: "양음", width: "40px" },
    { field: "daBirth", text: "생년월일", type: "date", width: "114px" },
    { field: "cdJob", text: "직업", width: "65px" },
    { field: "nmKrcom", text: "직장명", width: "65px" },
    { field: "cdOffpos", text: "직급", width: "65px" },
  ],
};
