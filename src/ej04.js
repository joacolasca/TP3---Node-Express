import fs from 'fs';
const ARCHIVO_ENTRADA = "src/archivo-entrada.txt";
const ARCHIVO_SALIDA = "src/archivo-salida.txt";
console.clear();
copiar(ARCHIVO_ENTRADA, ARCHIVO_SALIDA);
async function copiar(origen, destino){
    try {
        // await lee el contenido del archivo de origen
        // fs.promises.readFile devuelve el contenido del archivo como una cadena de texto
        const contenido = await fs.promises.readFile(origen, { encoding: 'utf8' });
        await fs.promises.writeFile(destino, contenido);
        console.log(`Archivo copiado de ${origen} a ${destino} exitosamente.`);
    } catch (error) {
        console.error(`Error al copiar el archivo: ${error.message}`);
    }
}
