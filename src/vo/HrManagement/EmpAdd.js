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
  console.log("텔홈", empAddData["telHome"]);
  empAddData["celEmp"] =
    empAddData.celEmp1 + "-" + empAddData.celEmp2 + "-" + empAddData.celEmp3;
  return empAddData;
};

export default EmpAdd;
