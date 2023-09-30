const Emp = (empData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  //   [labels.ynFor]: item.ynFor,
  //   [labels.noSocial]: item.noSocial,
  //   [labels.jobOk]: item.jobOk,
  // }
  console.log("사원등록 Emp 생성");
  return {
    item: empData,
    checked: false,
    selected: false,
    isEditable: false,
    table: "emp",
  };
};

export default Emp;
