import { getInput } from "../inputService.js";

const foundCoordinates = []

const partNumbers = []
const input = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
    .split(/\n/gm).filter(v => v);

// const input = await getInput(3).then(res => res.data.split(/\n/gm).filter(v => v));

function isSymbol(char){
  return !!char.match(/[!@#$%^&*()=+\-_/]/gm);
}

function isDigit(char){
  return !!char && !!char.match(/\d/gm);
}

function getPartNumbers(x, y) {
  let partNumbers = []
  for (let i = x-1; i < x + 2; i++){
    for (let j = y-1; j < y + 2; j++){
      if( isDigit(input[i][j])) {
        let coordinates = getCoordinates(i, j);

        if (coordinates) {
           
          let partNumber = ''
          for (let i = coordinates.startPoint; i <= coordinates.endPoint; i++){
            partNumber += input[coordinates.row][i]
          }
          partNumbers.push(parseInt(partNumber))
        }
      }
    }
  }
  return partNumbers;
}

function getCoordinates(i, j) {
  let coordinates = {row: i, startPoint: 0, endPoint: 0}

  for(let y=j; y >= 0; y--) {
    if (isDigit(input[i][y])){
      coordinates.startPoint = y;
    } else {
      break;
    }
  }
  for(let y=j; y < input[i].length; y++) {
    if (isDigit(input[i][y])){
      coordinates.endPoint = y;
    } else {
      break;
    }
  }

  if (!isCoordinateMapped(coordinates)) {
            
    foundCoordinates.push({...coordinates})

    return coordinates;
  }

  return null;
}

function isCoordinateMapped(coordinates) {
  return foundCoordinates.some(c => 
    c.row == coordinates.row
    && c.startPoint == coordinates.startPoint
    && c.endPoint == coordinates.endPoint)
}

for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++){
    if (isSymbol(input[x][y])){
      partNumbers.push(...getPartNumbers(x,y));
    }
  }
}
let sum = partNumbers.reduce((acc, val) => acc + val)
console.log(sum)