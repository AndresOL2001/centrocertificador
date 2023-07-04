import Layout from "../../../../Layout"
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import style from "./EditarBlog.module.css";
import BlogService from "../../../../services/BlogService";
import { useParams } from "react-router-dom";

const blog = {
    imagen: '',
    encabezado: '',
    autor: ``,
    fuentes: '',
    sinopsis: '',
    fecha: ``,
    tituloBlog: [] as any,
    subtituloBlog: [] as any,
    parrafoBlog: [] as any,
    imagenesBlog: [] as any

}

const EditarBlog: React.FC = ({

}) => {
    const params = useParams();
    const [countTitulo, setCountTitulo] = useState(1) // Name it however you wish
    const [countSubtitulo, setCountSubtitulo] = useState(1) // Name it however you wish
    const [countParrafo, setCountParrafo] = useState(1) // Name it however you wish
    const [countImagenes, setCountImagenes] = useState(1) // Name it however you wish

    const [stateBlog, setStateBlog] = useState(blog) // Name it however you wish

    function obtenerBlogPorId(params: any, setStateBlog: React.Dispatch<React.SetStateAction<{ imagen: string; encabezado: string; autor: string; fuentes: string; sinopsis: string; fecha: string; tituloBlog: any; subtituloBlog: any; parrafoBlog: any; imagenesBlog: any; }>>) {
        BlogService.obtenerBlogPorId(Number(params.id))
        .then((response) => {
            setStateBlog(response.data);
            obtenerMetadataPorBlogId(params, setStateBlog);
        }).catch((err) => {
            console.log(err);
        });
    }
    function obtenerMetadataPorBlogId(params: any, setStateBlog: React.Dispatch<React.SetStateAction<{ imagen: string; encabezado: string; autor: string; fuentes: string; sinopsis: string; fecha: string; tituloBlog: any; subtituloBlog: any; parrafoBlog: any; imagenesBlog: any; }>>) {
        BlogService.obtenerMetadataPorBlogId(Number(params.id)).then((response) => {
            const filteredImageData = response.data.filter((item: any) => item.tipo === 'imagen');
            const filteredParrafoData = response.data.filter((item: any) => item.tipo === 'parrafo');
            const filteredTituloData = response.data.filter((item: any) => item.tipo === 'titulo');
            const filteredSubtituloData = response.data.filter((item: any) => item.tipo === 'subtitulo');
            setStateBlog(prevState => ({
                ...prevState,
                imagenesBlog: filteredImageData,
                parrafoBlog: filteredParrafoData,
                tituloBlog: filteredTituloData,
                subtituloBlog: filteredSubtituloData
            }));
            //console.log(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        obtenerBlogPorId(params, setStateBlog);
    }, []);


    function validateSequentialOrder(ordenValues: number[]) {
        const sortedNumbers = ordenValues.sort((a, b) => a - b);
        //console.log(sortedNumbers)
        for (let i = 1; i < sortedNumbers.length; i++) {
            if (sortedNumbers[i] !== sortedNumbers[i - 1] + 1) {
                throw new Error('El orden de los componentes de tu blog no tienen un orden secuencial, favor de verificar e intentar de nuevo.');
            }
        }
    }


    function agregarSubtitulo(): void {
        setCountSubtitulo(countSubtitulo + 1);
        let valorSubtitulo = {
            idSubtitulo: countSubtitulo,
            tipo: 'subtitulo',
            orden: 0,
            contenido: ''
        }
        const nextPerson = { ...stateBlog, subtituloBlog: stateBlog.subtituloBlog.concat(valorSubtitulo) };

        setStateBlog(nextPerson);
        //console.log(stateBlog);
    }

    const hangleInputSubtitulo = (subtituloBlog: any, event: any) => {

        const nextDiplomado = {
            ...stateBlog, subtituloBlog: stateBlog.subtituloBlog.map((c: any) => {
                if ((c.idSubtitulo != null && c.idSubtitulo === subtituloBlog.idSubtitulo) ||
                (c.metadata_id != null && c.metadata_id === subtituloBlog.metadata_id)) {
                c.contenido = event.target.value;
            }
            return c;
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenSubtitulo = (subtituloBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, subtituloBlog: stateBlog.subtituloBlog.map((c: any) => {
                if ((c.idSubtitulo != null && c.idSubtitulo === subtituloBlog.idSubtitulo) ||
                (c.metadata_id != null && c.metadata_id === subtituloBlog.metadata_id)) {
                c.orden = event.target.value;
            }
            return c;
            })
        };
        setStateBlog(nextDiplomado);
    }

    function agregarTitulo(): void {
        setCountTitulo(countTitulo + 1);
        let valorTitulo = {
            idTitulo: countTitulo,
            tipo: "titulo",
            orden: 0,
            contenido: ''
        }
        //console.log(stateBlog.tituloBlog.concat(valorTitulo))
        const nextDiplomado = { ...stateBlog, tituloBlog: stateBlog.tituloBlog.concat(valorTitulo) };

        setStateBlog(nextDiplomado);
        //console.log(stateBlog);
    }

    const handleInputTitulo = (tituloNuevo: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, tituloBlog: stateBlog.tituloBlog.map((c: any) => {
                if ((c.idTitulo != null && c.idTitulo === tituloNuevo.idTitulo) ||
                (c.metadata_id != null && c.metadata_id === tituloNuevo.metadata_id)) {
                c.contenido = event.target.value;
            }
            return c;
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenTitulo = (tituloBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, tituloBlog: stateBlog.tituloBlog.map((c: any) => {
                if ((c.idTitulo != null && c.idTitulo === tituloBlog.idTitulo) ||
                (c.metadata_id != null && c.metadata_id === tituloBlog.metadata_id)) {
                c.orden = event.target.value;
            }
            return c;
            })
        };
        setStateBlog(nextDiplomado);
       // console.log(stateBlog);
    }


    function agregarParrafo(): void {
        setCountParrafo(countParrafo + 1);
        let valorParafo = {
            idParrafo: countParrafo,
            tipo: "parrafo",
            contenido: '',
            orden: 0
        }
       // console.log(stateBlog.parrafoBlog.concat(valorParafo))
        const nextDiplomado = { ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.concat(valorParafo) };

        setStateBlog(nextDiplomado);
    }

    const handleInputParrafo = (parrafoNuevo: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.map((c: any) => {
                if ((c.idParrafo != null && c.idParrafo === parrafoNuevo.idParrafo) ||
                (c.metadata_id != null && c.metadata_id === parrafoNuevo.metadata_id)) {
                c.contenido = event.target.value;
            }
            return c;
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenParrafo = (parrafoBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.map((c: any) => {

                if ((c.idParrafo != null && c.idParrafo === parrafoBlog.idParrafo) ||
                (c.metadata_id != null && c.metadata_id === parrafoBlog.metadata_id)) {
                c.orden = event.target.value;
            }
            return c;

            })
        };
        setStateBlog(nextDiplomado);
       // console.log(stateBlog);
    }

    function agregarImagenBlog(): void {

        setCountImagenes(countImagenes + 1);
        let valorImagen = {
            idImagen: countImagenes,
            tipo: "imagen",
            contenido: '',
            imagen: null,
            orden: 0
        }
        //console.log(stateBlog.imagenesBlog.concat(valorImagen))
        const nextDiplomado = { ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.concat(valorImagen) };

        setStateBlog(nextDiplomado);
    }

    const handleInputImagenBlog = (imagenNueva: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.map((c: any) => {
                if ((c.idImagen != null && c.idImagen === imagenNueva.idImagen) ||
                    (c.metadata_id != null && c.metadata_id === imagenNueva.metadata_id)) {
                    c.imagen = event.target.files[0];
                }
                return c;
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenImagenBlog = (imagenBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.map((c: any) => {

                if ((c.idImagen != null && c.idImagen === imagenBlog.idImagen) ||
                    (c.metadata_id != null && c.metadata_id === imagenBlog.metadata_id)) {
                    c.orden = event.target.value;
                }
                return c;

            })
        };
        setStateBlog(nextDiplomado);
        //console.log(stateBlog);
    }



    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setStateBlog((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };



    const handleSubmit = (event: any) => {
        event.preventDefault();
        //console.log(stateBlog);
        const ordenValues = [
            ...stateBlog.tituloBlog.map((item: any) => Number(item.orden)),
            ...stateBlog.subtituloBlog.map((item: any) => Number(item.orden)),
            ...stateBlog.parrafoBlog.map((item: any) => Number(item.orden)),
            ...stateBlog.imagenesBlog.map((item: any) => Number(item.orden)),
        ];
        // Step 2: Validate if the numbers are in sequential order
        try {
            validateSequentialOrder(ordenValues);
            const blog = {
                autor: stateBlog.autor,
                encabezado: stateBlog.encabezado,
                fecha: stateBlog.fecha,
                sinopsis: stateBlog.sinopsis
            }
            const metadata: any[] =
                [...stateBlog.parrafoBlog,
                ...stateBlog.tituloBlog,
                ...stateBlog.subtituloBlog,
                ];
                Swal.showLoading();

            BlogService.editarBlogPorId(blog, Number(params.id)).then((resp) => {
                const metadataBlogCreacionDTO = {
                    metadata: metadata,
                    blog_id: resp.data.blog_id
                }
                BlogService.editarContenidoMetadataPorBlogId(metadataBlogCreacionDTO, stateBlog.imagenesBlog).then(() => {
                    Swal.fire('Listo!', "El contenido de tu blog ha sido agregado correctamente", "success");
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })

        } catch (error: any) {
            Swal.fire('Error!', error.message, "error");
        }
    };

    function eliminarItemFromBlog(section: string, itemToRemove: any): void {
        setStateBlog((prevBlog:any) => ({
            ...prevBlog,
            [section]: prevBlog[section].filter((item: any) => item !== itemToRemove)
        }));
    }


    return (
        <Layout>
            <form className={style.form} onSubmit={handleSubmit}>
                <section className={style.flyer_section}>
                    <div className={style.flyer_container}>
                        <article className={style.presentacion}>
                            <h1 className={style.diplomado}>Encabezado</h1>
                            <input type="text" name="encabezado" onChange={handleInputChange} className={style.field} defaultValue={stateBlog.encabezado} />
                            <br />
                            <h1 className={style.diplomado}>Autor</h1>
                            <input type="text" name="autor" onChange={handleInputChange} className={style.field} defaultValue={stateBlog.autor} />
                        </article>
                        <article className={style.presentacion}>
                            <h1 className={style.diplomado}>Fecha</h1>
                            <textarea className={style.field} rows={1} name="fecha" onChange={handleInputChange} defaultValue={stateBlog.fecha}>
                            </textarea>
                            <h1 className={style.diplomado}>Sinopsis</h1>
                            <textarea className={style.field} rows={4} name="sinopsis" onChange={handleInputChange} defaultValue={stateBlog.sinopsis}>
                            </textarea>
                        </article>

                        <article className={style.presentacion}>
                            <h1 className={style.diplomado}>Configura el contenido del blog</h1>
                            <h4 className={style.presentacion}>El orden de los componentes define el orden de aparición en el blog con el fin de que puedan tener diseños dinamicos por lo que el orden tiene que ser secuencial de menor a mayor , no se puede tener un componente con el mismo orden</h4>
                        </article>
                    </div>
                </section>

                <section className={style.flyer_section}>
                    <div className={style.flyer_container}>
                        <article className={style.presentacion}>
                            <h2>Titulo</h2>
                            <div>
                                <button type="button" className={style.opcionesbutton} style={{ marginBottom: '20px' }} onClick={() => agregarTitulo()}>Generar</button>
                                {stateBlog.tituloBlog && stateBlog.tituloBlog.map((x: any, i: any) => (
                                    <>
                                        <article className={style.buttons_container}>
                                            <input className={style.field} key={i + 'titulo'} onChange={(event) => handleInputTitulo(x, event)} value={x.contenido} />
                                            <input key={"blogTitulos" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenTitulo(x, event)} value={x.orden} />
                                            <i  key={"iconTitulo" + i} onClick={() => eliminarItemFromBlog('tituloBlog',x)} className={`fas fa-times ${style.iconclose}`}></i>

                                        </article>
                                    </>
                                ))}
                            </div>

                            <h2>Subtitulo</h2>

                            <button type="button" className={style.opcionesbutton} onClick={() => agregarSubtitulo()}>Generar</button>
                            <div className={style.highlights_container}>
                                {stateBlog.subtituloBlog && stateBlog.subtituloBlog.map((x: any, i: any) => (
                                    <>
                                        <article className={style.buttons_container}>

                                            <input key={i + "subtitulos"} className={style.field} onChange={(event) => hangleInputSubtitulo(x, event)} value={x.contenido} />
                                            <input key={"blogSubtitulos" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenSubtitulo(x, event)} value={x.orden} />
                                            <i key={"iconSubtitulo" + i}onClick={() => eliminarItemFromBlog('subtituloBlog',x)} className={`fas fa-times ${style.iconclose}`}></i>

                                        </article>

                                    </>
                                ))}
                            </div>

                            <h2>Parrafo</h2>

                            <button type="button" className={style.opcionesbutton} onClick={() => agregarParrafo()}>Generar</button>
                            <div className={style.highlights_container}>
                                {stateBlog.parrafoBlog && stateBlog.parrafoBlog.map((x: any, i: any) => (
                                    <>
                                        <article className={style.buttons_container}>

                                            <textarea key={x + "12312"} className={style.field} rows={4} onChange={(event) => handleInputParrafo(x, event)} value={x.contenido} />
                                            <input key={"parangaricutimiricuaroi" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenParrafo(x, event)} value={x.orden} />
                                            <i key={"iconParrafo" + i}onClick={() => eliminarItemFromBlog('parrafoBlog',x)} className={`fas fa-times ${style.iconclose}`}></i>
                                        </article>

                                    </>
                                ))}
                            </div>

                            <h2>Imagen</h2>

                            <button type="button" className={style.opcionesbutton} onClick={() => agregarImagenBlog()}>Generar</button>
                            <div className={style.highlights_container}>
                                {stateBlog.imagenesBlog && stateBlog.imagenesBlog.map((x: any, i: any) => (
                                    <>
                                        <article key={"article"+x} className={style.buttons_container}>
                                            {(x.contenido.length> 0 && !(x.contenido instanceof File)) && <img key={"imagen"+x + i} className={style.imagenPrev} src={x.contenido} />}
                                            {(x.contenido.length == 0 || x.contenido instanceof File) && <input key={"inputImagen"+x + i} name="imagen" className={style.field} multiple accept="image/*" type="file" onChange={(event) => handleInputImagenBlog(x, event)} />}
                                            <input key={"parangaricutimiricuaroi" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenImagenBlog(x, event)} value={x.orden} />
                                            <i key={"imagenIcono"+x} onClick={() => eliminarItemFromBlog('imagenesBlog',x)} className={`fas fa-times ${style.iconclose}`}></i>

                                        </article>
                                    </>
                                ))}
                            </div>

                        </article>
                    </div>
                </section>


                <button type="submit" style={{ marginBottom: '20px' }} className={style.submitbutton}>Guardar Diploma </button>

            </form>
        </Layout>
    )
}

export default EditarBlog;



