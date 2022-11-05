import styles from "../styles/CompraTemplate.module.css";

const CompraTemplate = (props) => {
  return (
    <div className={styles.compraContainer}>
      <div className={styles.dataBuy}>
        <p>Fecha de Compra: {props.el.create_time}</p>
        <p>ID de la Compra: {props.el.id_compraPayPal}</p>
        <p>Precio Total De Compra: ${props.el.valueBuy}</p>
      </div>
      <h3>Productos Comprados: </h3>
      <div>
        { Array.isArray(props.el.dataComprada)
        ?
        props.el.dataComprada.map((el, key) => {
            return (
              <div key={key} className={styles.productsBuy}>
                <p>
                  <b>Producto:</b> {el.productName}
                </p>
                <p>
                  <b>Talla:</b> {el.productTalla}
                </p>
              </div>
            );
          })
          : <p className={styles.noDisponible}>No Disponible</p>}
      </div>
      <hr />
    </div>
  );
};

export default CompraTemplate;
