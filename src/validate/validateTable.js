export default function validateTable(values) {
	let errors = {};
	if (!values.name) {
		errors.name = "table name is required";
    }
    if (!values.capacity) {
		errors.capacity = "capacity is required";
	}
    return errors;
}