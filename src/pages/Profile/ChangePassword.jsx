import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../../styles/ChangePassword.module.css";

const ChangePassword = (props) => {
  const [Status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const datosUser =
    JSON.parse(window.localStorage.getItem("loggedTHF")) ||
    props.initialUserData;

  const handleGetHistory = (e) => {
    e.preventDefault();

    if (e.target.newPassword.value !== e.target.repeatNewPassword.value) {
      return setErrorMessage("Las contraseñas no coinciden!");
    }

    axios
      .post("https://localhost:44345/api/auth/changePassword", {
        Email: datosUser.email,
        Password: e.target.userPass.value,
        NewPassword: e.target.newPassword.value,
      })
      .then((res) => {
        if (!res.status) {
          setStatus(false);
          setErrorMessage("Error al cambiar la contraseña");
        } else {
          setStatus(true);
          setErrorMessage("Contraseña cambiada con exito!");
        }
      });
  };

  return (
    <div>
      {datosUser.id ? "" : <Navigate replace to="/" />}
      {!Status ? (
        <div className={styles.HistoryContainer}>
          <p>Coloca tus credenciales para cambiar tu contraseña</p>
          {errorMessage ? (
            <div className={styles.errorStyles}>
              <p>{errorMessage}</p>
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={handleGetHistory} className={styles.formStyles}>
            <input
              type="password"
              name="userPass"
              required
              min={6}
              placeholder="Coloca Tu Contraseña..."
            />
            <input
              type="password"
              name="newPassword"
              required
              min={6}
              placeholder="Coloca su nueva tu contraseña..."
            />
            <input
              type="password"
              name="repeatNewPassword"
              required
              min={6}
              placeholder="Coloca denuevo su nueva tu contraseña..."
            />
            <input type="submit" value="Enviar" className={styles.submit} />
          </form>
        </div>
      ) : (
        <div className={styles.succesfullyChanged}>
          <h1>Contraseña cambiada con exito!</h1>
          <img src="/ProductsIMGs/assets/passwordchanged.webp" alt="the-hat-factory-logo" />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
