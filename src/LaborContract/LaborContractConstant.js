const LaborContractConstant = () => {
  return {
    incomeClassficationList: [
      { key: "empAll", value: "0. 전체" },
      { key: "empRegistration", value: "1. 사원등록" },
      { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
    ],

    labels: {
      empContractPeriod: "근로계약기간",
      workAddress: "근무장소",
      jobDescription: "업무의 내용",
      workTime: "소정근로시간",
      breakTime: "휴게시간",
      workingDay: "근무일",
      dayOff: "주휴일",
      salaryType: "임금유형",
      otherBenefits: "기타급여",
      bonusPaymentStatus: "상여금",
      salaryPaymentDateType: "임금지급일",
      paymentMethod: "지급방법",
      empInsurance: "고용보험",
      compensationInsurance: "산재보험",
      nationalPension: "국민연금", //
      healthInsurance: "건강보험",
      dateOfCreation: " 작성일자",
      incomeClassfication: "소득구분", ///
    },
  };
};
export default LaborContractConstant;
