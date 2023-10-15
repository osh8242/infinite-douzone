const EmpFam = (empFamData) => {
  if (empFamData["cdFamrel"] === "CF0" && !empFamData["nmKrcom"]) {
    let userInfoObject;
    try {
      userInfoObject = JSON.parse(localStorage.getItem("userInfo")) || {};
    } catch (error) {
      console.error("Parsing error:", error);
      userInfoObject = {};
    }

    const companyName = userInfoObject?.companyName || "";
    empFamData["nmKrcom"] = companyName;
  }
  return {
    item: empFamData,
    checked: false,
    selected: false,
    isEditable: false,
    table: "empFam",
  };
};

export default EmpFam;
