import React, { useEffect, useState } from 'react';
import PreviewHat from '../components/PreviewHat';
import styles from '../styles/Home.module.css';
import helpHttp from '../helpers/helpHttp.js';
import Loader from '../components/Loader';
import axios from 'axios';

function NHL() {

  const [Elements, setElements] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://localhost:44345/api/products?Liga=nhl")
      .then((res) => {
        setElements(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className={styles.mainContainer}>
      <h2>Gorras NHL</h2>

      <div className={styles.mainContent}>
        {!IsLoading ? (
          Elements.map((el, key) => {
            return (
              <PreviewHat
                key={key}
                link={`/products/${el.id}`}
                image={el.imageUrl}
                name={el.productName}
                price={el.precio}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
  }
  
  export default NHL;