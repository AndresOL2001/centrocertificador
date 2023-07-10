import React, { useState } from "react";
import style from "./Login.module.css";
import DiplomadoService from "../../../services/DiplomadoService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login: React.FC = ({
}) => {

    const loginUser = {
        nombreUsuario:'',
        contraseña:''
    }
    const navigate = useNavigate();


    const [stateUser, setStateUser] = useState(loginUser) // Name it however you wish
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setStateUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(stateUser)
        DiplomadoService.iniciarSesion(stateUser).then((response) => {
            console.log(response)
            Swal.fire("Correcto!","Inciando Sesión","success");
            localStorage.setItem("token",response.data.token);
            navigate("/admin")
        }).catch((err) => {
            Swal.fire("Error!","Usuario y/o contraseña incorrecta","error");
            console.log(err)
        })
    };

    return (
        <>
                
                    <div>

                    </div>
                    <section className={style.contact}>
                        <h3>Iniciar Sesión</h3>

                        <form id="contact-form"  className={style.contactform} onSubmit={handleSubmit}>

                            <input type="email"
                                name="nombreUsuario"
                                className={style.field}
                                onChange={handleInputChange}
                                placeholder="Correo Electrónico"
                                required />

                            <input type="password"
                                name="contraseña"
                                onChange={handleInputChange}
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
                    
        </>
    );
};

export default Login;
