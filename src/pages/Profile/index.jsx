import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../../styles/Profile.module.css";

const Profile = (props) => {
  const datosUser =
    JSON.parse(window.localStorage.getItem("loggedTHF")) ||
    props.initialUserData;

  return (
    <div className={styles.profileContent}>
      {props.userData.id ? "" : <Navigate replace to="/" />}
      <div className={styles.profileTitle}>
        <h1>¡Hola, {datosUser.nombreCompleto}!</h1>
        <p>Aquí puedes ver y editar la información de tu cuenta</p>
      </div>

      <Link to="/favorite-products" className={styles.favorites}>
        <i className="far fa-star"></i> <p>Favoritos</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
      <Link to="/buy-history" className={styles.historyBuy}>
        <i className="fas fa-history"></i> <p>Historial De Compras</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
      <Link to="/user-config" className={styles.logout}>
        <i className="fas fa-users-cog"></i> <p>Configuración De Cuenta</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
      <Link to="/logout" className={styles.logout}>
        <i className="fas fa-sign-out-alt"></i> <p>Cerrar Sesión</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
    </div>
  );
};

export default Profile;
