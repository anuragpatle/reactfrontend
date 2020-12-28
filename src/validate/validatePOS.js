export default function validatePOS(values) {
	let errors = {};
	if (!values.category_id) {
		errors.category_id = "category is required";
    }
    if (!values.item_id) {
		errors.item_id = "item is required";
    }
    if (!values.quantity) {
		errors.quantity = "quantity is required";
    }
    if (!values.unit_price) {
		errors.unit_price = "price is required";
    }
    if (!values.amount) {
		errors.amount = "amount is required";
	}
    return errors;
}