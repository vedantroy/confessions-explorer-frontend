//checks if 2 arrays are different, disregards order
export const arraysDifferent = function (array1, array2) {
    if (array1.length !== array2.length) {
        return true
    }
    const difference = array1.filter(element => !array2.includes(element))
    return difference.length !== 0
}