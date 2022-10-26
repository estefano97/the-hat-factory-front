import styles from "../styles/CartItemCerrarCompra.module.css";

const CarItemCerrarCompra = (props) => {

    const { cartLS } = props;
    let rutaIMG = cartLS.productImage.replace(/-/g," ");

    return(
        <div className={styles.cartContainer}>
            <img src={rutaIMG} alt={cartLS.productName} />
            <div className={styles.cartDescription}>
                <p className={styles.descriptionName}><b>{cartLS.productName}</b></p>
                <p className={styles.descriptionTalla}>{cartLS.talla}</p>
                <p className={styles.descriptionPrice}><b>${cartLS.precio}</b></p>
            </div>
        </div>
    )
}

export default CarItemCerrarCompra;