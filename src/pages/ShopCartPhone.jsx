import styles from "../styles/ShopCartPhone.module.css";

const ShopCartPhone = (props) => {
    
    let mainCart = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: ".5s",
        boxShadow: props.phoneCartMenu ? "0 0 50px 50px rgba(0, 0, 0, .5)" : "",
        marginLeft: props.phoneCartMenu ? "0vw" : "120vw",
    }
    return(
        <div style={mainCart}>
            <div className={styles.mainContent}>
                <div className={styles.mainContentHeader}>
                    <button
                    onClick={() => props.setPhoneCartMenu(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2>Tus Productos</h2>
                </div>
                <div className={styles.mainContentBody}>
                    <h2>Carrito De Compras Vacío!</h2>
                </div> 
            </div>
        </div>
    )
}

export default ShopCartPhone;