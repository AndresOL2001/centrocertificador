import React, { useEffect, useState } from "react";
import style from "./admin.module.css";
import Layout from "../../../Layout";
import { Link } from "react-router-dom";
import DiplomadoService from "../../../services/DiplomadoService";
const Admin: React.FC = ({
}) => {
    const [stateDiplomado, setStateDiplomado] = useState([]) // Name it however you wish

    useEffect(() => {
        DiplomadoService.obtenerDiplomas().then((response) => {
            setStateDiplomado(response.data);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <>
            <Layout>

                <section className={style.admin_container}>
                    <Link to={"/admin/guardar"}><button className={`${style.submitbutton} ${style.btnagregar}`}>+ Agregar Nuevo Diplomado</button></Link>

                    <table>
                        <caption>Diplomados</caption>
                        <thead className={style.admin_thead}>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Més</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stateDiplomado && stateDiplomado.map((x: any, i: any) => (
                                <>
                                    <tr>

                                        <td data-label="Account">{x.id}</td>
                                        <td data-label="Account">{x.fecha}</td>
                                        <td data-label="Due Date">{x.titulo}</td>
                                        <td data-label="Period" ><Link to={"/admin/editar/diplomado/" + x.id}> <button type="button" className={style.submitbutton}> Editar </button> </Link></td>
                                        <td data-label="Period" > <button type="button" className={style.submitbutton}> Eliminar </button></td>
                                    </tr>

                                </>
                            ))}


                        </tbody>
                    </table>
                </section>

            </Layout>
        </>
    );
};

export default Admin;