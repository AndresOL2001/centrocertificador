import React from "react";
import style from "./Login.module.css";
import Layout from "../../../Layout";
const Login: React.FC = ({
}) => {
    return (
        <>
            <Layout>
                
                    <div>

                    </div>
                    <section className={style.contact}>
                        <h3>Iniciar Sesión</h3>

                        <form id="contact-form" action="https://formsubmit.co/4ad8a40c3ff9538c9c8fee68534e3d9d" className={style.contactform} method="POST">

                            <input type="email"
                                name="Email"
                                className={style.field}
                                placeholder="Correo Electrónico"
                                required />

                            <input type="password"
                                name="Password"
                                className={style.field}
                                placeholder="Contraseña"
                                required />

                            <button type="submit" id="submit" className={style.submitbutton}>
                                Entrar
                            </button>

                            <input type="hidden" name="_replyto" />
                            <input type="hidden" name="_next" value="https://centrocertificador.mx/" />
                        </form>
                    </section>
                    
            </Layout>
        </>
    );
};

export default Login;
