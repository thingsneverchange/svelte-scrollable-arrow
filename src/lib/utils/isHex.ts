const isHex = (str: string): boolean => {
    // Regular expression to match the pattern of a hexadecimal color code
    const hexColorPattern : RegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

    // Check if the string matches the pattern
    return hexColorPattern.test(str);
}

export default isHex
