import CartItem from "./CartItem";
import styles from "../styles/CartContent.module.css";
import { Link } from "react-router-dom";

const CartContent = (props) => {
    return(
        <div className={styles.cartContainer}>
            {props.cartLS.length !== 0
            ? <div>
               { props.cartLS.map((el, key) => {
                return <CartItem phoneCartMenu={props.phoneCartMenu} key={key} cartLS={el} setCartLS={props.setCartLS}/>;
                })}
                <div className={styles.mainContentFooter}>
                    <hr />
                    <p>SubTotal: ${props.subTotal}.00</p>
                    <Link to="/cerrar-compra" onClick={() => {
                        props.setPhoneCartMenu(false)
                        window.scrollTo(0, 0);
                    }}>Proceder Al Pago</Link>
                </div>
            </div>
            :<div className={styles.cartEmpty}>
                <h2>Carrito Vacío</h2>
                <img src="/ProductsIMGs/assets/EmptyCart.svg" alt="empty"/>
            </div>}
        </div>
    )
}

export default CartContent;