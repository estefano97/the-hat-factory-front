import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import helpHttp from "../helpers/helpHttp";
import styles from "../styles/ProductPage.module.css";
import AddProduct from "./AddProduct";
import RecomendationHat from "./RecomendationHat";

const ProductPage = (props) => {

    const formData = useRef();

    const {productPath} = useParams();
    let link = productPath.replace(/-/g," ");

    const [productContent, setproductContent] = useState(null);
    const [popUpAdd, setPopUpAdd] = useState(false);

    const handleAddCart = (e) => {

        e.preventDefault();
        
        if(!props.userData.status) return;
        
        let data = {
            productName: productContent.productName,
            precio: productContent.precio,
            productImage: productContent.imageURL,
            producto_id: productContent.producto_id,
            talla: formData.current.talla.value
        }
        
        let cartLS;
        
        if(window.localStorage.getItem("CartTHF") === null) {
            cartLS = [];
        } else{
            cartLS = JSON.parse(window.localStorage.getItem("CartTHF"));
        }
        cartLS.push(data);
        window.localStorage.setItem("CartTHF", JSON.stringify(cartLS));
        props.setCartLS(cartLS);
        setPopUpAdd(true);
        setTimeout(() => {
            setPopUpAdd(false);
            window.scrollTo(0, 0);
        }, 2000);
    }

    const handleAddFavorite = (e) => {
        e.preventDefault();

        if(!props.userData.status) return;
        
        let data = {
            productName: productContent.productName,
            precio: productContent.precio,
            productImage: productContent.imageURL,
            producto_id: productContent.producto_id,
            talla: formData.current.talla.value
        }
    
        let userEmail = props.userData.response.email;

        helpHttp().post("https://kaal1.000webhostapp.com/API/favoriteProducts", {
        body: {
            productName: data.producto_id,
            userEmail: userEmail
        },
        Headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        })

        setPopUpAdd(true);
        setTimeout(() => {
            setPopUpAdd(false);
            window.scrollTo(0, 0);
        }, 2000);
    }

    useEffect(() => {
        helpHttp().post("https://kaal1.000webhostapp.com/API/ProductItem", {
            body: {
                productName: link
            },
            Headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
            }
        })
        .then(res => {
            setproductContent(res);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productPath]);

    return(
        <div className={styles.ProductPageContainer}>
            {productContent
            ? <div className={styles.ContentContainer}>
                {popUpAdd ? <AddProduct/> : ""}
                <div>
                <h1>{productContent.productName}</h1>
                <h2>Precio: <b>${productContent.precio}</b></h2>
                <img src={productContent.imageURL.replace(/-/g," ")} alt={productContent.productName} />
                </div>
                <form ref={formData}>
                    <h2>Seleccione Su Talla</h2>
                    <p className={styles.tallaText}><b>¿Qué Talla Soy?</b></p>
                    <select className={styles.optionSelected} name="talla" id="talla">
                        <option value="6-3/4">6 3/4</option>
                        <option value="6-7/8">6 7/8</option>
                        <option value="7">7</option>
                        <option value="7-1/8">7 1/8</option>
                        <option value="7-1/4">6 1/4</option>
                        <option defaultValue="selected" value="7 3/8">7 3/8</option>
                        <option value="7-1/2">7 1/2</option>
                        <option value="7-5/8">7 5/8</option>
                        <option value="7-3/4">7 3/4</option>
                        <option value="7-7/8">7 7/8</option>
                        <option value="8">8</option>
                        <option value="8-1/8">8 1/8</option>
                        <option value="8-1/4">8 1/4</option>
                        <option value="7-1/2">7 1/2</option>
                    </select>

                {props.userData.status ? "" :  <h3 className={styles.errorTexts}>¡No Puedes Agregar Productos Al Carrito Ni a Favoritos Porque No Has Iniciado Sesión!</h3> }

                    <button className={styles.addCart} type="submit" onClick={handleAddCart}>Agregar Al Carrito</button>
                    <button className={styles.addFav} type="submit" onClick={handleAddFavorite}>Agregar a Favoritos</button>
                </form>
                
            </div>
            : ""}
            <RecomendationHat />
        </div>
    )
}

export  default ProductPage;