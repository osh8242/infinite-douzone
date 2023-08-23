const CommonConstant = () => {
  return {
    searchOption: [
      {
        key: 'employedAndRetiredOnThisYear',
        value: '재직자 + 당해년도 퇴사자',
      },
      { key: 'employed', value: '재직자' },
      { key: 'retired', value: '퇴직자' },
    ],
    orderList: [
      { key: 'cdEmp', value: '코드순' },
      { key: 'nM', value: '이름순' },
    ],
    mainTabMenuList: ['기초정보', '인적정보'],
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
    },
  };
};

export default CommonConstant;
