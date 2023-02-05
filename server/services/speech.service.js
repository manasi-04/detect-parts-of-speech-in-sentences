import { readFileData } from '../helpers/file.helpers.js';
import { calculatePercentage } from './../helpers/percentage.js';

export const speechHandlerService = async (name) => {
    const data = await readFileData(name);
    const arr = data.split('\r\n\r\n');
    console.log('arr', arr);
    const result = calculatePercentage(arr);
    console.log('result', result);
    return result;
}