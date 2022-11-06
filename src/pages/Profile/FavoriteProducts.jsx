import styles from "../../styles/FavoriteProducts.module.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import FavoriteTemplate from "../../components/FavoriteTemplate";
import helpHttp from "../../helpers/helpHttp";
import Loader from "../../components/Loader";
import axios from "axios";

const FavoriteProducts = (props) => {
  const [dataFavorite, setDataFavorite] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios.get(`https://localhost:44345/api/favorites?idUser=${props.userData.id}`)
      .then((res) => {
        console.log(res.data)
        setDataFavorite(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.favoriteContainer}>
      {props.userData.id ? "" : <Navigate replace to="/" />}
      <h2>Tus Productos Favoritos</h2>
      {IsLoading ? (
        <Loader />
      ) : (
        <div className={styles.favoriteItems}>
          {dataFavorite.length > 0 ? (
            dataFavorite.map((el, key) => {
              return (
                <FavoriteTemplate
                  userData={props.userData}
                  key={key}
                  data={el.idProductoNavigation}
                />
              );
            })
          ) : (
            <div className={styles.favoriteError}>
              <img src="/ProductsIMGs/assets/empty-cart.jpg" alt="cart-empty" />
              <p>¡No Hay Productos Agregados a Favoritos!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
