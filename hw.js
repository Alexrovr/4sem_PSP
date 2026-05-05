function longestSequence(s) {
    let longest = 0;
    let current = 0;
    for (let char of s) {
        if (char === '1') {
            current++;
        } else {
            if (current !== 0) {
                if (current > longest) longest = current;
                current = 0;
            }
        }
    }
    return (current > longest) ? current : longest;
}

function inverse(arr, arg=0) {
    if (arg > arr.length) arg = arr.length;
    if (arg < -arr.length) arg = -arr.length;
    let result = [];
    let start = 0;
    let end = arr.length;
    if (arg !== 0) {
        if (arg > 0) {
            start += arg;
            for (let i = 0; i < arg; i++) {
                result.push(arr[i]);
            }
        } else {
            end += arg;
        }
    }
    for (let i = end - 1; i > start - 1; i--) {
        result.push(arr[i]);
    }
    if (end !== arr.length) {
        for (let i = end; i < arr.length; i++) {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(longestSequence('1000000111100011111010111101111111'));
let arr = [1, 2, 3, 4, 5];
console.log(inverse(arr));
console.log(inverse(arr, 2));
console.log(inverse(arr, -2));
