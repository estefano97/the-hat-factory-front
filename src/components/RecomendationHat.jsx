import React, { useEffect, useState } from 'react'
import helpHttp from '../helpers/helpHttp';
import styles from "../styles/RecomendationHat.module.css";
import Loader from './Loader';
import PreviewRecomendation from './PreviewRecomendation';

const RecomendationHat = () => {
  const [recomendation, setRecomendation] = useState(null);
  
  useEffect(() => {
    helpHttp().get("https://kaal1.000webhostapp.com/API/homeHats")
      .then(res => {
        let valoresRecomendar = [];
        for (let i = 0; i < 4; i++) {
          let random = Math.floor(Math.random()*res.length);
          let values = res[random];
          valoresRecomendar.push(values);
        }
        setRecomendation(valoresRecomendar);
      })
  }, []);

  return (
      <div className={styles.mainContent}>
        <h3>Productos Recomendados:</h3>
      <div className={styles.recomendationContainer}>
        {recomendation
        ? recomendation.map((el, key) => {
          let link = el.productName.replace(/ /g,"-");
          return <PreviewRecomendation
            key={key}
            link={`/products/${link}`}
            image={el.imageURL}
            name={el.productName}
            price={el.precio} />;
          })
        : <Loader/>}
      </div>
      </div>
    );
}

export default RecomendationHat;
