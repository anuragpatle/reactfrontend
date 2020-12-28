import { useState, useEffect } from "react";

const useForm = (callback, validate, formObj) => {
    const [values, setValues] = useState(formObj);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value // (!value.trim().length) ? value.trim() :
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        setErrors,
        setValues
    };
};

export default useForm;