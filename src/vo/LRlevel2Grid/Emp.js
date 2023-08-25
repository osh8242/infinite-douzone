const Emp = (empData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  // }
  console.log("Emp생성됨");
  return { item: empData, checked: false, selected: false, isEditable: false };
};

export default Emp;
