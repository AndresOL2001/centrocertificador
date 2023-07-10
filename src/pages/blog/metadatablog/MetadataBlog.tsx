import { useParams } from "react-router-dom";
import style from "./metadatablog.module.css";
import React, { useEffect, useState } from "react";
import BlogService from "../../../services/BlogService";

const renderObject = (object: any) => {
    switch (object.tipo) {
        case 'imagen':
            return (
                <img className={style.imagen_blog} src={object.contenido}></img>
            );
        case 'parrafo':
            return (
                <article className={style.margen_inferior}>
                    <p>{object.contenido}</p>
                </article>
            );
        case 'subtitulo':
            return (
                <article className={style.margen_inferior}>
                    <h3>{object.contenido}</h3>
                </article>
            )
        case 'titulo':
            return (
                <article className={style.margen_inferior}>
                    <h2>{object.contenido}</h2>
                </article>
            );
        default:
            return null; // Or render a default component if needed
    }
};

const MetadataBlog: React.FC = ({

}) => {
    const [stateMetadataBlog, setMetadataStateBlog] = useState([]); // Name it however you wish

    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0)
        BlogService.obtenerMetadataPorBlogId(Number(params.id)).then((response) => {
            setMetadataStateBlog(response.data.sort((a: any, b: any) => a.orden - b.orden));
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <section className={style.diplomados}>
                {stateMetadataBlog.map((object: any) => (
                    <div key={object.orden}>{renderObject(object)}</div>
                ))}
            </section>
        </>
    )
}

export default MetadataBlog;