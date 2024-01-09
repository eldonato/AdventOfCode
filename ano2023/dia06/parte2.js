import { getInput } from "../inputService.js";
import PromptSync from "prompt-sync"; 
const prompt = PromptSync();

async function main() {
  const inputUsuario = prompt('É resposta final? [s] [n]:    ')
  const respostaFinal = inputUsuario.toLowerCase() == 's'
  const result = await getResult(respostaFinal)

  console.log(result);
}

async function getParsedInput(isOficial) {
  let input;
  if (!isOficial) {
    input =
`Time:      7  15   30
Distance:  9  40  200`
  } else {
    input = await getInput(6).then(res => res.data);
  }

  return input.split(/\n/gm).filter(v => v);
}

async function getResult(isOficial){

  const parsedInput = await getParsedInput(isOficial);
  const race = getRaceFromInput(parsedInput);
  const numberOfWins = getWinsFromRace(race);

  return numberOfWins;
}

function getRaceFromInput(input) {
  const time = parseInt(input[0].match(/[\d]+/gm).join(''));
  const distance = parseInt(input[1].match(/[\d]+/gm).join(''));
  return { time, distance, }
}

function getWinsFromRace(race) {
  let minTime = 0;
  for (let i=0; i<=race.time; i++) {
    const travelDistance = i * (race.time - i);
    if (travelDistance > race.distance){
      minTime = i;
      break;
    }
  }

  return race.time - (minTime * 2) + 1;
}


main()