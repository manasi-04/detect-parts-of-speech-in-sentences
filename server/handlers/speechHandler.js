import { speechHandlerService } from '../services/speech.service.js';

export const partsOfSpeechHandler = async (name) => {
    const data = await speechHandlerService(name);
    return data;
}