
const numeros = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
export const tamanhoDaCombinacao = 15;

export function temProximaCombinacao(acumulador) {
    return (acumulador & (1 << numeros.length)) == 0;
}

export function gerarProximaCombinacao(acumulador) {

    let combinacao = [];
    for(let i = 0; i < numeros.length; i++) {
        if((acumulador & (1 << i)) != 0) {
            combinacao.push(numeros[i]);
        }
    }

    if(combinacao.length == tamanhoDaCombinacao) {
        return combinacao;
    } else {
        return [];
    }
}