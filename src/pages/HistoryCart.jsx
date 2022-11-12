import { Navigate } from "react-router";
import styles from "../styles/HistoryCart.module.css";
import { useState } from "react";
import CompraTemplate from "../components/CompraTemplate";
import axios from "axios";

const HistoryCart = (props) => {
  const datosUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";

  const [errorMessage, setErrorMessage] = useState(false);
  const [Data, setData] = useState([]);
  const [Status, setStatus] = useState(false);

  const handleGetHistory = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:44345/api/buys/GetAll", {
        Email: datosUser.email,
        Password: e.target.userPass.value,
      })
      .then((res) => {
        setStatus(true);
        setData(res.data);
        console.log(res.data)
      });
  };

  return (
    <div>
      {props.userData.id ? "" : <Navigate replace to="/" />}
      {!Status ? (
        <div className={styles.HistoryContainer}>
          {!errorMessage ? (
            ""
          ) : (
            <div className={styles.errorStyles}>
              <p>{errorMessage}</p>
            </div>
          )}
          <p>Para Poder Ver Tus Compras Necesitas Colocar Tu Contraseña!</p>
          <form onSubmit={handleGetHistory} className={styles.formStyles}>
            <input
              type="password"
              name="userPass"
              placeholder="Coloca Tu Contraseña..."
            />
            <input type="submit" value="Enviar" className={styles.submit} />
          </form>
        </div>
      ) : (
        <div className={styles.historyCompras}>
          <h2>Compras De {datosUser.nombreCompleto}:</h2>
          <hr />
          <div>
            {Data.length >= 1 
            ?  Data.map((el, key) => {
                return <CompraTemplate el={el} key={key} />
            }) 
            : <p>Cargando...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCart;
