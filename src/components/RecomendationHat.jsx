import axios from 'axios';
import React, { useEffect, useState } from 'react'
import helpHttp from '../helpers/helpHttp';
import styles from "../styles/RecomendationHat.module.css";
import Loader from './Loader';
import PreviewRecomendation from './PreviewRecomendation';

const RecomendationHat = () => {
  const [recomendation, setRecomendation] = useState(null);
  
  useEffect(() => {
    axios.get("https://localhost:44345/api/products")
      .then(res => {
        let valoresRecomendar = [];
        for (let i = 0; i < 4; i++) {
          let random = Math.floor(Math.random()*res.data.length);
          let values = res.data[random];
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
          return <PreviewRecomendation
            key={key}
            link={`/products/${el.id}`}
            image={el.imageUrl}
            name={el.productName}
            price={el.precio} />;
          })
        : <Loader/>}
      </div>
      </div>
    );
}

export default RecomendationHat;
