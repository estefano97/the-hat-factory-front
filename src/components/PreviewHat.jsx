import styles from "../styles/PreviewHat.module.css";


const PreviewHat = (props) => {
    return (
        <a href={props.link} className={styles.mainPreview}>
            <img src={props.image} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>Price: <b>{props.price}</b></p>
        </a>
    )
}

export default PreviewHat;