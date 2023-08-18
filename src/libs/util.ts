
export const addNumberSuffix = (number: number): string => {
    if (typeof number !== 'number') {
        return 'Invalid input';
    }

    const suffixes = {
        1: 'st',
        2: 'nd',
        3: 'rd'
    };

    const lastDigit = Math.abs(number) % 10;
    const lastTwoDigits = Math.abs(number) % 100;

    let suffix = 'th';
    if (lastDigit in suffixes && !(lastTwoDigits >= 11 && lastTwoDigits <= 13)) {
        suffix = suffixes[lastDigit as keyof typeof suffixes];
    }

    return number + suffix;
}
