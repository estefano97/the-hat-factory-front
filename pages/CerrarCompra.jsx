import CarItemCerrarCompra from "../components/CarItemCerrarCompra";
import PaypalPay from "../components/PaypalPay";
import styles from "../styles/CerrarCompra.module.css";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import helpHttp from "../helpers/helpHttp";

const CerrarCompra = (props) => {

    const datosUser = JSON.parse(window.localStorage.getItem("loggedTHF")) || "";

    let precioSinDescuento = 0;
    const [PrecioFinal, setPrecioFinal] = useState(0);
    const [discount, setDiscount] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ValorPayPal, setValorPayPal] = useState(0);

    props.cartLS.forEach(el => {
        precioSinDescuento += parseFloat(el.precio);
    });

    useEffect(() => {
        setPrecioFinal(precioSinDescuento);
        setValorPayPal(PrecioFinal);
    }, [PrecioFinal, precioSinDescuento]);

    const onSubmitCupon = (e) => {
        e.preventDefault();
        helpHttp().post(`https://kaal1.000webhostapp.com/API/discount`, {
        body: {
            cupon: discount
        }})
        .then(res => {
        if(res.error) {
            setError(res.error);
            setSuccess(false);
            setValorPayPal(PrecioFinal);
        } else {
            setError(false);
            setSuccess(true);
            let valorDescuento = (((res.porcentaje/100) + 1) * PrecioFinal) - PrecioFinal;
            setValorPayPal((PrecioFinal - valorDescuento).toFixed(2));
        }
        });
    }

    return (
        <div className={styles.cerrarCompraContainer}>
                {datosUser.status ? "" : <Navigate replace to="/"/>}
                <div className={styles.cuponTitleContainer}>
                    <div>
                        <h2>Items En El Carrito:</h2>
                    </div>
                    <form onSubmit={onSubmitCupon} className={styles.formDiscount}>
                        <label htmlFor="discount">Cupón De Descuento:</label>
                        <input type="text" name="discount" placeholder="Ejemplo: 235TD2" onChange={e => setDiscount(e.target.value)} value={discount}/>
                        <input type="submit" value="Comprobar Cupón"/>
                    </form>
                </div>
                {error ? <p className={styles.errorCupon}>{error}</p> : ""}
                {success ? <p className={styles.successCupon}>Cupon Aceptado!</p> : ""}

                <div className={styles.cerrarCompraitems}>
                {props.cartLS.map((el, key) => {
                return <CarItemCerrarCompra phoneCartMenu={props.phoneCartMenu} key={key} cartLS={el} setCartLS={props.setCartLS}/>;
                })}
                </div>
                <h2>Precio Total: ${PrecioFinal}</h2>
                <div className={styles.cerrarCompraMenu}>
                    <h1>Procesar Pago!</h1>
                    <div className={styles.paypalMenu}>
                        <PaypalPay cartLS={props.cartLS} subTotal={ValorPayPal}/>
                    </div>
                </div> 
        </div>)
    
}

export default CerrarCompra;