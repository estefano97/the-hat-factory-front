import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../../styles/Profile.module.css";

const UserConfig = () => {
  return (
    <div>
      <Link to="/user-config" className={styles.logout}>
        <i className="fas fa-users-cog"></i> <p>Configuración De Cuenta</p>{" "}
        <i className="fas fa-chevron-right"></i>
      </Link>
    </div>
  )
}

export default UserConfig;