import axios from "axios";

const http = axios.create({
  baseURL: "https://map.mental-match.com/v1",
  /*baseURL: "https://localhost:44330/v1",*/
  headers: {
    "Content-type": "application/json"
  }
});
//define un interceptor de solicitud para el objeto http de axios
http.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('tokenWeb'); //Obtiene el token de autenticación almacenado en la sesion
    if (token) { //Si el token existe, agrega un encabezado Authorization a la configuración de la solicitud con el valor Bearer ${token}
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default http;