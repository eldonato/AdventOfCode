import { getInput } from "../inputService.js";


// let input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split(/\n/gm).filter(v => v);
const input = await getInput(2)
  .then(res => res.data.split(/\n/gm).filter(v => v));

function isValidReveal(reveal) {
  let numberOfCubes = parseInt(reveal.match(/\d+/gm));
  let color = reveal.match(/[a-z]+/gm);

  return bag[color] >= numberOfCubes
}

const bag = {red: 12, green: 13, blue: 14};
let result = 0;

input.forEach((val, index) => {
  let reveals = val.match(/\d+ [a-z]+/gm);

  let validRound = true;

  for (let reveal of reveals) {
    if (!isValidReveal(reveal)) {
      validRound = false;
    }
  }

  if (validRound){
    console.log(`${index + 1}`)
    result += index + 1;
  }

});

console.log(`Sum of IDs of valid games: ${result}`);
