const EmpConstant = () => {
  return {
    codeHelperparams: {
      cdDept: {
        title: "부서코드 조회",
        tableHeaders: [
          { field: "cdDept", text: "부서코드" },
          { field: "nmCdDept", text: "부서이름" },
        ],
        tableData: [
          { cdDept: "D001", nmCdDept: "인사팀" },
          { cdDept: "D002", nmCdDept: "경영지원팀" },
          { cdDept: "D003", nmCdDept: "개발팀" },
        ],
        searchField: ["nmCdDept"],
      },
      emplist: {
        title: "사원조회",
        url: "/emp/getEmpListForCodeHelper",
        headers: [
          { field: "cdEmp", text: "사원코드" },
          { field: "nmKrname", text: "사원명" },
          { field: "noSocial", text: "주민(외국인)번호" },
          { field: "daRetire", text: "퇴사일자" },
        ],
        params: { ynFor: "n", daRetire: "" },
        searchField: ["nmKrname", "noSocial"],
      },
      rankNo: {
        title: "직급",
        tableHeaders: [
          { field: "rankNo", text: "직급코드" },
          { field: "nmRankNo", text: "직급명" },
        ],
        tableData: [
          { rankNo: "RK01", nmRankNo: "사원" },
          { rankNo: "RK02", nmRankNo: "주임" },
          { rankNo: "RK03", nmRankNo: "대리" },
          { rankNo: "RK04", nmRankNo: "과장" },
          { rankNo: "RK05", nmRankNo: "차장" },
          { rankNo: "RK06", nmRankNo: "부장" },
          { rankNo: "RK11", nmRankNo: "연구원" },
          { rankNo: "RK12", nmRankNo: "주임연구원" },
          { rankNo: "RK13", nmRankNo: "선임연구원" },
          { rankNo: "RK14", nmRankNo: "책임연구원" },
        ],
        searchField: ["nmRankNo"],
      },
      cdOccup: {
        title: "직종",
        tableHeaders: [
          { field: "cdOccup", text: "직종코드" },
          { field: "nmCdOccup", text: "직종명" },
        ],
        tableData: [
          { cdOccup: "J001", nmCdOccup: "직종A" },
          { cdOccup: "J002", nmCdOccup: "직종B" },
          { cdOccup: "J003", nmCdOccup: "직종C" },
          { cdOccup: "J004", nmCdOccup: "직종D" },
          { cdOccup: "J005", nmCdOccup: "직종E" },
          { cdOccup: "J006", nmCdOccup: "직종F" },
        ],
      },
      cdField: {
        title: "현장",
        tableHeaders: [
          { field: "cdField", text: "현장코드" },
          { field: "nmCdField", text: "현장" },
        ],
        tableData: [
          { cdField: "F00A", nmCdField: "현장A" },
          { cdField: "F00B", nmCdField: "현장B" },
          { cdField: "F00C", nmCdField: "현장C" },
          { cdField: "F00D", nmCdField: "현장D" },
          { cdField: "F00E", nmCdField: "현장E" },
          { cdField: "F00F", nmCdField: "현장F" },
        ],
        searchField: ["nmCdField"],
      },
      cdProject: {
        title: "프로젝트",
        tableHeaders: [
          { field: "cdProject", text: "프로젝트코드" },
          { field: "nmCdProject", text: "프로젝트명" },
        ],
        tableData: [
          { cdProject: "P00A", nmCdProject: "프로젝트A" },
          { cdProject: "P00B", nmCdProject: "프로젝트B" },
          { cdProject: "P00C", nmCdProject: "프로젝트C" },
          { cdProject: "P00D", nmCdProject: "프로젝트D" },
          { cdProject: "P00E", nmCdProject: "프로젝트E" },
          { cdProject: "P00F", nmCdProject: "프로젝트F" },
        ],
        searchField: ["nmCdProject"],
      },
      abbNation: {
        title: "거주지국",
        tableHeaders: [
          { field: "abbNation", text: "거주지국코드" },
          { field: "nmAbbNation", text: "거주지국명" },
        ],
        tableData: [
          { abbNation: "KR", nmAbbNation: "대한민국" },
          { abbNation: "US", nmAbbNation: "미국" },
          { abbNation: "CN", nmAbbNation: "중국" },
          { abbNation: "JP", nmAbbNation: "일본" },
          { abbNation: "IN", nmAbbNation: "인도" },
          { abbNation: "PH", nmAbbNation: "필리핀" },
        ],
        searchField: ["nmAbbNation"],
      },
      cdNation: {
        title: "국적",
        tableHeaders: [
          { field: "cdNation", text: "국적코드" },
          { field: "nmCdNation", text: "국적명" },
        ],
        tableData: [
          { cdNation: "KR", nmCdNation: "대한민국" },
          { cdNation: "US", nmCdNation: "미국" },
          { cdNation: "CN", nmCdNation: "중국" },
          { cdNation: "JP", nmCdNation: "일본" },
          { cdNation: "IN", nmCdNation: "인도" },
          { cdNation: "PH", nmCdNation: "필리핀" },
        ],
        searchField: ["nmCdNation"],
      },
      cdSalcls: {
        title: "호봉",
        tableHeaders: [
          { field: "cdSalcls", text: "호봉코드" },
          { field: "nmCdSalcls", text: "호봉" },
        ],
        tableData: [
          { cdSalcls: "S00A", nmCdSalcls: "호봉A" },
          { cdSalcls: "S00B", nmCdSalcls: "호봉B" },
          { cdSalcls: "S00C", nmCdSalcls: "호봉C" },
        ],
        searchField: ["nmCdSalcls"],
      },
    },

    // 미삭제 사원 목록 테이블 헤더
    EmpRegisterUndeletedEmpHeaders: [
      {
        field: "cdEmp",
        text: "사원코드",
        isPk: true,
        readOnly: true,
        // width: "75px",
      },
      { field: "nmKrname", text: "성명" },
      { field: "useMenuList", text: "사용중인 메뉴" },
    ],
  };
};

export default EmpConstant;
