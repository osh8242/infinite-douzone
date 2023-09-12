const EmpConstant = () => {
  return {
    //메뉴 탭 리스트
    mainTabMenuListForEmpRegister: ["기초정보", "가족사항"],
    //왼쪽 테이블 헤더
    EmpRegisterLeftHeaders: [
      { field: "cdEmp", text: "사원코드", isPk: true, readOnly: true },
      { field: "nmKrname", text: "성명" },
      { field: "ynFor", text: "내외국인" },
      { field: "noSocial", text: "주민번호" },
      { field: "jobOk", text: "구분" },
    ],
    //메인 탭 사용 필드
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
    //코드도움
    codeHelperparams: {
      cdDept: {
        title: "부서코드 조회",
        tableHeaders: [
          { field: "cdDept", text: "부서코드" },
          { field: "description", text: "부서이름" },
        ],
        tableData: [
          { cdDept: "D001", description: "인사팀" },
          { cdDept: "D002", description: "경영지원팀" },
          { cdDept: "D003", description: "개발팀" },
        ],
        searchField: ["description"],
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
          { field: "description", text: "직급명" },
        ],
        tableData: [
          { rankNo: "RK01", description: "사원" },
          { rankNo: "RK02", description: "주임" },
          { rankNo: "RK03", description: "대리" },
          { rankNo: "RK04", description: "과장" },
          { rankNo: "RK05", description: "차장" },
          { rankNo: "RK06", description: "부장" },
          { rankNo: "RK11", description: "연구원" },
          { rankNo: "RK12", description: "주임연구원" },
          { rankNo: "RK13", description: "선임연구원" },
          { rankNo: "RK14", description: "책임연구원" },
        ],
        searchField: ["description"],
      },
      cdOccup: {
        title: "직종",
        tableHeaders: [
          { field: "cdOccup", text: "직종코드" },
          { field: "description", text: "직종명" },
        ],
        tableData: [
          { cdOccup: "J001", description: "직종A" },
          { cdOccup: "J002", description: "직종B" },
          { cdOccup: "J003", description: "직종C" },
          { cdOccup: "J004", description: "직종D" },
          { cdOccup: "J005", description: "직종E" },
          { cdOccup: "J006", description: "직종F" },
        ],
      },
      cdField: {
        title: "현장",
        tableHeaders: [
          { field: "cdField", text: "현장코드" },
          { field: "description", text: "현장" },
        ],
        tableData: [
          { cdField: "F00A", description: "현장A" },
          { cdField: "F00B", description: "현장B" },
          { cdField: "F00C", description: "현장C" },
          { cdField: "F00D", description: "현장D" },
          { cdField: "F00E", description: "현장E" },
          { cdField: "F00F", description: "현장F" },
        ],
        searchField: ["description"],
      },
      cdProject: {
        title: "프로젝트",
        tableHeaders: [
          { field: "cdProject", text: "프로젝트코드" },
          { field: "description", text: "프로젝트명" },
        ],
        tableData: [
          { cdProject: "P00A", description: "프로젝트A" },
          { cdProject: "P00B", description: "프로젝트B" },
          { cdProject: "P00C", description: "프로젝트C" },
          { cdProject: "P00D", description: "프로젝트D" },
          { cdProject: "P00E", description: "프로젝트E" },
          { cdProject: "P00F", description: "프로젝트F" },
        ],
        searchField: ["description"],
      },
      abbNation: {
        title: "거주지국",
        tableHeaders: [
          { field: "abbNation", text: "거주지국코드" },
          { field: "description", text: "거주지국명" },
        ],
        tableData: [
          { abbNation: "KR", description: "대한민국" },
          { abbNation: "US", description: "미국" },
          { abbNation: "CN", description: "중국" },
          { abbNation: "JP", description: "일본" },
          { abbNation: "IN", description: "인도" },
          { abbNation: "PH", description: "필리핀" },
        ],
        searchField: ["description"],
      },
      cdNation: {
        title: "국적",
        tableHeaders: [
          { field: "cdNation", text: "국적코드" },
          { field: "description", text: "국적명" },
        ],
        tableData: [
          { cdNation: "KR", description: "대한민국" },
          { cdNation: "US", description: "미국" },
          { cdNation: "CN", description: "중국" },
          { cdNation: "JP", description: "일본" },
          { cdNation: "IN", description: "인도" },
          { cdNation: "PH", description: "필리핀" },
        ],
        searchField: ["description"],
      },
      cdSalcls: {
        title: "호봉",
        tableHeaders: [
          { field: "cdSalcls", text: "호봉코드" },
          { field: "description", text: "호봉" },
        ],
        tableData: [
          { cdSalcls: "S00A", description: "호봉A" },
          { cdSalcls: "S00B", description: "호봉B" },
          { cdSalcls: "S00C", description: "호봉C" },
        ],
        searchField: ["description"],
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
