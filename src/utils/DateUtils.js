//현재날짜
function getCurrentDate() {
  return new Date();
}

//n달전 날짜 구하기
/* 구현중 */


//현재달('YYYY-MM')
export function currentMonthStr(date = getCurrentDate()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}

//현재날짜('YYYY-MM-DD')
export function currentDateStr(date = getCurrentDate()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}