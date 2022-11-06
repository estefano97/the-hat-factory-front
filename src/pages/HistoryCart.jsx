import { Navigate } from "react-router";
import styles from "../styles/HistoryCart.module.css";
import helpHttp from "../helpers/helpHttp.js";
import { useState } from "react";
import CompraTemplate from "../components/CompraTemplate";

const HistoryCart = (props) => {
  const datosUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";

  const [errorMessage, setErrorMessage] = useState(false);
  const [Data, setData] = useState([]);
  const [Status, setStatus] = useState(false);

  const handleGetHistory = (e) => {
    e.preventDefault();

    helpHttp()
      .post("http://localhost/the-hat-factory/getCart", {
        body: {
          email: datosUser.response.email,
          userPass: e.target.userPass.value,
        },
        Headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (!res.status) {
          setErrorMessage(res.text);
          setStatus(false);
        } else {
          setStatus(true);
          let values = res.text.map((el) => {
            el.dataComprada = JSON.parse(el.dataComprada);
            return el;
          });
          setData(values);
          console.log(values);
        }
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
          <h2>Compras De {datosUser.response.nombreCompleto}:</h2>
          <hr />
          <div>
            {Data.map((el, key) => {
              return <CompraTemplate el={el} key={key} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCart;
