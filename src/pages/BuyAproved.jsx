import React from 'react';
import styles from '../styles/BuyAproved.module.css';

const BuyAproved = () => {
  return (
    <div className={styles.buyContainer}>
        <h1>Compra realizada con éxito</h1>
        <h2>Muchas gracias por su compra!</h2>
        <p>porfavor, pongase en contacto con nuestro numero telefónico, para notificarnos su compra y poder coordinar la entrega.</p>
        <img src="/ProductsIMGs/assets/success_icon.svg" alt="" />
    </div>
  )
}

export default BuyAproved;