import styles from "../styles/Register.module.css";
import { Navigate } from "react-router";
import loader from "../assets/loader.svg";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Register = (props) => {

    const initialForm = {
        status: false,
        response: {
            nombreCompleto: "",
            telefono: "",
            email: "",
            idHistorialCompras: null,
            userPass: "",
            userPassConfirm: "",
        }
    }

    const validationsForm = (form) => {
        let errors = {};
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
        //El metodo trim elimina los espacios en blanco al principio o al final de una cadena de texto

        if(!form.response.email.trim()) {
            errors.email = "El Campo 'Email' es Requerido";
        } else if(!regexEmail.test(form.response.email.trim())) {
            errors.email = "El Campo 'Email' Es Incorrecto";
        }

        if(form.response.userPass !== form.response.userPassConfirm) {
            errors.userPass = "Las Contraseñas No Coinciden";
        };
        return errors;
    }

    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    } = useRegister(initialForm, validationsForm);

    useEffect(() => {
        if(response.status) {
            props.setUserData(response);
        }
    }, [form.status, props, response])

    return(
        <div className={styles.formContainer}>
            {props.userData.status ? <Navigate replace to="/"/> : ""}
            <h1>Registarte</h1>
            <form className={styles.formStyles} onSubmit={handleSubmit}>
                <input
                type="text"
                name="nombreCompleto"
                onChange={handleChange}
                value={form.response.nombreCompleto}
                onBlur={handleBlur}
                placeholder="Nombre..."/>

                <input
                type="number"
                name="telefono"
                onChange={handleChange}
                value={form.response.telefono}
                onBlur={handleBlur}
                placeholder="Numero Celular..."/>

                <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.response.email}
                onBlur={handleBlur}
                placeholder="Correo Electronico..."/>

                {errors.email ? <p className={styles.errorTexts}>{errors.email}</p> : ""}

                <input
                type="password"
                name="userPass"
                onChange={handleChange}
                value={form.response.userPass}
                onBlur={handleBlur}
                placeholder="Contraseña..."/>

                {errors.userPass ? <p className={styles.errorTexts}>{errors.userPass}</p> : ""}

                <input
                type="password"
                name="userPassConfirm"
                onChange={handleChange}
                value={form.response.userPassConfirm}
                onBlur={handleBlur}
                placeholder="Repite Tu Contraseña..."/>
                
                <input type="submit" value="Registrarse"/>
            </form>

            {!response.status ? <h2>{response.text}</h2> : ""}

            <hr/>

            {loading && <div className={styles.loaderContainer}><img className={styles.loader} src={loader} alt="loader"/></div>}

            <h3>Ya tienes cuenta ?, <Link to="/login">Inicia Sesión!</Link></h3>

            <hr/>

            <p className={styles.formFooterText}>Al Registrarte aceptas nuestra <b>Politíca De Privacidad</b> y <b>Derechos De Autor</b> Es posible que te enviemos correos electronicos con ofertas en nuestros productos.</p>
        </div>
    )
}

export default Register;