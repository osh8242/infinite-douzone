const SwsmConstant = () => {
  return {
    // 전체 구분 목록
    mainTabMenuList: ["계약서 작성", "계약서 조회"],

    // 상단 조회 - 소득구분 목록
    incomeClassficationList: [
      { key: "empRegistration", value: "1. 사원등록" },
      { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
    ],

    // 좌측테이블 - 사원 목록
    SwsmLeftTableHeaders: [
      { field: "empCode", text: "사원코드", orderBy: "asc" },
      { field: "name", text: "성명", orderBy: "asc" },
    ],

    // 우측하단테이블 - 기타급여 목록
    SwsmSubTabHeaders: [
      { field: "otherBenefitsItem", text: "항목" },
      { field: "otherBenefitsAmount", text: "금액" },
    ],

    // 거주구분 목록
    ynForList: [
      { key: "0", value: "내국인" },
      { key: "1", value: "외국인" },
    ],

    // Main Grid List
    // 주휴일 목록
    dayOffList: [
      { key: "mon", value: "1. 월" },
      { key: "tue", value: "2. 화" },
      { key: "wed", value: "3. 수" },
      { key: "thu", value: "4. 목" },
      { key: "fri", value: "5. 금" },
      { key: "sat", value: "6. 토" },
      { key: "sun", value: "7. 일" },
    ],
    // 임금유형 목록
    salaryTypeList: [
      { key: "monthlySal", value: "1. 월급" },
      { key: "dailySal", value: "2. 일급" },
      { key: "hourlySal", value: "3. 시급" },
    ],
    // 기타급여 목록
    otherBenefitStatusList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
    // 상여금 목록
    bonusPaymentStatusList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
    // 임금지급일 목록
    salaryPaymentDateTypeList: [
      { key: "month", value: "1. 매월" },
      { key: "week", value: "2. 매주" },
      { key: "day", value: "3. 매일" },
    ],
    // 지급방법 목록
    paymentMethodList: [
      { key: "account", value: "1. 예금통장에 입금" },
      { key: "direct", value: "2. 직접지급" },
    ],
    // 고용보험 목록
    empInsuranceList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
    // 산재보험 목록
    compensationInsuranceList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
    // 국민연금 목록
    nationalPensionList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],
    // 건강보험 목록
    healthInsuranceList: [
      { key: "T", value: "1. 여" },
      { key: "F", value: "2. 부" },
    ],

    label: {
      withholdingYear: "원천년도",
      dateOfCreation: "작성년월", // 또는 작성일자
      incomeClassfication: "소득구분",
      empCode: "사원코드",
      name: "성명",
      residentState: "거주구분",
      rrn: "주민번호",
      startEmpContractPeriod: "시작근로계약기간",
      endEmpContractPeriod: "종료근로계약기간",
      postCode: "우편번호",
      address: "주소",
      addDetail: "상세주소",
      jobDescription: "업무의 내용",
      startBreakTime: "시작휴게시간",
      endBreakTime: "종료휴게시간",
      workingDay: "근무일",
      dayOff: "주휴일",
      salaryType: "임금유형",
      salaryAmount: "임금액",
      otherBenefits: "기타급여", // state목록임
      otherBenefitsItem: "기타급여항목",
      otherBenefitsAmount: "기타급여금액",
      bonusPaymentStatus: "상여금",
      bonusAmount: "상여금액",
      salaryPaymentDateType: "임금지급일",
      paymentDate: "임금지급날짜",
      paymentMethod: "지급방법",
      empInsurance: "고용보험",
      compensationInsurance: "산재보험",
      nationalPension: "국민연금",
      healthInsurance: "건강보험",
    },
  };
};
