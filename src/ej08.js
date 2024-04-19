console.clear();
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from './modules/omdb-wrapper.js';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
let respuesta = await OMDBSearchByPage("cars", 1);
let respuesta1 = await OMDBSearchComplete("cars");
let respuesta2 = await OMDBGetByImdbID("tt0317219");
console.log(respuesta);
console.log(respuesta1);
console.log(respuesta2); 

