import Layout from "../../../../Layout"
import React, { useState } from "react";
import Swal from "sweetalert2";
import style from "./GuardarBlog.module.css";
import BlogService from "../../../../services/BlogService";
const date = new Date();


const tablaMeses: any = {
    1: 'enero',
    2: 'febrero',
    3: 'marzo',
    4: 'abril',
    5: 'mayo',
    6: 'junio',
    7: 'julio',
    8: 'agosto',
    9: 'septiembre',
    10: 'octubre',
    11: 'noviembre',
    12: 'diciembre'

}


const blog = {
    imagen: '',
    encabezado: '',
    autor: ``,
    fuentes:'',
    sinopsis:'',
    fecha: `${date.getDate()} de ${tablaMeses[date.getMonth() + 1]} del año ${date.getFullYear()}`,
    tituloBlog: [] as any,
    subtituloBlog: [] as any,
    parrafoBlog: [] as any,
    imagenesBlog: [] as any

}

const GuardarBlog: React.FC = ({

}) => {
    const [countTitulo, setCountTitulo] = useState(1) // Name it however you wish
    const [countSubtitulo, setCountSubtitulo] = useState(1) // Name it however you wish
    const [countParrafo, setCountParrafo] = useState(1) // Name it however you wish
    const [countImagenes, setCountImagenes] = useState(1) // Name it however you wish

    const [stateBlog, setStateBlog] = useState(blog) // Name it however you wish
    const [stateFechaActual] = useState(blog.fecha) // Name it however you wish

    function validateSequentialOrder(ordenValues: number[]) {
        const sortedNumbers = ordenValues.sort((a, b) => a - b);
       // console.log(sortedNumbers)
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
                if (c.idSubtitulo === subtituloBlog.idSubtitulo) {

                    c.contenido = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenSubtitulo = (subtituloBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, subtituloBlog: stateBlog.subtituloBlog.map((c: any) => {
                if (c.idSubtitulo === subtituloBlog.idSubtitulo) {

                    c.orden = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
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
                if (c.idTitulo === tituloNuevo.idTitulo) {
                    c.contenido = event.target.value;
                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenTitulo = (tituloBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, tituloBlog: stateBlog.tituloBlog.map((c: any) => {
                if (c.idTitulo === tituloBlog.idTitulo) {

                    c.orden = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };
        setStateBlog(nextDiplomado);
      //  console.log(stateBlog);
    }


    function agregarParrafo(): void {
        setCountParrafo(countParrafo + 1);
        let valorParafo = {
            idParrafo: countParrafo,
            tipo: "parrafo",
            contenido: '',
            orden: 0
        }
        //console.log(stateBlog.parrafoBlog.concat(valorParafo))
        const nextDiplomado = { ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.concat(valorParafo) };

        setStateBlog(nextDiplomado);
    }

    const handleInputParrafo = (parrafoNuevo: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.map((c: any) => {
                if (c.idParrafo === parrafoNuevo.idParrafo) {
                    c.contenido = event.target.value;
                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenParrafo = (parrafoBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, parrafoBlog: stateBlog.parrafoBlog.map((c: any) => {
                if (c.idParrafo === parrafoBlog.idParrafo) {

                    c.orden = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
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
            imagen:null,
            orden: 0
        }
      // console.log(stateBlog.imagenesBlog.concat(valorImagen))
        const nextDiplomado = { ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.concat(valorImagen) };

        setStateBlog(nextDiplomado);
    }

    const handleInputImagenBlog = (imagenNueva: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.map((c: any) => {
                if (c.idImagen === imagenNueva.idImagen) {
                    c.imagen = event.target.files[0];
                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateBlog(nextDiplomado);
    }

    const handleOrdenImagenBlog = (imagenBlog: any, event: any) => {
        const nextDiplomado = {
            ...stateBlog, imagenesBlog: stateBlog.imagenesBlog.map((c: any) => {
                if (c.idImagen === imagenBlog.idImagen) {

                    c.orden = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
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
               autor:stateBlog.autor,
               encabezado:stateBlog.encabezado,
               fecha:stateBlog.fecha,
               sinopsis:stateBlog.sinopsis
            }
            const metadata: any[] =
             [...stateBlog.parrafoBlog, 
                ...stateBlog.tituloBlog, 
                ...stateBlog.subtituloBlog,
                ];

            BlogService.crearContenidoBlog(blog).then((resp) => {
                const metadataBlogCreacionDTO = {
                    metadata:metadata,
                    blog_id:resp.data.blog_id
                }
                BlogService.crearContenidoMetadataBlog(metadataBlogCreacionDTO,stateBlog.imagenesBlog).then(() => {
                    Swal.fire('Listo!',"El contenido de tu blog ha sido agregado correctamente","success");
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })

        } catch (error:any) {
            Swal.fire('Error!',error.message,"error");
        }
    };

    return (
        <>
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
                            <textarea className={style.field} rows={1} name="fecha" onChange={handleInputChange} defaultValue={stateFechaActual}>
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
                                            <input  className={style.field} key={i + 'titulo'} onChange={(event) => handleInputTitulo(x, event)} />
                                            <input key={"blogTitulos" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenTitulo(x, event)} defaultValue={""} />
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

                                            <input key={i + "subtitulos"} className={style.field} onChange={(event) => hangleInputSubtitulo(x, event)} />
                                            <input key={"blogSubtitulos" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenSubtitulo(x, event)} defaultValue={""} />
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

                                            <textarea key={x + "12312"} className={style.field} onChange={(event) => handleInputParrafo(x, event)} defaultValue={""} />
                                            <input key={"parangaricutimiricuaroi" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenParrafo(x, event)} defaultValue={""} />
                                        </article>

                                    </>
                                ))}
                            </div>

                            <h2>Imagen</h2>

                            <button type="button" className={style.opcionesbutton} onClick={() => agregarImagenBlog()}>Generar</button>
                            <div className={style.highlights_container}>
                                {stateBlog.imagenesBlog && stateBlog.imagenesBlog.map((x: any, i: any) => (
                                    <>
                                        <article className={style.buttons_container}>
                                            <input name="imagen" className={style.field} multiple accept="image/*" type="file" onChange={(event) => handleInputImagenBlog(x, event)} />
                                            <input key={"parangaricutimiricuaroi" + i} type="number" placeholder="orden" min={0} className={style.field} onChange={(event) => handleOrdenImagenBlog(x, event)} defaultValue={""} />

                                        </article>
                                    </>
                                ))}
                            </div>

                        </article>
                    </div>
                </section>


                <button type="submit" style={{ marginBottom: '20px' }} className={style.submitbutton}>Guardar Diploma </button>

            </form>
            </>
                )
}

export default GuardarBlog;

