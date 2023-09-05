const EmpConstant = () => {
  return {
    codeHelperparams: {
      cdDept: {
        title: "부서코드 조회",
        tableHeaders: [
          { field: "pk", text: "부서코드" },
          { field: "nmDept", text: "부서이름" },
        ],
        tableData: [
          { pk: "D001", nmDept: "인사팀" },
          { pk: "D002", nmDept: "경영지원팀" },
          { pk: "D003", nmDept: "개발팀" },
        ],
        searchField: ["nmDept"],
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
      cdOccup: {},
      cdField: {},
      cdProject: {},
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
      },
      cdSalsls: {},
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
