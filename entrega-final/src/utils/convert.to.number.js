export default function convertToNumber(value) {
    const numericValue = Number(value);
    return isNaN(numericValue) ? undefined : numericValue;
};
