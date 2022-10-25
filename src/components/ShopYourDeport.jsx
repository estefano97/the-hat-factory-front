import React, { useState } from 'react';
import styles from '../styles/ShopYourDeport.module.css';
import DeportMain from './DeportMain';

const ShopYourDeport = (props) => {

    const [deport, setDeport] = useState("MLB");

    return(
        <div
        onMouseEnter={() => props.setDeportMenu(true)}
        onMouseLeave={() => props.setDeportMenu(false)}
        className={styles.deportContainer}>
            <div className={styles.deportMenu}>
                <h2>Deporte</h2>
                <ul>
                    <li><a
                    onClick={() => setDeport("MLB")}
                    href="#a">MLB</a></li>
                    <li><a
                    onClick={() => setDeport("NFL")}
                    href="#a">NFL</a></li>
                    <li><a
                    onClick={() => setDeport("NBA")}
                    href="#a">NBA</a></li>
                    <li><a
                    onClick={() => setDeport("COLLEGE")}
                    href="#a">COLLEGE</a></li>
                    <li><a
                    href="#a">All Sports</a></li>
                </ul>
            </div>
            <DeportMain deport={deport}/>
        </div>
    )
}

export default ShopYourDeport;