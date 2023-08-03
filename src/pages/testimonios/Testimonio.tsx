import style from "./Testimonio.module.css";

const Testimonio: React.FC = ({

}) => {
    return (<>
            <section className={style.video__gallery}>
            <h1 className="">TESTIMONIALES</h1>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_1.mp4" controls autoPlay muted>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_2.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_3.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_4.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_5.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_6.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_7.mp4" controls>
                </video>
            </article>
            <article className={style.video__card}>
                <video className={`${style.testimonial} ${style.video__vertical}`} src="https://centrocertificador.mx/videos/testimonial_8.mp4" controls>
                </video>
            </article>
        </section>
    </>
    )
}

export default Testimonio;
