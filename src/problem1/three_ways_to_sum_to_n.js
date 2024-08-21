/* 
 * Provide 3 unique implementations of the following function in JavaScript.

 * Input**: n - any integer

 * Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER.

 * Output: `return` - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.
 * */

// I am thinking not just for the easy thinking functions but also for those who give the best performance
const sum_to_n_a = (n) => {
	// Probably the easiest way to execute this function 
	let sum = 0
	while (n !== 0) {
		sum += n
		n--
	}
	return sum
}

const sum_to_n_b = (n) => {
	// A more challenging and fun approch would be recursive 
	if (n <= 1) {
		return n
	}
	return n + sum_to_n_b(n - 1)
}

const sum_to_n_c = (n) => {
	// For this one I used an arithmetic formula
	return n * (n + 1) / 2
}

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))
