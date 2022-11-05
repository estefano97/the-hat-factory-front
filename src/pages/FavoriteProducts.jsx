import styles from '../styles/FavoriteProducts.module.css';
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import FavoriteTemplate from "../components/FavoriteTemplate";
import helpHttp from "../helpers/helpHttp";


const FavoriteProducts = (props) => {
    
    const [dataFavorite, setDataFavorite] = useState(null);
    const [resData, setResData] = useState(null);

    useEffect(() => {
        let userMail = props.userData.response.email;

        helpHttp().post("https://kaal1.000webhostapp.com/API/favoriteProducts", {
        body: {
            userEmail: userMail,
        },
        Headers: {
           "Content-Type":"application/json",
           Accept: "application/json",
        }
    })
    .then(res => {
            let data = [];
            for (const dataRes in res) {
                helpHttp().post("https://kaal1.000webhostapp.com/API/favoriteUser", {
                    body: {
                        id: dataRes,
                    },
                    Headers: {
                       "Content-Type":"application/json",
                        Accept: "application/json",
                    }
                })
                .then(res => {
                    data.push(res[0]);
                    setDataFavorite({...dataFavorite, data});
                })
            }
        })
        .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if(dataFavorite === null) return;
        setResData(dataFavorite.data);
    }, [dataFavorite])

    return(
        <div className={styles.favoriteContainer}>
            {props.userData.status ? "" : <Navigate replace to="/"/>}
            <h2>Tus Productos Favoritos</h2>
            <div className={styles.favoriteItems}>
            {resData ? resData.map((el, key) => {
                return <FavoriteTemplate userData={props.userData.response} key={key} data={el}/>
            })
            : <div className={styles.favoriteError}>
                <img src="/ProductsIMGs/assets/empty-cart.jpg" alt="cart-empty"/>
                <p>¡No Hay Productos Agregados a Favoritos!</p>
            </div>
            }
            </div>

        </div>
    )
}

export default FavoriteProducts;