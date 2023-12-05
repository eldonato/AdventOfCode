import { getInput } from "../inputService.js";

function convertToCalibrationValue(matches) {
    let calibrationValue = getValueFromLiteral(matches[0][1]) + getValueFromLiteral(matches.pop()[1])
    return parseInt(calibrationValue);
}

function getValueFromLiteral(value) {
    return parseInt(value) ? value : mapper[value]
}

const pattern = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/gmi);

const mapper = { one: '1',two: '2',three: '3',four: '4',five: '5',six: '6',seven: '7',eight: '8',nine : '9',}

const calibrationValues = [];

const input = await getInput(1)
    .then( res => {
        return res.data.split(/\n/gm);
    }).catch(err => {
        console.log(err);
});

input.forEach((value) => {
    let matches = [...value.matchAll(pattern)];
    if (matches.length){
        calibrationValues.push(convertToCalibrationValue(matches));
    }
})

console.log(calibrationValues.reduce((acc, val) => acc+val));
