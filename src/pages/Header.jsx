import { useState } from 'react';
import styles from '../styles/Header.module.css';
import ShopCartPhone from '../components/ShopCartPhone';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const [phoneCartMenu, setPhoneCartMenu] = useState(false);
    const [searchElement, setSearchElement] = useState("");
    const [orderSearch, setOrderSearch] = useState("");

    return(
        <div className={styles.headerContainer}>
            <ShopCartPhone cartLS={props.cartLS} setCartLS={props.setCartLS} phoneCartMenu={phoneCartMenu} setPhoneCartMenu={setPhoneCartMenu}/>
            <header className={styles.header}>
            <div className={styles.menuFirst}>
                <Link to="/" className={styles.menuLogo}>
                    <img src="/ProductsIMGs/assets/thf.png" alt="the-hat-factory-logo" />
                </Link>
                {props.userData.status
                ? <Link to="/profile" className={styles.sesion}>Ver Perfil</Link>
                : <Link to="/login" className={styles.sesion}>Iniciar Sesión</Link>}

                {window.innerWidth < 700
                    ?<button
                        onClick={() => setPhoneCartMenu(true)}
                        className={styles.menuCart}>
                        <i className="fas fa-cart-arrow-down"></i>
                    </button>
                    :  props.userData.status
                        ? <Link to="/cart" className={styles.menuCart}>
                            <i className="fas fa-cart-arrow-down"></i>
                        </Link>
                        : <button
                        onClick={() => alert("Inicia Sesion Para Agregar Productos!")}
                        className={styles.menuCart}>
                        <i className="fas fa-cart-arrow-down"></i>
                </button>}          
            </div>
            <div className={styles.searchName}>
                <select name="orden" id="orden" onChange={(e) => setOrderSearch(e.target.value)}>
                    <option value="_">Ordenar Por...</option>
                    <option value="price">Precio</option>
                    <option value="alphabet">A-Z</option>
                </select>
                <input
                type="text"
                value={searchElement}
                onChange={(e) => setSearchElement(e.target.value)}
                name="searchName"
                placeholder="Buscar..."/>
                <Link to={`/search/${searchElement.replace(/ /g,"-")}/${orderSearch}`}><i className="fas fa-search"></i></Link>
            </div>
            </header>
            <nav className={styles.menuContent}>
            <ul>
                <li><Link to="/mlb"><img src="/ProductsIMGs/assets/icons/mlb-icon.webp" alt="" /></Link></li>
                <li><Link to="/nba"><img src="/ProductsIMGs/assets/icons/nba-icon.webp" alt="" /></Link></li>
                <li><Link to="/nfl"><img src="/ProductsIMGs/assets/icons/nfl-icon.webp" alt="" /></Link></li>
                <li><Link to="/nhl"><img src="/ProductsIMGs/assets/icons/nhl-icon.webp" alt="" /></Link></li>
                <li><Link to="/mls"><img src="/ProductsIMGs/assets/icons/mls-icon.png" alt="" /></Link></li>
            </ul>
        </nav>
        </div>
    )
}

export default Header;