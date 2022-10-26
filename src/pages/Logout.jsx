import { Navigate } from "react-router";
import styles from "../styles/Logout.module.css";

const Logout = (props) => {
    const HandleLogout = () => {
        window.localStorage.removeItem("CartTHF");
        window.localStorage.removeItem("loggedTHF");
        props.setUserData(props.initialUserData);
        window.location.reload();
        window.location.href = "/";
    }

    const handleVolver = () => {
        window.location.reload();
        window.location.href = "/";
    }

    return(
        <div className={styles.LogoutContainer}>
            {props.userData.status ? "" : <Navigate replace to="/"/>}
            <h2>¿ Estas Seguro Que Deseas Cerrar Sesión ?</h2>
            <div>
                <button onClick={HandleLogout}>Cerrar Sesión</button>
                <button onClick={handleVolver}>Volver a Inicio</button>
            </div>
        </div>
        
    )
}

export default Logout;