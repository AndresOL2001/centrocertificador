import React from "react";
import Layout from "../../Layout";
import style from "./ofertaEducativa.module.css";
import DiplomadoCard from "../../components/Cards/Diplomado/DiplomadoCard";

const OfertaEducativa: React.FC = ({
}) => {
    return (
        <>
            <Layout>
                <main>
                    <section>
                        <h1 className={style.title}>DIPLOMADOS</h1>
                    </section>

                    <section className={style.diplomados}>
                        <h2 className={style.month_year}>ABRIL 2023</h2>

                        <article className={style.diplomados_container}>

                            <DiplomadoCard
                                bordeado={true}
                                titulo={"Funcion Policial y Derechos Humanos"}
                                img={"/files/2023-04/FuncionPolicial/Funcion_Policial_Thumbnail.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard
                                bordeado={true}
                                titulo={"Medicina Forense"}
                                img={"/files/2023-04/MedicinaForense/Medicina_Forense_Thumbnail.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard titulo={"Odontologia Forense"}
                                bordeado={true}
                                img={"/files/2023-04/OdontologiaForense/Odontologia_Forense_Thumbnail.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard  bordeado={true}
                            titulo={"Seguridad, Control y Prevención de la Violencia Escolar"}
                                img={"/files/2023-04/SeguridadEscolar/Seguridad_Escolar_Thumbnail.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard bordeado={true} titulo={"Seguridad Patrimonial y Control de Riesgos"}
                                img={"/files/2023-04/SeguridadPatrimonial/Seguridad_Patrimonial_Thumbnail.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                        </article>
                    </section>

                    <section className={style.diplomados}>
                        <h2 className={style.month_year}>MAYO 2023</h2>

                        <article className={style.diplomados_container}>
                            <DiplomadoCard bordeado={true} titulo={"Grafoscopía y Documentos Cuestionados"}
                                img={"/files/2023-05/Grafoscopia/Grafoscopia.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard bordeado={true} titulo={"Justicia Penal para Adolescentes"}
                                img={"/files/2023-05/JusticiaPenalAdolescentes/Justicia_Penal_Adolescentes.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                            <DiplomadoCard bordeado={true} titulo={"Seguridad Nacional y Gestión de Recursos"}
                                img={"/files/2023-05/SeguridadNacional/Seguridad_Nacional.jpg"}
                                refart={"diplomados-2023-04-funcionPolicial"} />

                        </article>
                    </section>
                </main>
            </Layout>
        </>
    );
};

export default OfertaEducativa;
