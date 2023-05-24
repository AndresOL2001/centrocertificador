import axios from "axios"

const obtenerDiplomaPorId = (id:number) => {
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg0ODgzMDIyLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJleHAiOjE2ODQ5MTkwMjJ9.fm28CK8PXQVV1sMbeZQwlMlrdL_q3kP5VIbwu4y08kDrfjGbiXIh58CRiF-NMrE7XcIaouFSNCG8J43xDPfyWA` }
    };
    
    return axios.get('http://localhost:5000/api/diplomados/'+id,config);
}

const obtenerDiplomas = () => {
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg0ODgzMDIyLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJleHAiOjE2ODQ5MTkwMjJ9.fm28CK8PXQVV1sMbeZQwlMlrdL_q3kP5VIbwu4y08kDrfjGbiXIh58CRiF-NMrE7XcIaouFSNCG8J43xDPfyWA` }
    };
    
    return axios.get('http://localhost:5000/api/diplomados',config);
}

const guardarDiploma = (diploma:any) => {
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg0ODgzMDIyLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJleHAiOjE2ODQ5MTkwMjJ9.fm28CK8PXQVV1sMbeZQwlMlrdL_q3kP5VIbwu4y08kDrfjGbiXIh58CRiF-NMrE7XcIaouFSNCG8J43xDPfyWA` }
    };
    
    return axios.post('http://localhost:5000/api/diplomados',diploma,config);
}

const editarDiploma = (diploma:any,id:number) => {
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg0ODgzMDIyLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJleHAiOjE2ODQ5MTkwMjJ9.fm28CK8PXQVV1sMbeZQwlMlrdL_q3kP5VIbwu4y08kDrfjGbiXIh58CRiF-NMrE7XcIaouFSNCG8J43xDPfyWA` }
    };
    
    return axios.put('http://localhost:5000/api/diplomados/'+id,diploma,config);
}


export default {obtenerDiplomaPorId,guardarDiploma,obtenerDiplomas,editarDiploma};