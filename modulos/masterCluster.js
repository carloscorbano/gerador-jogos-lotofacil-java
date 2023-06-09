import process from 'node:process';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

import readLine from 'readline';

import { constants } from './constants.js';
import { resultadosLoteria } from './resultadosLoteria.js'; 
import { temProximaCombinacao } from './gerarCombinacao.js';

let lotofacil;
let acumulador = Math.pow(2, 24);
let total = 0;
const maxJogos = 3268760;
const numCPUs = availableParallelism();
let destroyedCPUS = 0;

export async function masterClusterWork() {

    console.log(`Processo mestre PID ${process.pid} está rodando.`);

    console.log("Reunindo resultados da lotofácil...");
    //lotofacil = await resultadosLoteria();
    lotofacil = [];
    console.log("Iniciando workers...");

    for (let i = 0; i < numCPUs; i++) { 
        const worker = cluster.fork();
        worker.on('message', handleMessage);
    }
}

export function eClusterMestre() {
    return cluster.isPrimary;
}

function handleMessage(message) {
    switch(message.type) {
        case constants.REQ_LOTERICA_JSON:
            {
                this.send({ type: constants.REC_LOTERICA_JSON, data: lotofacil });
            }
            break;
        case constants.REQ_PROXIMO_ACUMULADOR:
            {
                if(temProximaCombinacao(acumulador)) {
                    this.send({ type: constants.REC_PROXIMO_ACUMULADOR, data: acumulador });
                    acumulador++;
                } else {
                    this.destroy();
                    destroyedCPUS++;

                    if(destroyedCPUS == numCPUs) {
                        console.log("\nFinalizado o processamento...");
                    }
                }
            }
            break;
        case constants.REQ_INCREASE:
            {
                total++;
                consoleTotalGerados();
            }
            break;
    }
}

function consoleTotalGerados() {
    let porcentagem = (total / maxJogos) * 100;
    readLine.cursorTo(process.stdout, 0);
    process.stdout.write("total gerados: " + total + " / 3.268.760 | " + porcentagem.toFixed(4) + "%");
}