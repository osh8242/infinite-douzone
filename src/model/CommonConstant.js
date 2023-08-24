const CommonConstant = () => {
  return {
    searchOption: [
      {
        key: 'yAndOnThisYear',
        value: '재직자 + 당해년도 퇴사자',
      },
      { key: 'Y', value: '재직자' },
      { key: 'N', value: '퇴직자' },
    ],
    orderList: [
      { key: 'cdEmp', value: '코드순' },
      { key: 'nmKrname', value: '이름순' },
    ],
    mainTabMenuList: ['기초정보', '인적정보'],
    mainTabMenuListForEmpRegister: ['기초정보', '가족사항'],
    subTabMenuList: ['가족', '학력', '경력', '신체', '병역'],
    genderRadioList: [
      { key: 'M', value: '남자' },
      { key: 'F', value: '여자' },
    ],
    marryRadioList: [
      { key: 'Y', value: '기혼' },
      { key: 'N', value: '미혼' },
    ],
    contractRadioList: [
      { key: 'Y', value: '작성' },
      { key: 'N', value: '미작성' },
    ],
    emailList: [
      { key: 'daum.net', value: '@daum.net' },
      { key: 'gmail.com', value: '@gmail.com' },
      { key: 'hanmail.net', value: '@hanmail.net' },
      { key: 'kakao.com', value: '@kakao.com' },
      { key: 'msn.com', value: '@msn.com' },
      { key: 'mail.com', value: '@mail.com' },
      { key: 'nate.com', value: '@nate.com' },
      { key: 'naver.com', value: '@naver.com' },
      { key: 'tistory.com', value: '@tistory.com' },
    ],
    ynForList: [
      { key: '0', value: '내국인' },
      { key: '1', value: '외국인' },
    ],

    labels: {
      cdEmp: '사원코드',
      nmEnName: '영문성명',
      nmChName: '한자성명',
      noSocial: '주민등록번호',
      fgSex: '성별',
      daBirth: '생년월일',
      fgWedding: '결혼여부',
      cdDept: '부서',
      rankNo: '직급',
      cdOffduty: '직무',
      ynDrawContracts: '근로계약서',
      daEnter: '입사년월일',
      daRetire: '퇴사년월일',
      cdFamrel: '관계',
      nmKrname: '성명',
      ynFor: '외국인',
      fgSchool: '학력',
      fgGraduation: '졸업구분',
      ynTogether: '동거',
      ynLunarbir: '양음',
      cdJob: '직업',
      nmKrcom: '직장명',
      cdOffpos: '직급',
      daEnterForEmpRegister: '입사일자',
      addNation: '거주지국',
      cdNation: '국적',
      telHome: '전화번호',
      calEmp: '모바일번호',
      emEmp: '이메일',
      idMsn: '메신저ID',
      cdOccup: '직종',
      cdSalcls: '호봉',
      cdField: '현장',
      cdProject: '프로젝트',
      cdBank: '급여이체은행',
    },
  };
};

export default CommonConstant;
