import Layout from "../../Layout";
import style from "./blog.module.css";
import React from "react";

const Blog: React.FC = ({

}) => {
    return (
        <Layout>
                <section className={style.construccion}>
                    <img src="/centro.jpg" alt="sitio-en-desarrollo" />
                        <i className={style.text}>
                            <h2><i className='bx bx-code-block'>&nbsp;</i> En Desarrollo...</h2>
                        </i>
                </section>
        </Layout>
    )
}

export default Blog;