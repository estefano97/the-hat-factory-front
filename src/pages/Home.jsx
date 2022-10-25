import React from 'react';
import PreviewHat from '../components/PreviewHat';
import styles from '../styles/Home.module.css';



function Home() {

    return (
      <main className={styles.mainContainer}>
        <h2>Trendring Hats 🔥🔥🔥</h2>
        <PreviewHat
        link={`/products/hatsNBA-GoldenStateWarrios-BackHalf`}
        image="./hatsNBA/GoldenStateWarrios/warriosBackHalfFadeSnapback.png"
        name="Warriors BACK HALF FADE SNAPBACK Hat by New Era"
        price="$35"/>

        <PreviewHat
        link="#MiamiHeat"
        image="./hatsNBA/MiamiHeat/CityTransit.png"
        name="Heat City Transit Black Fitted Hat by New Era"
        price="$45"/>

        <PreviewHat
        link="#MiamiHeat"
        image="./hatsNBA/MiamiHeat/DesertStorm.png"
        name="Heat MIGHTY-XL Desert Storm Camo Fitted Hat by New Era"
        price="$29"/>

        <PreviewHat
        link="#MiamiHeat"
        image="./hatsNBA/MiamiHeat/HWC-TIGHTRedBlack.png"
        name="Heat HWC-TIGHT Red-Black Fitted Hat by New Era"
        price="$19"/>

      </main>
    );
  }
  
  export default Home;