import Layout from "../../Layout"
import React, { useEffect, useState } from "react";
import style from "./Diplomado.module.css";
import DiplomadoService from "../../services/DiplomadoService";

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
    unidad: [] as any,
    highlight: [] as any
}
const nf = new Intl.NumberFormat();

const Diplomado: React.FC = ({


}) => {

    const [stateDiplomado, setStateDiplomado] = useState(diplomadoFromDb) // Name it however you wish

    useEffect(() => {
        DiplomadoService.obtenerDiplomaPorId(1).then((response) => {
            diplomadoFromDb = response.data;
            console.log(diplomadoFromDb);
            setStateDiplomado(diplomadoFromDb);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <Layout>
            <section className={style.flyer_section}>
                <img className={style.flyer_img} src="/files/2023-04/FuncionPolicial/Funcion_Policial.jpg" alt="flyer" loading="lazy" />
                <div className={style.flyer_container}>
                    <article className={style.presentacion}>
                        <h1 className={style.diplomado}>{stateDiplomado.titulo}</h1>
                        <br />
                        <p>
                            {stateDiplomado.proposito}
                        </p>
                    </article>

                    <article className={style.presentacion}>
                        <h3>Objetivo</h3>
                        <p>  {stateDiplomado.objetivo}
                        </p>
                    </article>

                    <article className={style.presentacion}>
                        <h3>Dirigído a...</h3>
                        <p> {stateDiplomado.dirigido}
                        </p>
                    </article>

                    <article className={style.infoPagos_container}>
                        <div className={style.infoPagos_card}>
                            <p><span className={style.top_span}>FECHA</span> <br />{stateDiplomado.fecha}</p>
                            <p><span>DURACION</span> <br />{stateDiplomado.duracion}</p>
                            <p><span>CLASES</span> <br /> {stateDiplomado.horario}<br /> (Horario Centro de Mexico)</p>
                        </div>
                        <div className={style.infoPagos_card}>
                            <p><span className={style.top_span}>PAGO UNICO</span> <br /> ${nf.format(stateDiplomado.pago)} MXN</p>
                            <p><span>MENSUALIDADES</span> <br /> {stateDiplomado.mensualidades}</p>
                            <p><span>INSCRIPCION</span> <br /> ${nf.format(stateDiplomado.inscripcion)} MXN</p>
                            <p><span>Asesor(a):</span> {stateDiplomado.asesor}</p>
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
                        <a className={style.flyer_buttons} download href="/files/2023-04/FuncionPolicial/Funcion Policial Abril.pdf">Descargar Brochure &nbsp; <i className="fa fa-download"></i></a>
                    </article>
                </div>
            </section>

            <section className={style.highlights_section}>
                <h2>Highlights del Programa</h2>
                <div className={style.highlights_container}>
                    {stateDiplomado.highlight && stateDiplomado.highlight.map((x:any,i:any) => (
                        <article key={x + i} className={style.highlight}>
                            &bull; {x.nombre}
                        </article>
                    ))}

                </div>
            </section>

            <section className={style.temario_section}>
                <a href="#" className={style.dropdown_link}>
                    <h3>Plan de Estudios</h3><i className="fa fa-caret-right dropdown_arrow"></i><input type="checkbox" className={style.dropdown_check} />
                </a>

                <div className={style.dropdown_content}>
                    <ul className={style.temario_dropdown}>
                        {stateDiplomado.unidad && stateDiplomado.unidad.map((x: any,i:any) => (
                            <>
                                <h4 key={x + i}>{x.nombre}</h4>

                                <ul className={style.unidad_sub}>
                                    {x.tema?.map((data: any,i:any) => {
                                        return(
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

        </Layout>
    )
}

export default Diplomado;