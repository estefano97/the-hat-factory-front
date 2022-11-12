import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import styles from "../../styles/EditAccount.module.css";

const UserConfig = (props) => {

  const datosUser =
  JSON.parse(window.localStorage.getItem("loggedTHF")) ||
  props.initialUserData;

  return (
    <div className={styles.profileContent}>
      {datosUser.id ? "" : <Navigate replace to="/" />}
      <Link to="/change-password">
        <i className="fas fa-users-cog"></i> <p>Cambiar contraseña</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
    </div>
  )
}

export default UserConfig;