import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir, array} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from"./modules/omdb-wrapper.js"
import express, { text } from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
const app = express();
const port = 3000;
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
//
// Aca pongo todos los EndPoints
//
app.get('/', (req, res) => { res.sendStatus(200), res.send('Ya estoy respondiendo!');})
app.get('/saludar/:nombre', (req, res) => 
{
    let nombre = req.params.nombre;
    res.status(200).send(`Hola ${nombre}`);
})
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => 
{
    let fecha =  Date.parse(`${req.params.ano}-${req.params.mes}-${req.params.dia} `)
    let result = fecha? res.sendStatus(200):res.sendStatus(400)  
})
app.get('/matematica/sumar', (req, res) =>
{
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    
    res.status(200).send(`${sumar(n1, n2)}`)
})
app.get('/matematica/restar', (req, res) =>
{
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    
    res.status(200).send(`${restar(n1, n2)}`)
})
app.get('/matematica/multiplicar', (req, res) =>
{
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    
    res.status(200).send(`${multiplicar(n1, n2)}`)
})
app.get('/matematica/dividir', (req, res) =>
{
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let div = (n2 != 0) ? res.status(200).send(`${dividir(n1, n2)}`):res.sendStatus(400);
    
})
app.get('/omdb/searchbypage', async(req, res) =>
{
    let searchText = req.query.searchText;
    let page = parseInt(req.query.page);
    let result = await OMDBSearchByPage(searchText, page)
    res.status(200).send(result.datos)
})
app.get('/omdb/searchcomplete', async(req, res) =>
{
    let searchText = req.query.searchText;
    let result = await OMDBSearchComplete(searchText)
    res.status(200).send(result.data)
})

app.get('/omdb/getbyomdbid', async(req, res) =>
{
    let imdbID = req.query.imdbID;
    let result = await OMDBGetByImdbID(imdbID)
    console.log(result.data)
    res.status(200).send(result.data)
}
)
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

app.get('/alumno', async(req, res) =>
{
    res.status(200).send(alumnosArray);
})
app.get('/alumno/dni', async(req, res) =>
{
    let dni = req.query.dni;
    let alum = alumnosArray.find((element) => element.DNI == dni);
    res.status(200).send(alum);
})
app.post('/alumno',async(req,res)=>
{
    let nombre = req.query.nombre;
    let dni = req.query.dni;
    let edad = req.query.edad;
    alumnosArray.push(new Alumno(nombre, dni, edad));
    res.status(201).send("created");
})
app.delete('/alumno',async(req,res)=>
{
    let dni = req.query.dni;
    let alumn = (alumnosArray.findIndex((element) => element.DNI == dni));
    if(alumn != -1)
    {
        alumnosArray.splice([alumn],1);
        res.status(200).send("OK");
    }
    else{
        res.status(404).send("ERROR");
    }
}
)
//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})