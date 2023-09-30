const Emp = (empData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  //   [labels.ynFor]: item.ynFor,
  //   [labels.noSocial]: item.noSocial,
  //   [labels.jobOk]: item.jobOk,
  // }
  console.log("사원등록 Emp 생성");
  empData["telHome"] =
    (empData.telHome1 || "") +
    "-" +
    (empData.telHome2 || "") +
    "-" +
    (empData.telHome3 || "");
  empData["celEmp"] =
    (empData.celEmp1 || "") +
    "-" +
    (empData.celEmp2 || "") +
    "-" +
    (empData.celEmp3 || "");
  empData["zipHome-addHome1"] =
    (empData.zipHome || "") + "-" + (empData.addHome1 || "");
  return {
    item: empData,
    checked: false,
    selected: false,
    isEditable: false,
    table: "emp",
  };
};

export default Emp;
