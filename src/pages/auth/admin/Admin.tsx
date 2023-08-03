import React, { useEffect, useState } from "react";
import style from "./admin.module.css";
import { Link } from "react-router-dom";
import DiplomadoService from "../../../services/DiplomadoService";
import Swal from "sweetalert2";
import BlogService from "../../../services/BlogService";
const Admin: React.FC = ({
}) => {
    const triggerBoolean = false;
    const [stateDiplomado, setStateDiplomado] = useState([]) // Name it however you wish
    const [stateBlog, setStateBlog] = useState([]) // Name it however you wish

    const [stateBooleanDiplomado, setStateBooleanDiplomado] = useState(triggerBoolean) // Name it however you wish
    function obtenerDiplomas(setStateDiplomado: React.Dispatch<React.SetStateAction<never[]>>) {

        DiplomadoService.obtenerDiplomas().then((response) => {
            console.log(response);
            setStateDiplomado(response.data.sort((a:any,b:any) => a.fecha > b.fecha ? -1 : a.fecha < b.fecha ? 1 : 0));
        }).catch((err) => {
            console.log(err);
        });

    }

    function obtenerBlogs(setStateBlog: React.Dispatch<React.SetStateAction<never[]>>) {

        BlogService.obtenerBlogs().then((response) => {
            setStateBlog(response.data);
        }).catch((err) => {
            console.log(err);
        });

    }

    useEffect(() => {
        obtenerDiplomas(setStateDiplomado);
        obtenerBlogs(setStateBlog);
        setStateBooleanDiplomado(triggerBoolean);
    }, [triggerBoolean]);

    const eliminarDiplomado = (id: any) => {
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar este diplomado?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                DiplomadoService.eliminarDiploma(id).then(() => {
                    obtenerDiplomas(setStateDiplomado);
                    Swal.fire('Correcto!', 'Diplomado eliminado correctamente', 'success')
                }).catch(err => {
                    Swal.fire('Error!', err.error.message, 'error')

                })
            } else if (result.isDenied) {
                Swal.fire('Cancelado!', 'Los cambios han sido cancelados', 'info')
            }
        })
    }

    const eliminarBlog = (id: any) => {
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar este diplomado?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                BlogService.eliminarBlogPorId(id).then(() => {
                    obtenerBlogs(setStateBlog);
                    Swal.fire('Correcto!', 'Articulo eliminado correctamente', 'success')
                }).catch(err => {
                    Swal.fire('Error!', err.error.message, 'error')

                })
            } else if (result.isDenied) {
                Swal.fire('Cancelado!', 'Los cambios han sido cancelados', 'info')
            }
        })
    }

    function handleKeyUp(e: any): void {

        if (e.target.value.length === 0) {
            obtenerDiplomas(setStateDiplomado);
            obtenerBlogs(setStateBlog);

            return;
        }
        if(!stateBooleanDiplomado){
            DiplomadoService.obtenerDiplomasPorTitulo(e.target.value).then((resp) => {
                setStateDiplomado(resp.data);
    
            }, err => {
                console.log(err);
            })
        }else{
            BlogService.obtenerBlogPorTermino(e.target.value).then((resp) => {
                setStateBlog(resp.data);
            }, err => {
                console.log(err);
            })
        }
        
    }

    return (
        <>

                <section className={style.admin_container}>
                    {!stateBooleanDiplomado && <Link to={"/admin/guardar"}><button className={`${style.submitbutton} ${style.btnagregar} ${style.margin}`}>+ Agregar Nuevo Diplomado</button></Link>}
                    {stateBooleanDiplomado && <Link to={"/admin/blog/guardar"}><button className={`${style.submitbutton} ${style.btnagregar} ${style.margin}`}>+ Agregar Contenido Al Blog</button></Link>}
                    {!stateBooleanDiplomado &&
                    <div>
                        <input type="text"
                            onKeyUp={(e) => handleKeyUp(e)}
                            name="nombreUsuario"
                            className={style.field}
                            placeholder="Buscar Diplomados "
                            required />
                    </div>
                  }
                  {stateBooleanDiplomado &&
                    <div>
                        <input type="text"
                            onKeyUp={(e) => handleKeyUp(e)}
                            name="nombreUsuario"
                            className={style.field}
                            placeholder="Buscar Blogs "
                            required />
                    </div>
                  }
                    <article>
                        <button onClick={() => (setStateBooleanDiplomado((bool) => !bool))} className={`${stateBooleanDiplomado ? `${style.submitbutton} ${style.btnagregar} ${style.margin} ${style.selectedbutton}` : `${style.submitbutton} ${style.btnagregar} ${style.margin}`}`}>Diplomados</button>
                        <button onClick={() => (setStateBooleanDiplomado((bool) => !bool))} className={`${!stateBooleanDiplomado ? `${style.submitbutton} ${style.btnagregar} ${style.margin} ${style.selectedbutton}` : `${style.submitbutton} ${style.btnagregar} ${style.margin}`}`}>Blogs</button>
                    </article>
                    <table>


                        {!stateBooleanDiplomado && <><caption>Diplomados</caption>
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
                                {stateDiplomado && stateDiplomado.map((x: any) => (
                                    <>
                                        <tr>

                                            <td data-label="Account">{x.id}</td>
                                            <td data-label="Account">{x.fecha}</td>
                                            <td data-label="Due Date">{x.titulo}</td>
                                            <td data-label="Period" ><Link to={"/admin/editar/diplomado/" + x.id}> <button type="button" className={style.submitbutton}> Editar </button> </Link></td>
                                            <td data-label="Period" > <button type="button" onClick={() => eliminarDiplomado(x.id)} className={style.submitbutton}> Eliminar </button></td>
                                        </tr>

                                    </>
                                ))}


                            </tbody>
                        </>}

                        {stateBooleanDiplomado && <><caption>Blogs</caption>
                            <thead className={style.admin_thead}>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Encabezado</th>
                                    <th scope="col">Sinopsis</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stateBlog && stateBlog.map((x: any) => (
                                    <>
                                        <tr>

                                            <td data-label="blog_id">{x.blog_id}</td>
                                            <td data-label="autor">{x.autor}</td>
                                            <td data-label="Fecha">{x.fecha}</td>
                                            <td data-label="Encabezado">{x.encabezado}</td>
                                            <td data-label="Sinopsis">{x.sinopsis.length > 135 ?
                                                `${x.sinopsis.substring(0, 135)}...` : x.sinopsis
                                            }</td>

                                            <td data-label="Period" ><Link to={"/admin/blog/editar/" + x.blog_id}> <button type="button" className={style.submitbutton}> Editar </button> </Link></td>
                                            <td data-label="Period" > <button type="button" onClick={() => eliminarBlog(x.blog_id)} className={style.submitbutton}> Eliminar </button></td>
                                        </tr>

                                    </>
                                ))}


                            </tbody>
                        </>}

                    </table>

                </section>

        </>
    );
};

export default Admin;


