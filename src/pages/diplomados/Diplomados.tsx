import React, { useEffect, useState } from "react";
import style from "./Diplomados.module.css";
import DiplomadoCard from "../../components/Cards/Diplomados/DiplomadoCard";
import { Link } from "react-router-dom";
import DiplomadoService from "../../services/DiplomadoService";
let meses: any = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre"
}
const Diplomados: React.FC = ({
}) => {

    const [stateDiplomado, setStateDiplomado] = useState([]) // Name it however you wish
    // Group the diplomados by month
    const diplomadosByMonth: Record<string, any[]> = {};
    stateDiplomado.forEach((diplomado: any) => {
        const month = diplomado.fecha.split("-")[1];
        if (!diplomadosByMonth[month]) {
            diplomadosByMonth[month] = [];
        }
        diplomadosByMonth[month].push(diplomado);
    });

    useEffect(() => {
        obtenerDiplomas(setStateDiplomado);
    }, []);

    function obtenerDiplomas(setStateDiplomado: React.Dispatch<React.SetStateAction<never[]>>) {
        DiplomadoService.obtenerDiplomas().then((response) => {
            //console.log(response.data);
            setStateDiplomado(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleKeyUp(e: any): void {
        if (e.target.value.length === 0) {
            obtenerDiplomas(setStateDiplomado);
            return;
        }

        DiplomadoService.obtenerDiplomasPorTitulo(e.target.value).then((resp) => {
            setStateDiplomado(resp.data);

        }, err => {
            console.log(err);
        })
    }

    return (
        <>
            <main>
                <section>
                    <h1 className={style.title}>DIPLOMADOS</h1>
                </section>
                <div>
                    <input type="text"
                        onKeyUp={(e) => handleKeyUp(e)}
                        name="nombreUsuario"
                        className={style.field}
                        placeholder="Buscar Diplomados "
                        required />
                </div>
                {stateDiplomado.length == 0 &&
                    <div className={style.cargando_container}>
                        <span className={style.cargando}>Cargando ... </span>
                        <i className="fa-solid fa-rotate fa-spin fa-2x"></i>
                    </div>
                }
                {Object.entries(diplomadosByMonth).reverse().map(([month, diplomados]) => (
                    <section className={style.diplomados} key={month}>
                        <h2 className={style.month_year}>{meses[month]} {diplomados[0].fecha.split("-")[0]}</h2>
                        <article className={style.diplomados_container}>
                            {diplomados.map((diplomado: any, index: number) => (
                                <Link to={`/diplomados/diplomado/${diplomado.id}`} key={index}>
                                    <DiplomadoCard
                                        bordeado={true}
                                        titulo={`${diplomado.titulo}`}
                                        img={`${diplomado.thumbnail}`}
                                    />
                                </Link>
                            ))}
                        </article>
                    </section>
                ))}

            </main>
        </>
    );
};

export default Diplomados;

