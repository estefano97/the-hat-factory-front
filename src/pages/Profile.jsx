import { Navigate } from "react-router";
import HistoryCart from "../components/HistoryCart";

const Profile = (props) => {

    const datosUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || props.initialUserData;

    const handleLogout = () => {
        window.localStorage.removeItem("loggedTHF");
        props.setUserData(props.initialUserData);
        window.location.reload();
    }

    return(
        <div>
            {props.userData.status ? "" : <Navigate replace to="/"/>}
            <h2>Bienvenid@! {datosUser.response.nombreCompleto}</h2>
            <button onClick={handleLogout}>Logout</button>

            <HistoryCart userCart={datosUser.response.idHistorialCompras}/>
        </div>
    )

}

export default Profile;