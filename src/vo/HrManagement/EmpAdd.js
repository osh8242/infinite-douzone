const EmpAdd = (empAddData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  // }
  empAddData["telHome"] =
    (empAddData.telHome1 || "") +
    "-" +
    (empAddData.telHome2 || "") +
    "-" +
    (empAddData.telHome3 || "");

  empAddData["celEmp"] =
    (empAddData.celEmp1 || "") +
    "-" +
    (empAddData.celEmp2 || "") +
    "-" +
    (empAddData.celEmp3 || "");

  empAddData["telOffice"] =
    (empAddData.telOffice1 || "") +
    "-" +
    (empAddData.telOffice2 || "") +
    "-" +
    (empAddData.telOffice3 || "");

  empAddData["zipHome-addHome1"] =
    (empAddData.zipHome || "") + "-" + (empAddData.addHome1 || "");

  empAddData["zipOrgin-addOrgin1"] =
    (empAddData.zipOrgin || "") + "-" + (empAddData.addOrgin1 || "");
  return empAddData;
};

export default EmpAdd;
