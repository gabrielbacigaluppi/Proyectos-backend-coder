export default class CustomeError {
	static createError(message) {
		const error = new Error(message);
		return error;
	}
}
