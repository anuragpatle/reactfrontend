export default function validateItem(values) {
	let errors = {};
	if (!values.category_id) {
		errors.category_id = "category is required";
    }
    if (!values.name) {
		errors.name = "item name is required";
    }
    if (!values.price) {
		errors.price = "item price is required";
	}
    return errors;
}