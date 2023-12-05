import { getInput } from "../inputService.js";


const coordinate = await getInput(1)
    .then( res => {
        return res.data
                .split(/\n/gm) // separando por linha
                .map(i => i.match(/\d/g)) // pegando todos os numeros
                .filter(i => i) // retirando null
                .map(i => i[0] + i.slice(-1)) //mapeando primeiro e ultimo valor
                .map(i => parseInt(i)) // transformando em numero
                .reduce((acc, val) => acc + val) //somando todos os
    }).catch(err => {
        console.log(err);
});

console.log(coordinate);