import { useState } from 'react';
import helpHttp from '../helpers/helpHttp.js';

export const useForm = (initialForm, validateForm) => {

    const initialUserData = {status: false, text: ""};
    
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(JSON.parse(window.localStorage.getItem("loggedTHF")) || initialUserData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
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

            helpHttp().post("https://kaal1.000webhostapp.com/API/loginUser", {
                body: form,
                Headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                }
            })
            .then(res => {
                setForm(initialForm);
                setLoading(false);
                setResponse(res);
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