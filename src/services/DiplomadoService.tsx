import axios from "axios"

const obtenerToken = () => {
    return localStorage.getItem("token");
}

/*   const prod = 'http://localhost:5000';  
 */
    /*const prod = 'http://185.211.4.103:5000'*/
  
     const prod = 'https://centrocertificador.mx'
 
 const obtenerDiplomaPorId = (id: number) => {
    let token = obtenerToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get(`${prod}/api/diplomados/` + id, config);
}

const obtenerDiplomasPorTitulo = (termino: string) => {
    let token = obtenerToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get(`${prod}/api/diplomados/busqueda/` + termino, config);
}

const obtenerDiplomas = () => {
   
    return axios.get(`${prod}/api/diplomados`);
}

const guardarArchivos = (id: number, imagen: any, brochure: any,thumbnail:any) => {
    let token = obtenerToken();
    const formData = new FormData();
    formData.append(
        "imagen", imagen
    );
    formData.append(
        "brochure", brochure
    );
    formData.append(
        "thumbnail", thumbnail
    );
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.post(`${prod}/api/diplomados/imagen/` + id, formData, config);
}

const guardarDiploma = (diploma: any) => {
    let token = obtenerToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.post(`${prod}/api/diplomados`, diploma, config);
}

const editarDiploma = (diploma: any, id: number) => {
    console.log(diploma);
    let token = obtenerToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.put(`${prod}/api/diplomados/` + id, diploma, config);
}

const eliminarDiploma = (id: number) => {
    let token = obtenerToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.delete(`${prod}/api/diplomados/` + id, config);
}


const iniciarSesion = (loginUser: any) => {
    return axios.post(`${prod}/api/auth/login`, loginUser);
}



export default { obtenerDiplomaPorId, guardarDiploma, obtenerDiplomas, editarDiploma, iniciarSesion, guardarArchivos, eliminarDiploma, obtenerDiplomasPorTitulo };