import { getInput } from "../inputService.js";


const input = await getInput(1)
    .then( res => {
        return res.data.split(/\n/gm);
    }).catch(err => {
        console.log(err);
    });

input.forEach((value, index, array) => {
    let numbers = value.replace(/\D/g, '').split('');
    if (numbers.length){
        array[index] = parseInt(numbers[0] + numbers.pop());
    }

    
})

const coordinate = input.reduce((acc, val) => acc + val);

console.log(coordinate);