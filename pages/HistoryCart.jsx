import { Navigate } from "react-router";
import styles from '../styles/HistoryCart.module.css';
import helpHttp from '../helpers/helpHttp.js';
import { useState } from "react";
import CompraTemplate from "../components/CompraTemplate";

const HistoryCart = (props) => {

    const datosUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";

    const [errorMessage, setErrorMessage] = useState(false);
    const [successHistory, setSuccessHistory] = useState(false);

    const handleGetHistory = (e) => {
        e.preventDefault();

        helpHttp().post("https://kaal1.000webhostapp.com/API/getCart", {
                body: {
                    email: datosUser.response.email,
                    userPass: e.target.userPass.value
                },
                Headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                }
        })
        .then(res => {
            if(!res.status) {
                setErrorMessage(res.text);
            } else {
                setErrorMessage(false);
                setSuccessHistory(res.text);
            }    
        })
        e.target.userPass.value = "";
    }
    
    return(
        <div>
            {props.userData.status ? "" : <Navigate replace to="/"/>}
            {!successHistory
            ? <div className={styles.HistoryContainer}>
                {!errorMessage ? "" 
                : <div className={styles.errorStyles}>
                    <p>{errorMessage}</p>
                    </div>}
                <p>Para Poder Ver Tus Compras Necesitas Colocar Tu Contraseña!</p>
                <form onSubmit={handleGetHistory} className={styles.formStyles}>
                    <input type="password" name="userPass" placeholder="Coloca Tu Contraseña..."/>
                    <input type="submit" value="Enviar" className={styles.submit}/>
                </form>
            </div>
            : <div className={styles.historyCompras}>
                <h2>Compras De {datosUser.response.nombreCompleto}:</h2>
                <hr />
                {successHistory.map((el, key) => {
                    return <CompraTemplate products={JSON.parse(el.dataComprada)} el={el} key={key}/>
                })}
            </div>
            }
        </div>
    )
}

export default HistoryCart;