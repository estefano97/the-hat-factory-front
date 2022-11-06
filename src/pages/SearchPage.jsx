import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PreviewHat from "../components/PreviewHat";
import helpHttp from "../helpers/helpHttp";
import styles from "../styles/SearchPage.module.css";

const SearchPage = () => {

    const {searchPath} = useParams();

    const {orderSearch} = useParams();

    const [busquedaItems, setBusquedaItems] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    
    let terminoBusqueda = searchPath.replace(/-/g," ").toLowerCase();

    useEffect(() => {
        setIsLoading(true);

        let url = `https://localhost:44345/api/products`;
        if(terminoBusqueda) url += `?Nombre=${terminoBusqueda}`;
        if(orderSearch) url += `&OrderBy=${orderSearch}`;

        axios.get(url)
        .then(res => {
            setBusquedaItems(res.data);
          })
        .finally(() => setIsLoading(false));
          window.scrollTo(0, 0);
      }, [orderSearch, terminoBusqueda]);
    return(
        <div className={styles.searchContainer}>
            {!IsLoading
            ? busquedaItems.length < 0
            ? <div className={styles.notFoundContainer}>
                <img src="/ProductsIMGs/assets/notfound.png" alt="asdas" />
                <p>No se encontraron coincidencias!</p>
            </div>
            : busquedaItems.map((el, key) => {
                return <PreviewHat
                  key={key}
                  link={`/products/${el.id}`}
                  image={el.imageUrl}
                  name={el.productName}
                  price={el.precio} />;
              })
            : <Loader/>}

            {}
        </div>
    )
}

export default SearchPage;