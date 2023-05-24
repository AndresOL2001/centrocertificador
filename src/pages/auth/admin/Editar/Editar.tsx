import Layout from "../../../../Layout"
import React, { useEffect, useState } from "react";
import style from "./Editar.module.css";
import DiplomadoService from "../../../../services/DiplomadoService";
import { useParams } from "react-router-dom";

const diplomado = {
    imagen: '/files/2023-04/FuncionPolicial/Funcion_Policial.jpg',
    brochure:'',
    titulo: 'Función Policial y Derechos Humanos',
    proposito: `El propósito principal de la función policial es la seguridad pública, en ciertas ocasiones la policía al realizar su funcion policial a través de la prevención e investigación, transgrede el principio de legalidad atentando en contra de los derechos humanos de las personas, sin embargo existen marcos normativos que regulan estas funciones, mismas que se regirán por los principios de legalidad, objetividad, eficiencia, profesionalismo, hornadez y respeto a los derechos humanos.`,
    objetivo: 'Constrastar las diversas legislaciones que existen cuya finalidad se centra en el respeto de los derechos humanos. Establecer los procedimientos que debe seguir el policía en su actuación con apego a los principios de la legalidad, objetividad, ética, eficiencia y respeto a los derechos humanos. Orientar y facilitar los procesos de capacitación y actuar del policía.',
    dirigido: 'Personal policial, municipal, estatal, policía de investigación, Guardia Nacional, policía militar, estudiantes y profesionales en Criminología, abogados, Peritos, custodios, Personal directivo y administrativo penitenciario.',
    fecha: '09 de Abril del 2023',
    duracion: '6 meses',
    horario: 'Domingo de 10:00 a 14:00 Hrs.',
    pago: 6850,
    asesor: 'Lucero',
    inscripcion: 349,
    mensualidades: '6 Meses - $1,149.00 MXN',
    whatsapp: 'https://wa.me/527341890671?text=¡Buen%20día!%20estoy%20interesado/a%20en%20el%20diplomado%20de%20Función%20Policial',
    unidad: [] as any,
    highlight: [] as any
}

const Editar: React.FC = ({

}) => {
    const params = useParams();
    const [countHighlight, setCountHighlight] = useState(1) // Name it however you wish
    const [countUnidad, setCountUnidad] = useState(1) // Name it however you wish
    const [stateDiplomado, setStateDiplomado] = useState(diplomado) // Name it however you wish

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
            id:countUnidad,
            nombre: "unidad ",
            nuevo:true,
            tema: []
        }
        const nextPerson = { ...stateDiplomado, unidad: stateDiplomado.unidad.concat(valorUnidad) };

        setStateDiplomado(nextPerson);
        console.log(stateDiplomado);
    }

    function agregarHighlight(): void {
        setCountHighlight(countHighlight + 1);
        let valorHighlight = {
            id:countHighlight,
            nuevo:true,
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
        const updatedState = fileType === "brochure" ? { ...stateDiplomado, brochure: url } : { ...stateDiplomado, imagen: url };
        setStateDiplomado(updatedState);
      };

    function agregarTemaUnidad(unidad: any): void {
        console.log(unidad)
        const nextPerson = {
            ...stateDiplomado, unidad: stateDiplomado.unidad.map((c: any) => {
                if (c.id === unidad.id) {
                    // Increment the clicked counter
                    let tema = {
                        id: c.tema.length + 1,
                        nuevo:true,
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
        setStateDiplomado((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

 

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(stateDiplomado)
        DiplomadoService.editarDiploma(stateDiplomado,Number(params.id)).then((response) => {
            console.log(response)
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
                                <p><span className={style.top_span}>FECHA</span> <br /> <input className={style.field} name="fecha" onChange={handleInputChange} defaultValue={stateDiplomado.fecha} /></p>
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
                            <h1>Link Whatsapp Asesor</h1>
                            <input className={style.field} name="whatsapp" onChange={handleInputChange} defaultValue={stateDiplomado.whatsapp} />
                            <h1>Brochure PDF</h1>
                            <input name="brochure" className={style.field} onChange={(e) => handleFileUpload(e,"brochure")} multiple accept="image/*" type="file" />
                        </article>

                        <article className={style.buttons_container}>

                            <h1>Imagen Flyer</h1>
                            <input name="imagen" className={style.field} onChange={(e) => handleFileUpload(e,"imagen")} multiple accept="image/*" type="file" />
                        </article>
                    </div>
                </section>

                <section className={style.highlights_section}>
                    <h2>Highlights del Programa</h2>
                    <button type="button" className={style.submitbutton} onClick={() => agregarHighlight()}>Generar</button>
                    <div className={style.highlights_container}>
                        {stateDiplomado.highlight && stateDiplomado.highlight.map((x: any, i: any) => (
                            <>
                            <input className={style.field} key={i + 'highlight'} defaultValue={x.nombre} onChange={(event) => handleInputHighlight(x, event)} /> 
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
                                <input  key={i} className={style.field} defaultValue={x.nombre} onChange={(event) => hangleInputUnidad(x, event)} />
                                <ul>
                                    <h4>Temas:</h4>
                                    {x.tema && x.tema.map((y: any, j: any) => (
                                        <li key={j + "temas"}> <input className={style.field} key={j + "temas"} defaultValue={y.nombre} onChange={(event) => hangleInputTema(x, y, event)} /> </li>

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

export default Editar;