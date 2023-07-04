import Layout from "../../../../Layout"
import React, { useState } from "react";
import style from "../Editar/Editar.module.css";
import DiplomadoService from "../../../../services/DiplomadoService";
import Swal from "sweetalert2";

const diplomado = {
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
    brochure:'',
    thumbnail:'',
    unidad: [] as any,
    highlight: [] as any
}
const Guardar: React.FC = ({

}) => {
    const [countHighlight, setCountHighlight] = useState(1) // Name it however you wish
    const [countUnidad, setCountUnidad] = useState(1) // Name it however you wish
    const [stateDiplomado, setStateDiplomado] = useState(diplomado) // Name it however you wish
    const [stateImagen, setStateImagen] = useState() // Name it however you wish
    const [stateBrochure, setStateBrochure] = useState() // Name it however you wish
    const [stateThumbnail, setStateThumbnail] = useState() // Name it however you wish

    function agregarUnidad(): void {
        setCountUnidad(countUnidad + 1);
        let valorUnidad = {
            idUnidad:countUnidad,
            nombre: "unidad ",
            tema: []
        }
        const nextPerson = { ...stateDiplomado, unidad: stateDiplomado.unidad.concat(valorUnidad) };

        setStateDiplomado(nextPerson);
        console.log(stateDiplomado);
    }

    function agregarHighlight(): void {
        setCountHighlight(countHighlight + 1);
        let valorHighlight = {
            idHighlight:countHighlight,
            nombre: "test",
        }
        console.log(stateDiplomado.highlight.concat(valorHighlight))
        const nextDiplomado = { ...stateDiplomado, highlight: stateDiplomado.highlight.concat(valorHighlight) };

        setStateDiplomado(nextDiplomado);
        console.log(stateDiplomado);
    }

    const handleInputHighlight = (higlightNew:any ,event:any) => {
        const nextDiplomado = {
            ...stateDiplomado, highlight: stateDiplomado.highlight.map((c: any) => {
                if (c.idHighlight === higlightNew.idHighlight) {
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
        if(fileType === "brochure"){
           const updatedState = { ...stateDiplomado, brochure: url }
            setStateDiplomado(updatedState);

        }

        if(fileType === "imagen"){
          const  updatedState = { ...stateDiplomado, imagen: url };
          setStateDiplomado(updatedState);
        }

        if(fileType === "thumbnail"){
            const  updatedState = { ...stateDiplomado, thumbnail: url };
            setStateDiplomado(updatedState);
          }


        if(fileType === "brochure"){
        setStateBrochure(event.target.files[0]);
        }
        if(fileType === "imagen"){
            setStateImagen(event.target.files[0]);
        }
        if(fileType === "thumbnail"){
            setStateThumbnail(event.target.files[0]);
        }
      };

    function agregarTemaUnidad(unidadABuscar: any): void {
        const nextPerson = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.idUnidad === unidadABuscar.idUnidad) {
                    // Increment the clicked counter
                    let tema = {
                        idTema: c.tema.length + 1,
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
                if (c.idUnidad === unidad.idUnidad) {

                    c.tema.map((t: any) => {
                        if (t.idTema == tema.idTema) {
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

        const nextDiplomado = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.idUnidad === unidad.idUnidad) {

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
        setStateDiplomado((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

 

    const handleSubmit = (event: any) => {
        event.preventDefault();
        Swal.showLoading();
        console.log(stateDiplomado)
        DiplomadoService.guardarDiploma(stateDiplomado).then((response) => {
            DiplomadoService.guardarArchivos(response.data.id,stateImagen,stateBrochure,stateThumbnail).then(() => {
                Swal.fire('Listo!','Diploma editado correctamente','success');
            })
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <Layout>
            <form className={style.form} onSubmit={handleSubmit}>
                <section className={style.flyer_section}>
                    {/*  { file && <img className={style.flyer_img} src={file}/>} */}
                    {<img className={style.flyer_img} src={stateDiplomado.imagen} alt="flyer" />}
                    <div className={style.flyer_container}>
                        <article className={style.presentacion}>
                            <h1 className={style.diplomado}>Titulo</h1>
                            <input type="text" name="titulo" onChange={handleInputChange} className={style.field} defaultValue={stateDiplomado.titulo} />
                            <br />
                            <h1 className={style.diplomado}>Proposito</h1>
                            <textarea className={style.field} rows={9} name="proposito" onChange={handleInputChange} defaultValue={stateDiplomado.proposito}>

                            </textarea>
                        </article>

                        <article className={style.presentacion}>
                            <h3>Objetivo</h3>
                            <textarea className={style.field} rows={7} name="objetivo" onChange={handleInputChange} defaultValue={stateDiplomado.objetivo}>
                            </textarea>
                        </article>

                        <article className={style.presentacion}>
                            <h3>Dirigído a...</h3>
                            <textarea className={style.field} rows={5} name="dirigido" onChange={handleInputChange} defaultValue={stateDiplomado.dirigido}>

                            </textarea>
                        </article>

                        <article className={style.infoPagos_container}>
                            <div className={style.infoPagos_card}>
                                <p><span className={style.top_span}>FECHA</span> <br /> <input className={style.field} name="fecha" type="date" onChange={handleInputChange} defaultValue={stateDiplomado.fecha} /></p>
                                <p><span>DURACION</span> <br /><input className={style.field} name="duracion" onChange={handleInputChange} defaultValue={stateDiplomado.duracion} /></p>
                                <p><span>CLASES</span> <br /> <input className={style.field} name="horario" onChange={handleInputChange} defaultValue={stateDiplomado.horario} /><br /> (Horario Centro de Mexico)</p>
                            </div>
                            <div className={style.infoPagos_card}>
                                <p><span className={style.top_span}>PAGO UNICO</span> <br /> <input name="pago"type="number" min="0" onChange={handleInputChange} className={style.field} defaultValue={stateDiplomado.pago} /></p>
                                <p><span>MENSUALIDADES</span> <br /><input className={style.field} name="mensualidades" onChange={handleInputChange} defaultValue={stateDiplomado.mensualidades} /> </p>
                                <p><span>INSCRIPCION</span> <br /> <input className={style.field}  type="number" min="0" name="inscripcion" onChange={handleInputChange} defaultValue={stateDiplomado.inscripcion} /></p>
                                <p><span>Asesor(a):</span><input className={style.field} name="asesor" onChange={handleInputChange} defaultValue={stateDiplomado.asesor} /> </p>
                            </div>
                        </article>

                        <article className={style.buttons_container}>
                            <h1>Link Whatsapp </h1>
                            <input className={style.field} name="whatsapp" onChange={handleInputChange} defaultValue={stateDiplomado.whatsapp} />
                            <h1>Brochure PDF</h1>
                            <input name="brochure" className={style.field} onChange={(e) => handleFileUpload(e,"brochure")} multiple accept="image/*" type="file" />
                        </article>

                        <article className={style.buttons_container}>

                            <h1>Imagen Flyer</h1>
                            <input name="imagen" className={style.field} onChange={(e) => handleFileUpload(e,"imagen")} multiple accept="image/*" type="file" />
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
                            <input className={style.field} key={i + 'highlight'} onChange={(event) => handleInputHighlight(x, event)} /> 
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
                                <input key={i + "unidades"} className={style.field} defaultValue={x.nombre + x.idUnidad} onChange={(event) => hangleInputUnidad(x, event)} />
                                <ul>
                                    <h4>Temas:</h4>
                                    {x.tema && x.tema.map((y: any, j: any) => (
                                        <li key={j + "temas"}> <input className={style.field} key={j + "temas"} onChange={(event) => hangleInputTema(x, y, event)} /> </li>

                                    ))}
                                </ul>
                                <button type="button" style={{ marginBottom: '20px' }} className={style.submitbutton} onClick={() => agregarTemaUnidad(x)}>Tema</button>
                            </>
                        ))}
                    </div>
                </section>
                <button type="submit" style={{ marginBottom: '20px' }} className={style.submitbutton}>Guardar Diploma </button>

            </form>
        </Layout>
    )
}

export default Guardar;