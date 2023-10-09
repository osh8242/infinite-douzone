import { CODE_TYPE, CODE_VALUE, SELECT_LIST } from "../CommonConstant";

////////////////////////////// 요청 Mapping Pattern
export const urlPattern = {
  insertEmp: "/emp/insertEmp",
  updateEmp: "/emp/updateEmp",
  deleteEmp: "/emp/deleteEmp",
  getEmpAddByCdEmp: "/empAdd/getEmpAddByCdEmp",
  insertEmpAdd: "/empAdd/insertEmpAdd",
  updateEmpAdd: "/empAdd/updateEmpAdd",
  deleteEmpAdd: "/empAdd/deleteEmpAdd",
  getEmpPhoto: "/empPhoto/getEmpPhotoByCdEmp",
  insertEmpPhoto: "/empPhoto/insertEmpPhoto",
  updateEmpPhoto: "/empPhoto/updateEmpPhoto",
  deleteEmpPhoto: "/empPhoto/deleteEmpPhoto",
  getEmpFamListByCdEmp: "/empFam/getEmpFamListByCdEmp",
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
    tableData: Object.keys(CODE_VALUE[CODE_TYPE["cdOffduty"]]).map((key) => {
      return {
        item: {
          cdOffduty: key,
          nmCdOffduty: CODE_VALUE[CODE_TYPE["cdOffduty"]][key],
        },
      };
    }),
    searchField: ["cdOffduty", "nmCdOffduty"],
    usePk: "cdOffduty",
  },
  cdFamrel: {
    field: "cdFamrel",
    title: "연말정산 관계조회",
    headers: [
      { field: "cdFamrel", text: "코드" },
      { field: "nmCdFamrel", text: "관계명" },
    ],
    tableData: Object.keys(CODE_VALUE[CODE_TYPE["cdFamrel"]]).map((key) => {
      return {
        item: {
          cdFamrel: key,
          nmCdFamrel: CODE_VALUE[CODE_TYPE["cdFamrel"]][key],
        },
      };
    }),
    searchField: ["cdFamrel", "nmCdFamrel"],
    usePk: "cdFamrel",
  },
  cdJob: {
    field: "cdJob",
    title: "직업 조회",
    headers: [
      { field: "cdJob", text: "직업코드" },
      { field: "nmCdJob", text: "직업명" },
    ],
    tableData: Object.keys(CODE_VALUE[CODE_TYPE["cdJob"]]).map((key) => {
      return {
        item: {
          cdJob: key,
          nmCdJob: CODE_VALUE[CODE_TYPE["cdJob"]][key],
        },
      };
    }),
    searchField: ["cdJob", "nmCdJob"],
    usePk: "cdJob",
  },
  cdOffpos: {
    field: "cdOffpos",
    title: "직급 조회",
    headers: [
      { field: "cdOffpos", text: "직급코드" },
      { field: "nmCdOffpos", text: "직급명" },
    ],
    tableData: Object.keys(CODE_VALUE[CODE_TYPE["cdOffpos"]]).map((key) => {
      return {
        item: {
          cdOffpos: key,
          nmCdOffpos: CODE_VALUE[CODE_TYPE["cdOffpos"]][key],
        },
      };
    }),
    searchField: ["cdOffpos", "nmCdOffpos"],
    usePk: "cdOffpos",
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
    {
      field: "cdFamrel",
      text: "연말정산관계",
      width: "100px",
      type: "textCodeHelper",
    },
    { field: "nmKrname", text: "성명", width: "75px" },
    {
      field: "ynFor",
      text: "내/외국인",
      width: "95px",
      type: "select",
      optionList: SELECT_LIST.ynFor,
    },
    { field: "noSocial", text: "주민등록번호", width: "145px" },
    {
      field: "fgSchool",
      text: "학력",
      width: "105px",
      type: "select",
      optionList: SELECT_LIST.fgSchool,
    },
    {
      field: "fgGraduation",
      text: "졸업",
      width: "82px",
      type: "select",
      optionList: SELECT_LIST.fgGraduation,
    },
    {
      field: "ynTogether",
      text: "동거",
      width: "70px",
      type: "select",
      optionList: SELECT_LIST.ynTogether,
    },
    {
      field: "ynLunarbir",
      text: "양음",
      width: "70px",
      type: "select",
      optionList: SELECT_LIST.ynLunarbir,
    },
    { field: "daBirth", text: "생년월일", type: "date" },
    { field: "cdJob", text: "직업", width: "90px", type: "textCodeHelper" },
    { field: "nmKrcom", text: "직장명", width: "90px" },
    { field: "cdOffpos", text: "직급", width: "80px", type: "textCodeHelper" },
  ],
};
