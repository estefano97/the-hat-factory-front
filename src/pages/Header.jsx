import { useState } from 'react';
import styles from '../styles/Header.module.css';
import logo from '../assets/thf.png';
import ShopCartPhone from './ShopCartPhone';
import { Link } from 'react-router-dom';

const submitFormSearch = (e) => {
    e.preventDefault();
    console.log(e.target.searchName);
}

const Header = (props) => {

    const [phoneCartMenu, setPhoneCartMenu] = useState(false);

    return(
        <div>
            <ShopCartPhone phoneCartMenu={phoneCartMenu} setPhoneCartMenu={setPhoneCartMenu}/>
            <header className={styles.header}>
            <div className={styles.menuFirst}>
                <Link to="/" className={styles.menuLogo}>
                    <img src={logo} alt="the-hat-factory-logo" />
                </Link>
                {props.userData.status
                ? <Link to="/profile" className={styles.sesion}>Ver Perfil</Link>
                : <Link to="/login" className={styles.sesion}>Iniciar Sesión</Link>}
                <button
                    onClick={() => setPhoneCartMenu(true)}
                    className={styles.menuCart}>
                    <i className="fas fa-cart-arrow-down"></i>
                </button>
            </div>
            <nav className={styles.menuContent}>
                <ul>
                    <li><a href="#v">MLB</a></li>
                    <li><a href="#a">NBA</a></li>
                    <li><a href="#a">NFL</a></li>
                    <li><a href="#a">NHL</a></li>
                    <li><a href="#a">College</a></li>
                </ul>
            </nav>
            <form
                className={styles.searchName}
                onSubmit={submitFormSearch}>
                <input
                type="text"
                name="searchName"
                placeholder="Buscar..."/>
                <button><i className="fas fa-search"></i></button>
            </form>
            </header>
        </div>
    )
}

export default Header;