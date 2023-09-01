// 마스킹 String 만들기 함수 
export const maskString = (length, input, maskingStr, startIndex = 0) => {
    const endIndex = startIndex + length;
    const maskedPortion = input.slice(startIndex, endIndex).replace(/\S/g, maskingStr);
    return input.slice(0, startIndex) + maskedPortion + input.slice(endIndex);
};

export const isEmpty = (value) => {
    return value === undefined || value === null || value === '';
}