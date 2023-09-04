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
      rankNo: {},
      cdOccup: {},
      cdField: {},
      cdProject: {},
    },
  };
};

export default EmpConstant;
