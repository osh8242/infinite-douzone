const EmpAdd = (empAddData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  // }
  return { item: empAddData, selected: false, table: "empAdd" };
};

export default EmpAdd;
