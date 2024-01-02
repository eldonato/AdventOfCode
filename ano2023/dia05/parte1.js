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
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`
  } else {
    input = await getInput(5).then(res => res.data);
  }

  return input.split(/\n/gm).filter(v => v);
}

async function getResult(isOficial){

  const parsedInput = await getParsedInput(isOficial);
  const seedList = parsedInput[0].match(/\d+/gm);
  const mapList = getMapList(parsedInput);
  const mappedSeedsList = mapSeedsFromMap(seedList, mapList);


  const lowestLocation = Math.min(...mappedSeedsList.map(e => e[6]))
  // const seedToSoilMap = parsedInput

  return lowestLocation;
}

function getMapList(input) {
  const mapList = []
  for (let i = 0; i < input.length; i++){
    let line = input[i];
    if (!line.match(/\d/gm)){
      let j = 1;
      let map = [];

      for (let values = input[j+i]?.match(/\d+/gm); values != null; values = input[j+i]?.match(/\d+/gm)){
        let range = {
          sourceStart: parseInt(values[1]),
          sourceEnd: parseInt(values[1]) + parseInt(values[2]-1),
          destinationStart: parseInt(values[0]),
          destinationEnd: parseInt(values[0]) + parseInt(values[2]-1),
        };

        map.push(range)
        j++;
      }
      mapList.push(map);
    }
  }

  return mapList;
}

function mapSeedsFromMap(seedList, mapList) {
  const mappedSeedsList = [];
  for (let i=0; i < seedList.length; i++) {
    let seed = seedList[i];
    let mappedSeed = {seed};
    for (let j=0; j < mapList.length; j++) {
      let source = mappedSeed[j-1] ?? seed;
      let map = mapList[j].find(m => m.sourceStart <= source && m.sourceEnd >= source);
      if (map){
        let difference = source - map.sourceStart;
        mappedSeed[j] = map.destinationStart + difference;
      } else {
        mappedSeed[j] = source;
      }
    }
    mappedSeedsList.push(mappedSeed);
  }
  return mappedSeedsList;
}

main()