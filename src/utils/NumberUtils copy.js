//const makePlainNumber = (numValue) => numValue.replace(/[^0-9]/g, '');
// 숫자만 남기기 함수
export function makePlainNumber(numValue) {
  return numValue.replace(/[^0-9]/g, '');
}

//const makeCommaNumber = (numValue) => numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// 3자리 콤마 만들기 함수 
export function makeCommaNumber(numValue) {
  return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
  
  