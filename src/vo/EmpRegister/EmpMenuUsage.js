const EmpMenuUsage = (undeletedEmpData) => {
  console.log("사원등록 EmpMenuUsage 생성");

  return {
    item: undeletedEmpData,
    checked: false,
    selected: false,
    isEditable: false,
    table: "empMenuUsage",
  };
};

export default EmpMenuUsage;
