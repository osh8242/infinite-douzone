const HrManagementConstant = () => {
  return {
    leftTableConstant: {
      headers: [
        {
          field: "cdEmp",
          text: "사원코드",
          isPk: true,
          width: "120px",
        },
        { field: "nmKrname", text: "성명" },
      ],
    },
    leftStaticsTableConstant: {
      headers: [
        {
          field: "jobOkY",
          text: "재직",
        },
        {
          field: "jobOkN",
          text: "퇴직",
        },
        {
          field: "jobOkSum",
          text: "총합",
        },
      ],
    },

    tabConstant: {
      mainTabMenuList: ["기초정보", "인적정보"],
      subTabMenuList: ["가족", "학력", "경력", "신체", "병역"],
    },

    subTableConstant: {
      headers: [
        { field: "cdFamrel", text: "관계" },
        { field: "nmKrname", text: "성명" },
        { field: "ynFor", text: "외국인" },
        { field: "noSocial", text: "주민등록번호" },
        { field: "fgSchool", text: "학력" },
        { field: "fgGraduation", text: "졸업구분" },
        { field: "ynTogether", text: "동거" },
        { field: "ynLunarbir", text: "양음" },
        { field: "daBirth", text: "생년월일" },
        { field: "cdJob", text: "직업" },
        { field: "nmKrcom", text: "직장명" },
        { field: "cdOffpos", text: "직급" },
      ],
    },
  };
};

export default HrManagementConstant;
