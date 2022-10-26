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
    const [valoresNull, setValoresNull] = useState(false);
    
    let terminoBusqueda = searchPath.replace(/-/g," ").toLowerCase();

    useEffect(() => {
        helpHttp().get("https://kaal1.000webhostapp.com/API/homeHats")
        .then(res => {
            if(res === "no hay valores") return;
            let valores = [];
            let precios = [];
            // eslint-disable-next-line array-callback-return
            res.map((el) => {
                if(el.productName.toLowerCase().includes(terminoBusqueda)) {
                    valores.push(el);
                    precios.push(el.precio);
                }
            })
            if(valores.length > 0) {
                setValoresNull(true);
            } else {
                setValoresNull(false);
            }

            if(orderSearch === "price") {
                valores.sort((a, b) => {
                    return a.precio - b.precio;
                });  
            }
            if (orderSearch === "alphabet") {
                valores.sort((a, b) => {
                    const nameA = a.productName.toLowerCase();
                    const nameB = b.productName.toLowerCase();
                    if (nameA < nameB) {return -1;}
                    if (nameA > nameB) {return 1;}
                    return 0;
                });
            }
            setBusquedaItems(valores);
          })
          window.scrollTo(0, 0);
      }, [orderSearch, terminoBusqueda]);
    return(
        <div className={styles.searchContainer}>
            {busquedaItems
            ? busquedaItems.map((el, key) => {
                let link = el.productName.replace(/ /g,"-");
                return <PreviewHat
                  key={key}
                  link={`/products/${link}`}
                  image={el.imageURL}
                  name={el.productName}
                  price={el.precio} />;
              })
            : <Loader/>}

            {busquedaItems && !valoresNull
            ? <div className={styles.notFoundContainer}>
                <img src="/ProductsIMGs/assets/notfound.png" alt="asdas" />
                <p>No se encontraron coincidencias!</p>
            </div>
            : ""}
        </div>
    )
}

export default SearchPage;