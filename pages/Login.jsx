import { useForm } from '../hooks/useForm';
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
            <div className={styles.loginTitle}>
                <h1>Inicia Sesión</h1>
                <p>Por favor, inicie sesión con su cuenta</p>
                {response.text !== "Usuario Logeado Con Exito!"
                ? <h3 className={styles.errorStyles}>{response.text}</h3>
                : ""}
            </div>

            {userData.status ? <Navigate replace to="/"/> : ""}
            <form onSubmit={(e) => handleSubmit(e)}>
                <p>Email</p>
                <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                onBlur={handleBlur}/>

                <p>Contraseña</p>
                <input
                type="password"
                name="userPass"
                onChange={handleChange}
                value={form.userPass}/>

                <input
                className={styles.submit}
                type="submit"
                value="Iniciar Sesión"/>
            </form>
            
            {loading && <div className={styles.loaderContainer}><img className={styles.loader} src="/ProductsIMGs/assets/oval.svg" alt="loader" /></div>}
            <hr />

            <h3>No Tienes Cuenta ?, <Link to="/register">Registrate!</Link></h3>
        </div>
    )

}

export default Login;