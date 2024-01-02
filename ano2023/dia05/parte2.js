import { getInput } from "../inputService.js";
import PromptSync from "prompt-sync"; 
const prompt = PromptSync();

async function main() {
  // const inputUsuario = prompt('É resposta final? [s] [n]:    ');
  // const respostaFinal = inputUsuario.toLowerCase() == 's';
  const result = await getResult(false);

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
  const seedRange = getSeedRange(parsedInput)
  const mapTransformList = getMapList(parsedInput);
  
  const mappedSeedsList = transformRangeListFromMapList(seedRange, mapTransformList);

  return '';
}

function getSeedRange(input) {
  let seedValues = [];
  let values = input[0].match(/\d+/gm);

  for (let i = 0; i < values.length; i = i+2){
    let seedRange = {
      entradaInicio: parseInt(values[i]),
      entradaFim: parseInt(values[i]) + parseInt(values[i+1]) - 1,
    }
    seedValues.push(seedRange);
  }

  return seedValues;
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
          entradaInicio: parseInt(values[1]),
          entradaFim: parseInt(values[1]) + parseInt(values[2]-1),
          saidaInicio: parseInt(values[0]),
          saidaFim: parseInt(values[0]) + parseInt(values[2]-1),
        };

        map.push(range)
        j++;
      }
      mapList.push(map);
    }
  } 

  return mapList;
}

function transformRangeListFromMapList(rangeList, mapTransformList, index = 0) {

  const mapTransform = mapTransformList[index];
  const transformedRangesList = []

  if (!mapTransform) {
    return rangeList;
  }

  rangeList.forEach(range => {
    const mapsInRange = mapTransform
      .filter(m => 
                  (range.entradaInicio <= m.entradaInicio && range.entradaFim >= m.entradaInicio)
              ||  (range.entradaInicio <= m.entradaFim && range.entradaFim >= m.entradaFim)
              ||  (range.entradaInicio >= m.entradaInicio && range.entradaFim <= m.entradaFim)
            )
      .sort((a, b) => a.entradaInicio - b.entradaInicio);
      let transformFlat = transformRangeByMap(range, mapsInRange).flat();
      transformedRangesList.push(transformFlat);
    });

    
    const transformedRangesFlat = transformedRangesList.flat();
  
  return transformRangeListFromMapList(transformedRangesFlat, mapTransformList, index + 1);
}


function transformRangeByMap(range, mapsInRange, index = 0) {
  let transformedRangeList = [];
  const map = mapsInRange[index]

  if(!map) {
    transformedRangeList.push(range);
    return transformedRangeList;
  }

  if (range.entradaInicio <= map.entradaInicio) {
    transformedRangeList.push({
      entradaInicio: range.entradaInicio,
      entradaFim: map.entradaInicio -1
    });
  }

  let innerRange = {
    entradaInicio: Math.max(range.entradaInicio, map.entradaInicio),
    entradaFim: Math.min(range.entradaFim, map.entradaFim)
  }
  let difference = map.saidaInicio - map.entradaInicio;

  transformedRangeList.push({
    entradaInicio: innerRange.entradaInicio + difference,
    entradaFim: innerRange.entradaFim + difference
  })


  if (range.entradaFim > map.entradaFim) {
    transformedRangeList.push({
      entradaInicio: map.saidaInicio,
      entradaFim: map.saidaFim
    });
    
    const rangeRemnant = {
      entradaInicio: range.entradaFim - map.entradaFim + 1,
      entradaFim: range.entradaFim
    };
    
    transformedRangeList.push(transformRangeByMap(rangeRemnant, mapsInRange, index + 1));
  }
  return transformedRangeList;
}





main()