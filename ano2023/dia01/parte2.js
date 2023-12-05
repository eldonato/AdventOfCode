import { getInput } from "../inputService.js";

function convertToNumber(value) {
    return value.replaceAll('one', 1).replaceAll('two', 2).replaceAll('three', 3).replaceAll('four', 4).replaceAll('five', 5).replaceAll('six', 6).replaceAll('seven', 7).replaceAll('eight', 8).replaceAll('nine', 9);
}

const pattern = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/gmi);

const coordinate = await getInput(1)
    .then( res => {
        return res.data
            .split(/\n/gm) //separando por linhas
            .map(v => [...v.matchAll(pattern)]) // extraindo resultados da caputra para lista
            .filter(v => v[0]) //filtrando resultados vazios
            .map(v => [v[0][1], v.slice(-1)[0][1]]) //pegando o valor da primeira e ultima captura para uma lista
            .map(v => v.map(n => convertToNumber(n))) //convertendo cada elemento de extenso para numeral
            .map(v => parseInt(v.join(''))) //juntando a lista e convertendo para int
            .reduce((acc, val) => acc + val) //realizando soma da lista
    }).catch(err => {
        console.log(err);
});

console.log(coordinate);