import { getInput } from "../inputService.js";
import PromptSync from "prompt-sync"; 
const prompt = PromptSync();

async function getResult(isOficial) {
  let parsedInput = await getParsedInput(isOficial);
  let scratchcardList = []
  for (let i = 0; i < parsedInput.length; i++) {
    const line = parsedInput[i];
    scratchcardList.push(getScractchcard(line, isOficial))
  }

  return scratchcardList.reduce((acc, val) => acc + val.pontuacao, 0);
}

async function getParsedInput(isOficial) {
  let input;
  if (!isOficial) {
    input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
  } else {
    input = await getInput(4).then(res => res.data);
  }

  return input.split(/\n/gm).filter(v => v);
}

function getScractchcard(line, isOficial){
  let scratchcard = {};

  if (!isOficial) {
    scratchcard.numerosPremiados = line.slice(8, 23).match(/(\d)+/gm)
    scratchcard.numerosCartela = line.slice(25, 48).match(/(\d)+/gm)
  } else {
    scratchcard.numerosPremiados = line.slice(10, 39).match(/(\d)+/gm)
    scratchcard.numerosCartela = line.slice(42, 116).match(/(\d)+/gm)
  }
  
  scratchcard.numerosVencedores = scratchcard.numerosCartela.filter(np => scratchcard.numerosPremiados.includes(np))
  scratchcard.pontuacao = scratchcard.numerosVencedores.length 
                        ? Math.pow(2, scratchcard.numerosVencedores.length - 1)
                        : 0;
  return scratchcard
}


async function main() {
  const inputUsuario = prompt('É resposta final? [s] [n]:    ')
  const respostaFinal = inputUsuario.toLowerCase() == 's'
  console.log(await getResult(respostaFinal))
}

main()