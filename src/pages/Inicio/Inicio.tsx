import React, { useEffect, useState } from "react";
import style from "./Inicio.module.css";
import Layout from "../../Layout";
import DiplomadoCard from "../../components/Cards/Diplomados/DiplomadoCard";
import { Link } from "react-router-dom";
import DiplomadoService from "../../services/DiplomadoService";
const Inicio: React.FC = ({
    
}) => {
    const [stateDiplomado, setStateDiplomado] = useState([]) // Name it however you wish
    useEffect(() => {
        DiplomadoService.obtenerDiplomas().then((response) => {
            setStateDiplomado(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <>
                <main>
                    <section className={style.welcome}>
                        <img src="/centro.jpg" alt="sitio-en-desarrollo"/>
                        <i className="back-color">  </i>
                        <h1><i className="fa fa-user-graduate"></i>&nbsp; Centro Certificador de Estudios Especializados</h1>
                        <h2><i className="fa fa-book"></i> &nbsp; "Aquí inicia tu viaje."</h2>
                    </section>

                    <section className={style.diplomados}>
                        <h2 className={style.recientes}>Diplomados Recientes</h2>

                        <article className={style.diplomados_container}>
                            {stateDiplomado && stateDiplomado.map((diplomado:any) => (
                                <Link key={"link "+diplomado.id} to={"/diplomados/diplomado/"+diplomado.id}>
                                 <DiplomadoCard key={diplomado.id} titulo={diplomado.titulo}
                                 parrafo={diplomado.objetivo}
                                 img={diplomado.thumbnail} />
                                 </Link>
                            ))}

                        </article>

                        <Link className={style.btnmostrar} to="/diplomados" id="validez">Mostrar Todos</Link>
                    </section>

                    <section className={style.validez}>
                        <h2>¿Quién nos Certifica?</h2>

                        <article className={style.validez_container}>
                            <div className={style.validez_card}>
                                <img src="/sict.jpg" alt="Secretaria de Innovacion, Ciencia y Tecnologia" />

                                <p>
                                    <b> Registro ante la Dirección General de Incorporación y Servicios Escolares (DGISE) de la
                                        Secretaría de Innovación, Ciencia y Tecnología del Estado de Jalisco (SICyT),</b>
                                    los cuales estarán orientados fundamentalmente a desarrollar y actualizar habilidades, conocimientos
                                    y destrezas relativas a una actividad profesional específica en áreas de tecnología, innovación y
                                    ciencias preferentemente que proporcionan a los participantes conocimientos particulares que les
                                    permitan enriquecer su formación académica, su experiencia de trabajo o su cultura general, respondiendo
                                    a los requerimientos y demandas de educación.
                                </p>
                            </div>

                            <div className={style.validez_card}>
                                <img src="/convenio.png" alt="Convenio de la Haya" />

                                <p>
                                    <b> Validez internacional por medio del Apostillamiento con <a className={style.convenio}>convenio de la Haya.</a></b>
                                    <br />
                                    La legalización es necesaria para verificar la existencia de la institución y de los estudios o los programas
                                    académicos que aparezcan en el certificado. El trámite de apostilla consiste en colocar sobre un documento
                                    público, o una prolongación del mismo, una Apostilla o anotación que certificará la autenticidad de la firma
                                    de los documentos públicos expedidos en un país firmante del XII Convenio de La Haya, de 5 de octubre de 1961,
                                    por el que se suprime la exigencia de Legalización de los Documentos Públicos Extranjeros que deban surtir
                                    efectos en otro país firmante del mismo.
                                </p>
                            </div>
                        </article>
                    </section>

                    <section className={style.contact}>
                        <h3>CONTÁCTANOS</h3>

                        <form id="contact-form" action="https://formsubmit.co/4ad8a40c3ff9538c9c8fee68534e3d9d" className={style.contactform} method="POST">
                            <input type="text"
                                name="Nombre"
                                className={style.field}
                                placeholder="Nombre"
                                required />

                            <input type="email"
                                name="Email"
                                className={style.field}
                                placeholder="Correo Electrónico"
                                required />

                            <input type="tel"
                                name="Telefono"
                                className={style.field}
                                placeholder="Telefono"
                                pattern="[0-9]+"
                                required />

                            <input type="text"
                                name="Asunto"
                                className={style.field}
                                placeholder="Asunto"
                                required />

                            <textarea
                                name="Mensaje"
                                className={style.field}
                                placeholder="¿Cómo podemos ayudarte?"
                                rows={6}
                                required
                            ></textarea>

                            <button type="submit" id="submit" className={style.submitbutton}>
                                Enviar Correo
                            </button>

                            <input type="hidden" name="_replyto" />
                            <input type="hidden" name="_next" value="https://centrocertificador.mx/" />
                        </form>
                    </section>
                </main>
        </>
    );
};

export default Inicio;
