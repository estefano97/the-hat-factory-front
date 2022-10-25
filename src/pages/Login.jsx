import { useForm } from '../hooks/useForm';
import loader from "../assets/loader.svg";
import styles from "../styles/Login.module.css";
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = ({userData, setUserData}) => {

    const initialForm = {
        email: "",
        userPass: ""
    }

    const validationsForm = (form) => {
        let errors = {};
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
        //El metodo trim elimina los espacios en blanco al principio o al final de una cadena de texto
        if(!form.email.trim()) {
            errors.email = "El Campo 'Email' es Requerido";
        } else if(!regexEmail.test(form.email.trim())) {
            errors.email = "El Campo 'Email' Es Incorrecto";
        }
    
        return errors;
    }

    const {
        form,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);

    useEffect(() => {
        if(response.status) setUserData(response);
    }, [response, setUserData])

    return(
        <div className={styles.containerLogin}>
            {userData.status ? <Navigate replace to="/"/> : ""}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                onBlur={handleBlur}
                placeholder="Coloca Tu Email..."/>

                <input
                type="password"
                name="userPass"
                onChange={handleChange}
                value={form.userPass}
                placeholder="Coloca Tu Contraseña..."/>

                <input
                className={styles.submit}
                type="submit"
                value="Iniciar Sesión"/>
            </form>
            
            {loading && <div className={styles.loaderContainer}><img className={styles.loader} src={loader} alt="loader" /></div>}
            <hr />

            <h3>No Tienes Cuenta ?, <Link to="/register">Registrate!</Link></h3>
            
            {response.text !== "Usuario Logeado Con Exito!"
            ? <p className={styles.errorStyles}>{response.text}</p>
            : ""}
        </div>
    )

}

export default Login;