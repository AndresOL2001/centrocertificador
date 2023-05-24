import React from "react";
import style from "./DiplomadoCard.module.css";

interface IDiplomadoCard{
    titulo:string,
    parrafo?:string,
    img:string,
    refart:string
    bordeado?:boolean
}

const DiplomadoCard: React.FC<IDiplomadoCard> = ({
    titulo,
    parrafo,
    img,
    refart,
    bordeado
}) => {
    return (
        <>
            <a className={(bordeado == true ) ? `${style.bordercard}` : `` + `${style.diplomado_card} `} href={refart}>
                <img className={style.flyer_img} src={img} alt="flyer-funcionPolicial" />
                <h3>{titulo}</h3>
                <p>
                    {parrafo}
                </p>
                <i></i>
            </a>
        </>
    )
}

export default DiplomadoCard;