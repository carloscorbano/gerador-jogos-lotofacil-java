import fetch from 'node-fetch';

const resultadosURL = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil';

export async function resultadosLoteria() {
    
    try {
        const resultadosRAW = await fetch(resultadosURL);
        const resultadosJSON = await resultadosRAW.json();
        return resultadosJSON;
    } catch( error) {
        console.error(error.message);
        return JSON.parse({});
    }
}