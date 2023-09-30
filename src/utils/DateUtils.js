//현재날짜
const nowDate = () =>  new Date();

//작년 12월('YYYY-MM')
export function lastMonthOfLastYearStr(date = nowDate()) {
  const lastYear = date.getFullYear() - 1;
  const lastMonth = 11; //12월
  const lastMonthDate = new Date(lastYear, lastMonth);
  return currentMonthStr(lastMonthDate);
}

//현재 년도('YYYY')
export function currentYearStr(date = nowDate()) {
  const year = date.getFullYear();
  return `${year}`;
}

//현재달('YYYY-MM')
export function currentMonthStr(date = nowDate()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}

//현재날짜('YYYY-MM-DD')
export function currentDateStr(date = nowDate()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}