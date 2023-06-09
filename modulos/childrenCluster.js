import process from 'node:process';

import { constants } from './constants.js';
import { gerarProximaCombinacao, tamanhoDaCombinacao } from './gerarCombinacao.js';
let resultados;

export default function childrenClusterWork() {
    console.log(`Processo filho PID ${process.pid} está rodando.`);
    process.on('message', handleMessage);

    process.send({ type: constants.REQ_LOTERICA_JSON });
}

function handleMessage(message) {
    switch(message.type) {
        case constants.REC_LOTERICA_JSON:
            {
                resultados = message.data;
                process.send({ type: constants.REQ_PROXIMO_ACUMULADOR });
            }
            break;
        case constants.REC_PROXIMO_ACUMULADOR:
            {
                const combinacao = gerarProximaCombinacao(message.data);

                if(combinacao.length == tamanhoDaCombinacao) {
                    //do something.
                    process.send( { type: constants.REQ_INCREASE });
                }

                process.send({ type: constants.REQ_PROXIMO_ACUMULADOR });
            }
            break;
    }
}