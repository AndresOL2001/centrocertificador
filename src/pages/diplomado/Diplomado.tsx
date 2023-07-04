import Layout from "../../Layout"
import React, { useEffect, useState } from "react";
import style from "./Diplomado.module.css";
import DiplomadoService from "../../services/DiplomadoService";
import { useParams } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";

let diplomadoFromDb = {
    imagen: '',
    titulo: '',
    proposito: ``,
    objetivo: '',
    dirigido: '',
    fecha: '',
    duracion: '',
    horario: '',
    pago: 0,
    asesor: '',
    inscripcion: 0,
    mensualidades: '',
    whatsapp: '',
    brochure: '',
    unidad: [] as any,
    highlight: [] as any
}

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

const nf = new Intl.NumberFormat();

const Diplomado: React.FC = ({


}) => {
    const params = useParams();

    const [stateDiplomado, setStateDiplomado] = useState(diplomadoFromDb) // Name it however you wish
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        DiplomadoService.obtenerDiplomaPorId(Number(params.id)).then((response) => {
            diplomadoFromDb = response.data;
            let mes = diplomadoFromDb.fecha.split("-")[1]
            let año = diplomadoFromDb.fecha.split("-")[0]
            let dia = diplomadoFromDb.fecha.split("-")[2]
            diplomadoFromDb.fecha = `${dia} de ${meses[mes]} del ${año}`
            setStateDiplomado(diplomadoFromDb);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleDownload = (url: any, filename: any) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res: any) => {
                fileDownload(res.data, filename)
            })
    }

    const handleClick = () => {
        setOpen((prev) => !prev);
      };

    return (
        <>

            <section className={style.flyer_section}>
                <img className={style.flyer_img} src={stateDiplomado.imagen} alt="flyer" />
                <div className={style.flyer_container}>
                    <article className={style.presentacion}>
                        <h1 className={style.diplomado}>{stateDiplomado.titulo}</h1>
                        <br />
                        <p>
                            {stateDiplomado.proposito}
                        </p>
                        <br />
                    </article>

                    <article className={style.presentacion}>
                        <h3>Objetivo</h3>
                        <p>  {stateDiplomado.objetivo}
                        </p>
                        <br />
                    </article>

                    <article className={style.presentacion}>
                        <h3>Dirigído a...</h3>
                        <p> {stateDiplomado.dirigido}
                        </p>
                        <br />
                    </article>

                    <article className={style.infoPagos_container}>
                        <div className={style.infoPagos_card}>
                            <p><span className={style.top_span}>FECHA</span> <br />{stateDiplomado.fecha}</p>
                            <p><span>DURACION</span> <br />{stateDiplomado.duracion}</p>
                            <p><span>CLASES</span> <br /> {stateDiplomado.horario}<br /> (Horario Centro de Mexico)</p>
                            <br />
                        </div>
                        <div className={style.infoPagos_card}>
                            <p><span className={style.top_span}>PAGO UNICO</span> <br /> ${nf.format(stateDiplomado.pago)} MXN</p>
                            <p><span>MENSUALIDADES</span> <br /> {stateDiplomado.mensualidades}</p>
                            <p><span>INSCRIPCION</span> <br /> ${nf.format(stateDiplomado.inscripcion)} MXN</p>
                            <p><span>Asesor(a):</span> {stateDiplomado.asesor}</p>
                            <br />
                        </div>
                    </article>

                    <article className={style.buttons_container}>
                        <a className={style.flyer_buttons}
                            href={stateDiplomado.whatsapp}
                            target="_blank"
                        >
                            <img className={style.contact_img} src="/icons/whats.png" alt="Chat on WhatsApp" /> &nbsp; Contactar con Asesor
                        </a>
                        <button className={`${style.flyer_buttons} ${style.purchase}`}> <i className="fa fa-money-bill"></i> &nbsp; Comprar</button>
                        <a className={style.flyer_buttons} download onClick={() => { handleDownload(stateDiplomado.brochure, 'brochure.pdf') }}>Descargar Brochure &nbsp; <i className="fa fa-download"></i></a>
                    </article>
                </div>
            </section>

            <section className={style.highlights_section}>
                <h2>Highlights del Programa</h2>
                <div className={style.highlights_container}>
                    {stateDiplomado.highlight && stateDiplomado.highlight.map((x: any, i: any) => (
                        <article key={x + i} className={style.highlight}>
                            &bull; {x.nombre}
                        </article>
                    ))}

                </div>
            </section>

            <section className={style.temario_section}>
                <a onClick={() => handleClick()} className={style.dropdown_link}>
                    <h3>Plan de Estudios</h3>
                    {!open && <i className="fa fa-caret-right dropdown_arrow"></i>}
                    {open && <i className="fa fa-caret-down dropdown_arrow"></i>}

                    <input type="checkbox" className={style.dropdown_check} />
                </a>

                <div className={style.dropdown_content}>
                    <ul className={style.temario_dropdown}>
                        {stateDiplomado.unidad && stateDiplomado.unidad.map((x: any, i: any) => (
                            <>
                                <h4 key={x + i}>{x.nombre}</h4>

                                <ul className={style.unidad_sub}>
                                    {x.tema?.map((data: any) => {
                                        return (
                                            <>
                                                <li key={data.id}>{data.nombre}</li>
                                            </>
                                        )

                                    })}

                                </ul>
                            </>
                        ))}



                    </ul>
                </div>
            </section>

            <section className={style.inscripcion_section}>
                <h2>Proceso de Inscripción</h2>
                <br />

                <h4>Titular de la Cuenta:</h4>
                <h3><i>Centro Certificador de Estudios Especializados</i></h3>
                <br />

                <h2>BBVA</h2>
                <br />

                <div className={style.card_cuenta}>
                    <h3>011 948 3675</h3>
                    <p>No. de Cuenta</p>
                </div>
                <br />

                <div className={style.card_cuenta}>
                    <h3>012 540 00119483675 0</h3>
                    <p>CLABE interbancaria</p>
                </div>
                <br />

                <p>Únicamente:</p>
                <ul className={style.list_inscripcion}>
                    <li>Transferencias</li>
                    <li>Depósito en Ventanilla</li>
                    <li>Depósitos en cajero/practicaja</li>
                </ul>
                <br />

                <i>Una vez realizado su pago favor de enviarlo vía Whatsapp a su asesor en turno:</i>
                <ul className={style.list_inscripcion}>
                    <li>Comprobante de pago.</li>
                    <li>Nombre completo.</li>
                    <li>Correo electrónico.</li>
                    <li>Número de Whatsapp.</li>
                    <li>Nombre del curso.</li>
                </ul>
                <br />

                <i className={style.margin_icon}>Una vez inscrito se hará llegar un correo de confirmación donde contendrá la información necesaria para acceder al curso.</i>
            </section>

            </>
    )
}

export default Diplomado;