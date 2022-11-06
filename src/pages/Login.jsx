import styles from "../styles/Login.module.css";
import { Navigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { LoginAuth } from "../apis/AuthService";
import { MailsRegExp } from "../Utilities";

const Login = ({userData, setUserData}) => {

    const [IsSuccess, setIsSuccess] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues
    } = useForm("onSubmit");

    const handleSubmitLogin = async () => {
        try{
            setIsLoading(true);
            let data = {
                email: getValues().email,
                Password: getValues().password
            }
    
            let res =  await LoginAuth(data);
            
            setUserData(res);
            setIsSuccess(true);
            console.log(res);
        }
        catch(ex) {
            console.error(ex);
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <div className={styles.containerLogin}>
            <div className={styles.loginTitle}>
                <h1>Inicia Sesión</h1>
                <p>Por favor, inicie sesión con su cuenta</p>
                {IsSuccess
                ? <h3 className={styles.errorStyles}>Usuario Logeado Con Exito!</h3>
                : ""}
            </div>

            {IsSuccess ? <Navigate replace to="/"/> : ""}
            <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <p>Email</p>
                <input
                type="email"
                name="email"
                {...register("email",  { 
                    required: true, 
                    maxLength: 300, 
                    pattern:  MailsRegExp })}
                />

                <p>Contraseña</p>
                <input
                type="password"
                name="password"
                {...register("password",  { required: true, maxLength: 200 })} />
                
                <input
                className={styles.submit}
                type="submit"
                value="Iniciar Sesión"/>
            </form>
            
            {IsLoading && <div className={styles.loaderContainer}><img className={styles.loader} src="/ProductsIMGs/assets/oval.svg" alt="loader" /></div>}
            <hr />

            <h3>No Tienes Cuenta ?, <Link to="/register">Registrate!</Link></h3>
        </div>
    )

}

export default Login;