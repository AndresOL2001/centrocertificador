import React, { useEffect, useState } from "react";
import style from "./Editar.module.css";
import DiplomadoService from "../../../../services/DiplomadoService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const diplomado = {
    imagen: '',
    brochure: '',
    titulo: '',
    proposito: ``,
    objetivo: '',
    dirigido: '',
    fecha: '',
    duracion: '',
    horario: '',
    pago: '',
    asesor: '',
    inscripcion: '',
    certificacion:'',
    apartado:'',
    mensualidades: '',
    whatsapp: '',
    thumbnail: '',
    unidad: [] as any,
    highlight: [] as any
}

const Editar: React.FC = ({

}) => {
    const params = useParams();
    const [countHighlight, setCountHighlight] = useState(1) // Name it however you wish
    const [countUnidad, setCountUnidad] = useState(1) // Name it however you wish
    const [stateDiplomado, setStateDiplomado] = useState(diplomado) // Name it however you wish
    const [stateImagen, setStateImagen] = useState() // Name it however you wish
    const [stateBrochure, setStateBrochure] = useState() // Name it however you wish
    const [stateThumbnail, setStateThumbnail] = useState() // Name it however you wish

    useEffect(() => {
        DiplomadoService.obtenerDiplomaPorId(Number(params.id)).then((response) => {
            console.log(response.data)
            setStateDiplomado(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function agregarUnidad(): void {
        setCountUnidad(countUnidad + 1);
        let valorUnidad = {
            id: countUnidad,
            nombre: "unidad ",
            nuevo: true,
            tema: []
        }
        const nextPerson = { ...stateDiplomado, unidad: stateDiplomado.unidad.concat(valorUnidad) };

        setStateDiplomado(nextPerson);
        console.log(stateDiplomado);
    }

    function agregarHighlight(): void {
        setCountHighlight(countHighlight + 1);
        let valorHighlight = {
            id: countHighlight,
            nuevo: true,
            nombre: "test",
        }
        console.log(stateDiplomado.highlight.concat(valorHighlight))
        const nextDiplomado = { ...stateDiplomado, highlight: stateDiplomado.highlight.concat(valorHighlight) };

        setStateDiplomado(nextDiplomado);
        console.log(stateDiplomado);
    }

    const handleInputHighlight = (higlightNew: any, event: any) => {
        const nextDiplomado = {
            ...stateDiplomado, highlight: stateDiplomado.highlight.map((c: any) => {
                if (c.id === higlightNew.id) {
                    c.nombre = event.target.value;
                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateDiplomado(nextDiplomado);
    }
    const handleFileUpload = (event: any, fileType: string) => {
        const url = URL.createObjectURL(event.target.files[0]);
        if (fileType === "brochure") {
            const updatedState = { ...stateDiplomado, brochure: url }
            setStateDiplomado(updatedState);

        }

        if (fileType === "imagen") {
            const updatedState = { ...stateDiplomado, imagen: url };
            setStateDiplomado(updatedState);
        }

        if (fileType === "thumbnail") {
            const updatedState = { ...stateDiplomado, thumbnail: url };
            setStateDiplomado(updatedState);
        }


        if (fileType === "brochure") {
            setStateBrochure(event.target.files[0]);
        }
        if (fileType === "imagen") {
            setStateImagen(event.target.files[0]);
        }
        if (fileType === "thumbnail") {
            setStateThumbnail(event.target.files[0]);
        }
    };

    function agregarTemaUnidad(unidad: any): void {
        console.log(unidad)
        const nextPerson = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.id === unidad.id) {
                    // Increment the clicked counter
                    let tema = {
                        id: c.tema.length + 1,
                        nuevo: true,
                        nombre: ""
                    }
                    c.tema.push(tema)
                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateDiplomado(nextPerson);
    }



    const hangleInputTema = (unidad: any, tema: any, event: any) => {

        const nextDiplomado = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.id === unidad.id) {

                    c.tema.map((t: any) => {
                        if (t.id == tema.id) {
                            t.nombre = event.target.value;
                        }
                    })

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateDiplomado(nextDiplomado);
    }

    const hangleInputUnidad = (unidad: any, event: any) => {
        console.log(unidad);
        const nextDiplomado = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.id === unidad.id) {
                    console.log("this")
                    c.nombre = event.target.value;

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateDiplomado(nextDiplomado);
    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
       /*  console.log(value);
        console.log(name); */
        setStateDiplomado((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };



    const handleSubmit = (event: any) => {
        event.preventDefault();
        Swal.showLoading();
        console.log(stateDiplomado)
        DiplomadoService.editarDiploma(stateDiplomado, Number(params.id)).then(() => {
            DiplomadoService.guardarArchivos(Number(params.id), stateImagen, stateBrochure, stateThumbnail).then(() => {
              Swal.fire('Listo!','Diploma editado correctamente','success');
            })
        }).catch((err) => {
            console.log(err)
        })
    };

    function eliminarItemFromDiplomado(section: string, itemToRemove: any): void {
        setStateDiplomado((prevDiplomado:any) => ({
            ...prevDiplomado,
            [section]: prevDiplomado[section].filter((item: any) => item !== itemToRemove)
        }));
    }
    function eliminarTemaFromUnidadDiplomado(unidad:any,itemToRemove: any,):void{
/*         console.log(unidad);
 */        const nextDiplomado = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c === unidad) {

                    c.tema = c.tema.filter((x:any) => x !== itemToRemove)

                    return c;
                } else {
                    // The rest haven't changed
                    return c;
                }
            })
        };

        setStateDiplomado(nextDiplomado);
    }

    return (
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <section className={style.flyer_section}>
                    {/*  { file && <img className={style.flyer_img} src={file}/>} */}
                    {<img className={style.flyer_img} src={stateDiplomado.imagen} alt="flyer" />}
                    <div className={style.flyer_container}>
                        <article className={style.presentacion}>
                            <h1 className={style.diplomado}>Titulo</h1>
                            <input type="text" name="titulo" onChange={handleInputChange} className={style.field} value={stateDiplomado.titulo} />
                            <br />
                            <h1 className={style.diplomado}>Proposito</h1>
                            <textarea className={style.field} rows={9} name="proposito" onChange={handleInputChange} value={stateDiplomado.proposito}>

                            </textarea>
                        </article>

                        <article className={style.presentacion}>
                            <h3>Objetivo</h3>
                            <textarea className={style.field} rows={7} name="objetivo" onChange={handleInputChange} value={stateDiplomado.objetivo}>
                            </textarea>
                        </article>

                        <article className={style.presentacion}>
                            <h3>Dirigído a...</h3>
                            <textarea className={style.field} rows={5} name="dirigido" onChange={handleInputChange} value={stateDiplomado.dirigido}>

                            </textarea>
                        </article>

                        <article className={style.infoPagos_container}>
                            <div className={style.infoPagos_card}>
                                <p><span className={style.top_span}>FECHA</span> <br /> <input className={style.field} type="date" name="fecha" onChange={handleInputChange} defaultValue={stateDiplomado.fecha} /></p>
                                <p><span>DURACION</span> <br /><input className={style.field} name="duracion" onChange={handleInputChange} value={stateDiplomado.duracion} /></p>
                                <p><span>CLASES</span> <br /> <input className={style.field} name="horario" onChange={handleInputChange} value={stateDiplomado.horario} /><br /> (Horario Centro de Mexico)</p>
                                <p><span>Asesor(a):</span><input className={style.field} name="asesor" onChange={handleInputChange} value={stateDiplomado.asesor} /> </p>
                            </div>
                            <div className={style.infoPagos_card}>
                                <p><span className={style.top_span}>PAGO UNICO</span> <br /> <input type="text" name="pago" onChange={handleInputChange} className={style.field} value={stateDiplomado.pago} /></p>
                                <p><span>MENSUALIDADES</span> <br /><input className={style.field} name="mensualidades" onChange={handleInputChange} value={stateDiplomado.mensualidades} /> </p>
                                <p><span>CERTIFICACION</span> <br /> <input className={style.field}  type="text"  name="certificacion" onChange={handleInputChange} value={stateDiplomado.certificacion} /></p>
                                <p><span>APARTADO</span> <br /> <input className={style.field}  type="text"  name="apartado" onChange={handleInputChange} value={stateDiplomado.apartado} /></p>
                                <p><span>INSCRIPCION</span> <br /> <input className={style.field} type="text"name="inscripcion" onChange={handleInputChange} value={stateDiplomado.inscripcion} /></p>
                            </div>
                        </article>

                        <article className={style.buttons_container}>
                            <h1>Link Whatsapp </h1>
                            <input className={style.field} name="whatsapp" onChange={handleInputChange} value={stateDiplomado.whatsapp} />
                            <h1>Brochure PDF</h1>
                            <input name="brochure" className={style.field} onChange={(e) => handleFileUpload(e, "brochure")} multiple accept="image/*" type="file" />
                        </article>

                        <article className={style.buttons_container}>

                            <h1>Imagen Flyer</h1>
                            <input name="imagen" className={style.field} onChange={(e) => handleFileUpload(e, "imagen")} multiple accept="image/*" type="file" />
                        </article>
                        <article className={style.buttons_container}>

                            <h1>Imagen Thumbnail</h1>
                            <input name="thumbnail" className={style.field} onChange={(e) => handleFileUpload(e,"thumbnail")} multiple accept="image/*" type="file" />
                        </article>
                    </div>
                </section>

                <section className={style.highlights_section}>
                    <h2>Highlights del Programa</h2>
                    <button type="button" className={style.submitbutton} onClick={() => agregarHighlight()}>Generar</button>
                    <div className={style.highlights_container}>
                        {stateDiplomado.highlight && stateDiplomado.highlight.map((x: any, i: any) => (
                            <>
                            <article className={style.buttons_container}>
                                <input className={style.field} key={i + 'highlight'} value={x.nombre} onChange={(event) => handleInputHighlight(x, event)} />
                                <i  key={"iconTitulo" + i} onClick={() => eliminarItemFromDiplomado('highlight',x)} className={`fas fa-times ${style.iconclose}`}></i>
                                </article>
                            </>
                        ))}

                    </div>
                </section>

                <section className={style.highlights_section}>
                    <h2>Plan de Estudios</h2>

                    <button type="button" className={style.submitbutton} onClick={() => agregarUnidad()}>Generar</button>
                    <div className={style.highlights_container}>
                        {stateDiplomado.unidad && stateDiplomado.unidad.map((x: any, i: any) => (
                            <>
                             <article className={style.buttons_container}>
                                <input key={i} className={style.field} value={x.nombre} onChange={(event) => hangleInputUnidad(x, event)} />
                                <i  key={"iconUnidad" + i} onClick={() => eliminarItemFromDiplomado('unidad',x)} className={`fas fa-times ${style.iconclose}`}></i>
                                </article>

                                <ul>
                                    <h4>Temas:</h4>
                                    {x.tema && x.tema.map((y: any, j: any) => (
                                        <>
                                        <article className={style.buttons_container}>
                                        <li key={j + "temas"}> <input className={style.field} key={j + "temas"} value={y.nombre} onChange={(event) => hangleInputTema(x, y, event)} /> </li>
                                        <i  key={"iconTema" + i} onClick={() => eliminarTemaFromUnidadDiplomado(x,y)} className={`fas fa-times ${style.iconclose}`}></i>
                                        </article>
                                        </>

                                    ))}
                                </ul>
                                <button type="button" style={{ marginBottom: '20px' }} className={style.submitbutton} onClick={() => agregarTemaUnidad(x)}>Tema</button>
                            </>
                        ))}
                    </div>
                </section>
                <button type="submit" style={{ marginBottom: '20px' }} className={style.submitbutton}>Guardar Diploma </button>

            </form>
        </>
    )
}

export default Editar;