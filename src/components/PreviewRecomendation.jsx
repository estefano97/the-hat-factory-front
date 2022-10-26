import React from 'react'
import styles from "../styles/RecomendationHat.module.css";

const PreviewRecomendation = (props) => {
  let rutaIMG = props.image.replace(/-/g," ");
  return (
    <a href={props.link} className={styles.recomendationCard}>
      <img src={rutaIMG} alt={props.name}/>
      <h3>{props.name}</h3>
      <p>Precio: <b>${props.price}</b></p>
    </a>
  )
}

export default PreviewRecomendation;
