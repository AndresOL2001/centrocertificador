import React from "react";
import style from "./DiplomadoCard.module.css";

interface IDiplomadoCard {
    titulo: string,
    parrafo?: string,
    img: string,
    bordeado?: boolean,
}


const DiplomadoCard: React.FC<IDiplomadoCard> = ({
    titulo,
    parrafo,
    img,
    bordeado
}) => {
    return (
        <>
            <a className={(bordeado == true) ? `${style.bordercard}` : `` + `${style.diplomado_card} `}>
                <img
                    className={`${style.flyer_img}`}
                    src={img}
                    alt="flyer-funcionPolicial"
                />
                <h3>{titulo}</h3>
                {!parrafo && <>
                    <br/>
                </>}
                <p>
                    {parrafo}
                </p>
                <i></i>
            </a>
        </>
    )
}

export default DiplomadoCard;