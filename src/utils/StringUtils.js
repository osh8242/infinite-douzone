// 마스킹 String 만들기 함수 
export const maskString = (length, input, maskingStr, startIndex = 0) => {
    const endIndex = startIndex + length;
    const maskedPortion = input.slice(startIndex, endIndex).replace(/\S/g, maskingStr);
    return input.slice(0, startIndex) + maskedPortion + input.slice(endIndex);
};

export const isEmpty = (value) => {
    return value === undefined || value === null || value === '';
}

// 객체 쿼리스트링 만들기
export const objectToQueryString = (obj) => {
    const queryString = obj && Object.keys(obj)
    .filter(key => obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

    return queryString ? `?${queryString}` : '';
}