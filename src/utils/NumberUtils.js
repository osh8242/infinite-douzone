// 숫자인지 체크
export const isNumber = (value) => /^\d+$/.test(value);

// 숫자만 남기기 함수
export const makePureNumber = (numValue) => numValue.replace(/[^0-9]/g, "");

// 3자리 콤마 만들기 함수
export const makeCommaNumber = (numValue) =>
  numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// nvl함수
export const nvl = (value, defaultValue) => {
  return value !== null && value !== undefined ? value : defaultValue;
};

// 주민번호 유효성 검사
export const isValidNoSocial = (input) => {
  const beforeHyphen = input.split("-")[0];
  if (beforeHyphen.length > 6 || isNaN(beforeHyphen)) {
    return false;
  }

  const juminPattern = /^\d{1,6}-?\d{0,7}$/;
  return juminPattern.test(input);
};
