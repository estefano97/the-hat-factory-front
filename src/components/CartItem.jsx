import { Link } from "react-router-dom";
import styles from "../styles/CartItem.module.css";

const CartItem = (props) => {

    const { cartLS } = props;
    console.log(cartLS);
    let urlIMG = cartLS.productImage.replace(/-/g," ");
    
    const handleView = () => props.phoneCartMenu(false);
    
    
    const handleDelete = (e) => {
        let dataCart = JSON.parse(window.localStorage.getItem("CartTHF"));

        let newDataCart = [];

        // eslint-disable-next-line array-callback-return
        dataCart.filter(el => {
            if(el.producto_id === e.target.dataset.id && el.talla === e.target.dataset.talla) {
                
            } else{
                newDataCart.push(el);
            }
        });
        props.setCartLS(newDataCart);
        window.localStorage.setItem("CartTHF", JSON.stringify(newDataCart));
    }

    return(
        <div className={styles.cartContainer}>
            <img src={urlIMG} alt={cartLS.productName} />
            <div className={styles.cartDescription}>
                <p className={styles.descriptionName}><b>{cartLS.productName}</b></p>
                <p className={styles.descriptionTalla}>{cartLS.talla}</p>
                <p className={styles.descriptionPrice}><b>${cartLS.precio}</b></p>
            </div>
            <div className={styles.cartActions}>
                <button><i className="fas fa-plus"></i></button>
                <button><i onClick={handleDelete} data-talla={cartLS.talla} data-id={cartLS.producto_id} className="fas fa-trash-alt"></i></button>
                <Link onClick={handleView} to={`../products/${cartLS.id}`}><i className="far fa-eye"></i></Link>
            </div>
        </div>
    )
}

export default CartItem;