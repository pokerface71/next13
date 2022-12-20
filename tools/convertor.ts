/**
 * Convert a number of seconds into a string of the format 'HH:MM:SS' where HH is the number of hours,
 * MM is the number of minutes, and SS is the number of seconds.
 * @param {number} time - number - The time in seconds
 * @returns A string
 */
export const ConvertorSecondToMinuteAndSecond = (time: number) => {
	// Hours, minutes and seconds
	var hrs = ~~(time / 3600)
	var mins = ~~((time % 3600) / 60)
	var secs = ~~time % 60

	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = ''
	if (hrs > 0) {
		ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
	}
	ret += '' + String(mins).padStart(2, '0') + ':' + (secs < 10 ? '0' : '')
	ret += '' + secs
	return ret
}
