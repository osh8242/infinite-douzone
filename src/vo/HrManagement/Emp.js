const Emp = (empData) => {
  // item: {
  //   [labels.cdEmp]: item.cdEmp,
  //   [labels.nmKrname]: item.nmKrname,
  // }
  return {
    item: empData,
    checked: false,
    selected: false,
    isEditable: false,
    table: "emp",
  };
};

export default Emp;
