import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import styles from "../styles/ProductPage.module.css";
import AddProduct from "./AddProduct";
import Loader from "./Loader";
import RecomendationHat from "./RecomendationHat";

const ProductPage = (props) => {
  const formData = useRef();

  const { idProduct } = useParams();

  const [productContent, setproductContent] = useState(null);
  const [popUpAdd, setPopUpAdd] = useState(false);

  const handleAddCart = (e) => {
    e.preventDefault();

    if (!props.userData.id) return;

    let data = {
      productName: productContent.productName,
      precio: productContent.precio,
      productImage: productContent.imageUrl,
      producto_id: productContent.id,
      talla: formData.current.talla.value,
    };
    console.log(data);
    let cartLS;

    if (window.localStorage.getItem("CartTHF") === null) {
      cartLS = [];
    } else {
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
  };

  const handleAddFavorite = (e) => {
    e.preventDefault();

    if (!props.userData.id) return;

    let data ={
      idUser: props.userData.id,
      idProduct: productContent.id,
    }

    axios.post("https://localhost:44345/api/favorites/add", data);

    setPopUpAdd(true);
    setTimeout(() => {
      setPopUpAdd(false);
      window.scrollTo(0, 0);
    }, 2000);
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44345/api/products/getById?id=${idProduct}`)
      .then((res) => {
        setproductContent(res.data);
      });
  }, [idProduct]);

  return (
    <div className={styles.ProductPageContainer}>
      {productContent ? (
        <>
          <div className={styles.ContentContainer}>
            {popUpAdd ? <AddProduct /> : ""}
            <div>
              <h1>{productContent.productName}</h1>
              <h2>
                Precio: <b>${productContent.precio}</b>
              </h2>
              <img
                src={productContent.imageUrl.replace(/-/g, " ")}
                alt={productContent.productName}
              />
            </div>
            <form ref={formData}>
              <h2>Seleccione Su Talla</h2>
              <p className={styles.tallaText}>
                <b>¿Qué Talla Soy?</b>
              </p>
              <select className={styles.optionSelected} name="talla" id="talla">
                <option value="6-3/4">6 3/4</option>
                <option value="6-7/8">6 7/8</option>
                <option value="7">7</option>
                <option value="7-1/8">7 1/8</option>
                <option value="7-1/4">6 1/4</option>
                <option defaultValue="selected" value="7 3/8">
                  7 3/8
                </option>
                <option value="7-1/2">7 1/2</option>
                <option value="7-5/8">7 5/8</option>
                <option value="7-3/4">7 3/4</option>
                <option value="7-7/8">7 7/8</option>
                <option value="8">8</option>
                <option value="8-1/8">8 1/8</option>
                <option value="8-1/4">8 1/4</option>
                <option value="7-1/2">7 1/2</option>
              </select>

              {props.userData.id ? (
                ""
              ) : (
                <h3 className={styles.errorTexts}>
                  ¡No Puedes Agregar Productos Al Carrito Ni a Favoritos Porque
                  No Has Iniciado Sesión!
                </h3>
              )}

              <button
                className={styles.addCart}
                type="submit"
                onClick={handleAddCart}
              >
                Agregar Al Carrito
              </button>
              <button
                className={styles.addFav}
                type="submit"
                onClick={handleAddFavorite}
              >
                Agregar a Favoritos
              </button>
            </form>
          </div>
          <RecomendationHat />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductPage;
