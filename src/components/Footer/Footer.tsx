import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
const Footer: React.FC = ({

}) => {
    return (
        <>
           <footer>
        <ul className={style.social_links}>
            <li><a className="fa-brands fa-whatsapp" href="https://wa.me/527341890671" target="_blank"></a></li>
            <li><a className="fa-brands fa-facebook" href="https://www.facebook.com/CentroCertificadorDeEstudiosEspecializados/" target="_blank"></a></li>
            <li><a className="fa-brands fa-instagram" href="https://www.instagram.com/centro_certificador/" target="_blank"></a></li>
            <li><a className="fa-brands fa-tiktok" href="https://www.tiktok.com/@centrocertificador?lang=es" target="_blank"></a></li>
            <li><a className="fa-brands fa-linkedin" href="https://www.linkedin.com/company/centro-certificador-de-estudios-especializados/" target="_blank"></a></li>
        </ul>

        <ul className={style.terms_links}>
            <li><Link to={"/blog"}>Política de Privacidad</Link></li>
            <li><Link to={"/blog"}>Términos y condiciones</Link></li>
        </ul>

        <p className={style.copyright}>
            &copy;2023 Centro Certificador de Estudios Especializados
        </p>
    </footer>
        </>
    );
};

export default Footer;
