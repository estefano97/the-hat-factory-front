import React, { useEffect, useState } from 'react';
import PreviewHat from '../components/PreviewHat';
import styles from '../styles/Home.module.css';
import helpHttp from '../helpers/helpHttp.js';
import Loader from '../components/Loader';


function Home() {

  const [responseAPI, setResponseAPI] = useState(null);

  useEffect(() => {
    helpHttp().get("https://kaal1.000webhostapp.com/API/homeHats")
      .then(res => {
        setResponseAPI(res);
      })
  }, []);

  return (
    <main className={styles.mainContainer}>
      <h2>Trendring Hats 🔥🔥🔥</h2>

      <div className={styles.mainContent}>
      {responseAPI
      ? responseAPI.map((el, key) => {
          let link = el.productName.replace(/ /g,"-");
          return <PreviewHat
            key={key}
            link={`/products/${link}`}
            image={el.imageURL}
            name={el.productName}
            price={el.precio} />;
        })
      : <Loader/>}
      </div>

    </main>
    );
  }
  
  export default Home;