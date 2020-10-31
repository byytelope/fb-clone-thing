import { useState } from "react";

export const useForm = (callback, initState = {}) => {
    const [formValues, setFormValues] = useState(initState);

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        formValues,
    };
};
