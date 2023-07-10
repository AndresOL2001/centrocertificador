import { Link } from "react-router-dom";
import BlogService from "../../services/BlogService";
import style from "./blog.module.css";
import React, { useEffect, useState } from "react";

const Blog: React.FC = ({

}) => {
    const [stateBlogs, setStateBlogs] = useState([]); // Name it however you wish

    useEffect(() => {
        BlogService.obtenerBlogs().then((response) => {
            setStateBlogs(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <section className={style.diplomados}>
                <h2 className={style.recientes}>Blog</h2>
                {stateBlogs && stateBlogs.map((x: any) => (
                    <>
                        <article className={style.margen_inferior}>
                            <h1 className={style.margen_inferior}>{x.encabezado} - <span>{x.autor}</span></h1>
                            {/*                              <img src="/sict.jpg" className={style.img_blog} alt="Secretaria de Innovacion, Ciencia y Tecnologia" />
 */}                             <h4 className={style.margen_inferior}>Fecha: {x.fecha}</h4>
                            <p>{x.sinopsis}</p>
                            <Link to={"/blog/" + x.blog_id}>
                                <button className={`${style.btnmostrar} ${style.margen_inferior}`}>Leer más</button>
                            </Link>
                        </article>
                    </>
                ))}
            </section>
        </>
    )
}

export default Blog;