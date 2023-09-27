// 숫자인지 체크
export const isNumber = (value) => /^\d+$/.test(value);

// 숫자만 남기기 함수
export const makePureNumber = (numValue) => numValue.replace(/[^0-9]/g, '');

// 3자리 콤마 만들기 함수 
export const makeCommaNumber = (numValue) => {
   if (numValue) {
     if (typeof numValue === 'number') {
       return numValue.toLocaleString('en-US');
     } else if (typeof numValue === 'string') {
       return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     }
   }
   return numValue;
 };

// nvl함수 
export const nvl = (value, defaultValue) => {
   return value !== null && value !== undefined ? value : defaultValue;
}
  