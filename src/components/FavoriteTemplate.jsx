import { Link } from "react-router-dom";
import helpHttp from "../helpers/helpHttp";
import styles from "../styles/FavoriteTemplate.module.css";

const FavoriteTemplate = (props) => {

    let link = props.data.imageURL.replace(/-/g," ");
    let name = props.data.productName.replace(/ /g,"-");
    const handleDelete = (e) => {
        let userEmail = props.userData.email;

        if(props.data.producto_id === e.target.dataset.id) {
            helpHttp().post("https://kaal1.000webhostapp.com/API/favoriteProducts", {
            body: {
                productDelete: e.target.dataset.id,
                userEmail: userEmail
            },
            Headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            })
            .then(res => {
                window.location.reload();
            })
        }

    }

    return(
        <div className={styles.TemplateFavContainer}>
            <h3>{props.data.productName}</h3>
            <div className={styles.FavImageAndActions}>
                <img src={link} alt={props.data.productName} />
                <div className={styles.FavActions}>
                    <Link to={`/products/${name}`}><i className="far fa-eye"></i></Link>
                    <button><i onClick={handleDelete}data-id={props.data.producto_id} className="fas fa-times"></i></button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteTemplate;