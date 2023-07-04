import { Outlet, Navigate } from 'react-router-dom';

export const ProtectRoutes = () => {
    let expiracion:boolean = false;
    var dateNow = new Date();
    let jsonPayload:any;
    const token = localStorage.getItem('token');
    
    //console.log(token!.role[0].authority);
   
     jsonPayload = JSON.parse(decodificarToken(token));
      // JWT exp is in seconds
    if (jsonPayload.exp * 1000 < dateNow.getTime()) {
        expiracion = false;
      } else {
        expiracion = true;
    }
    return jsonPayload!.role[0].authority ==  'ROLE_ADMIN' && expiracion == true ? <Outlet/> : <Navigate to='/login' />
};

function decodificarToken(token: string | null) {
    var base64Url = token!.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload;
}
