import CartItem from "../components/CartItem";
import styles from "../styles/CartPage.module.css";
import { Link, Navigate } from "react-router-dom";

const CartPage = (props) => {

    let precio = 0;
    props.cartLS.forEach(el => {
        precio += parseFloat(el.precio);
    });

    return(
        <div className={styles.cartContainer}>
            {window.innerWidth < 500 ? <Navigate replace to="/"/> : ""}
            {props.cartLS.length !== 0
            ? <div>
               <div className={styles.cartItems}>
                { props.cartLS.map((el, key) => {
                    return <CartItem phoneCartMenu={props.phoneCartMenu} key={key} cartLS={el} setCartLS={props.setCartLS}/>;
                    })}
               </div>
                <div className={styles.mainContentFooter}>
                    <hr />
                    <p>SubTotal: ${precio}</p>
                    <Link to="/cerrar-compra" onClick={() => {
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

export default CartPage;