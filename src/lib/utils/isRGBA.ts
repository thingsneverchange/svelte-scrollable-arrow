const isRGBAColor = (str: string): boolean => {
	// Regular expression to match the pattern of an RGBA color code
	const rgbaColorPattern: RegExp = /^rgba?\(\s*(\d{1,3}\s*,\s*){3}(0(\.\d+)?|1(\.0+)?)\s*\)$/;

	// Check if the string matches the pattern
	return rgbaColorPattern.test(str);
};

export default isRGBAColor;
