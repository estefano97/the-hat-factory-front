import styles from "../styles/Footer.module.css";

const Footer = () => {
    return(
        <div className={styles.footerContainer}>
            <div className={styles.socialMedia}>
                <a target="_blank" href="https://www.instagram.com/thehatfactoryby4/" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/thehatfactoryby4-111933696905469" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                <a href="https://wa.me/message/OYAUI5L3Q23VG1" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
            </div>
            <div className={styles.contentContainer}>
                <hr />
                <p>Productos <b>100%</b> originales con garantía de calidad</p>
                <hr />
            </div>
            <div className={styles.copyrightContainer}>
                <p><b>©</b> The Hat Factory 2021. Todos los derechos reservados</p>
            </div>
        </div>
    )
}

export default Footer;