import { config } from 'dotenv';
import axios from 'axios';
config({path: '../../.env'});

const axiosInstance = axios.create({
    baseURL: 'https://adventofcode.com',
    timeout: 5000,
    headers: {
        Cookie: `session=53616c7465645f5f5165f8cfe2195e94ff1ad453d2301e47e3a5ddce2e2c716550fded300bbe1c4a52c6d4797b8804fd5b740bd008ff99d58e98bf0aae3c332a`,
        Accept: 'text/html',
    }
})

export function getInput(day) {
    const url = `/2023/day/${day}/input`
    return axiosInstance.get(url);
}