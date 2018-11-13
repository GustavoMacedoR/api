import axios from "axios"

const api = axios.create({
  baseURL: 'http://api.calangoo.com',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

// api.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('access_token');

//   if ( token != null ) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// api.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   const { config, response: { status } } = error;
//   const originalRequest = config;
//   if (status === 401) {
//     if (!originalRequest.retry) {
//       originalRequest.retry = true
//       console.log("Tentando atualizar o Token.")
//       store.dispatch('refresh').then((v) => {
//         const retryOriginalRequest = new Promise((resolve, reject) => {
//           resolve(axios(originalRequest))
//         })
//         console.log("iniciando 2 tentantiva!")
//         return retryOriginalRequest
//       }).catch((e) => {
//         console.log("Não foi possível atualizar o Token.")
//         return Promise.reject(e);
//       })
//     }
//   }
//   return Promise.reject(error);
// });
export default api