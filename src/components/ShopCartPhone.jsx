import styles from "../styles/ShopCartPhone.module.css";
import CartContent from "./CartContent";

const ShopCartPhone = (props) => {
    
    let subTotal = 0;

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
        zIndex: 5000,
        boxShadow: props.phoneCartMenu ? "0 0 50px 50px rgba(0, 0, 0, .5)" : "",
        marginLeft: props.phoneCartMenu ? "0vw" : "120vw",
    }
    props.cartLS.forEach(el => {
        subTotal += parseFloat(el.precio)
    });
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
                <CartContent setPhoneCartMenu={props.setPhoneCartMenu} subTotal={subTotal} phoneCartMenu={props.phoneCartMenu} cartLS={props.cartLS} setCartLS={props.setCartLS}/>
            </div>
        </div>
    )
}

export default ShopCartPhone;