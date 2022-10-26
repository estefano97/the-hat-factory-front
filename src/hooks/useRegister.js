import { useState } from 'react';
import helpHttp from '../helpers/helpHttp.js';

export const useRegister = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({response: false, text: ""});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            response:{
                ...form.response,
                [name]: value
            }
        })
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if(Object.keys(errors).length === 0) {
            setLoading(true);
            helpHttp().post("https://kaal1.000webhostapp.com/API/registerUser", {
                body: form.response,
                Headers: {
                    "Content-Type":"application/json",
                    Accept: "application/json",
                }
            })
            .then(res => {
                setResponse(res);
                setForm(initialForm);
                window.scrollTo(0, 0);
                setLoading(false);
            })

        } else {
            return;
        }
    };

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    }
}