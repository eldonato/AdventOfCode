import { config } from 'dotenv';
import https from 'https';
import axios from 'axios';
config({path: '../../.env'});

const axiosInstance = axios.create({
    baseURL: 'https://adventofcode.com',
    timeout: 1000,
    headers: {
        Cookie: `session=${process.env.ADVENT_CODE_KEY}`,
        Accept: 'text/html',
    }
})

export function getInput(day) {
    const url = `/2023/day/${day}/input`
    return axiosInstance.get(url);
}