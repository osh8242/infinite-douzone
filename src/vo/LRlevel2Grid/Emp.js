const Emp = (empData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  // }
  return { item: empData, checked: false, selected: false, isEditable: false };
};

export default Emp;
