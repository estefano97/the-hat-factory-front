import axios from "axios";
import { Link } from "react-router-dom";
import helpHttp from "../helpers/helpHttp";
import styles from "../styles/FavoriteTemplate.module.css";

const FavoriteTemplate = (props) => {
    
    let link = props.data.imageUrl.replace(/-/g," ");
    const handleDelete = (e) => {

        if(props.data.id === e.target.dataset.id) {

            let data = {
                idProduct: e.target.dataset.id,
                idUser: props.userData.id
            }

            console.log(data);

            axios.post("https://localhost:44345/api/favorites/remove", data)
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
                    <Link to={`/products/${props.data.id}`}><i className="far fa-eye"></i></Link>
                    <button><i onClick={handleDelete}data-id={props.data.id} className="fas fa-times"></i></button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteTemplate;