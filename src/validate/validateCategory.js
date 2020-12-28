export default function validateCategory(values) {
	let errors = {};
	if (!values.name) {
		errors.name = "category name is required";
	}
    return errors;
}