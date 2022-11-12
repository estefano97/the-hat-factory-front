import styles from "../styles/CompraTemplate.module.css";

const CompraTemplate = (props) => {
  return (
    <div className={styles.compraContainer}>
      <div className={styles.dataBuy}>
        <p>Fecha de Compra: {props.el.fechaCompra}</p>
        <p>ID de la Compra: {props.el.idPaypal}</p>
        <p>Precio Total De Compra: ${props.el.totalValue}</p>
      </div>
      <h3>Productos Comprados: </h3>
      <div>
        {Array.isArray(props.el.productoCompras) ? (
          props.el.productoCompras.map((el, key) => {
            return (
              <div key={key} className={styles.productsBuy}>
                <p>
                  <b>Producto:</b> {el.producto.productName}
                </p>
                <p>
                  <b>Talla:</b> {el.productTalla}
                </p>
              </div>
            );
          })
        ) : (
          <p className={styles.noDisponible}>No Disponible</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default CompraTemplate;
