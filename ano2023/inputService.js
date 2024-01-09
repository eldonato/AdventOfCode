import { config } from 'dotenv';
import axios from 'axios';
config({path: '../../.env'});

const axiosInstance = axios.create({
    baseURL: 'https://adventofcode.com',
    timeout: 5000,
    headers: {
        Cookie: `session=${process.env.ADVENT_CODE_KEY}`,
        Accept: 'text/html',
    }
})

export function getInput(day) {

    const url = `/2023/day/${day}/input`
    return axiosInstance.get(url)
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });

}