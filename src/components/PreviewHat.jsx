import styles from "../styles/PreviewHat.module.css";


const PreviewHat = (props) => {
    let rutaIMG = props.image.replace(/-/g," ");
    return (
        <a href={props.link} className={styles.mainPreview}>
            <img src={rutaIMG} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>Price: <b>${props.price}</b></p>
        </a>
    )
}

export default PreviewHat;