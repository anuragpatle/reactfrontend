export default function validateLogin(values) {
    let errors = {};
    if (!values.email_id) {
        errors.email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email_id)) {
    	errors.email_id = "Email address is invalid";
    }
    if (!values.password) {
    	errors.password = "Password is required";
    } else if (values.password.length < 6) {
    	errors.password = "Password needs to be more than 5 characters";
    }
    return errors;
}