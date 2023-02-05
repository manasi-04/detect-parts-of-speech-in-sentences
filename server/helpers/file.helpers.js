import fs from 'fs';

export const readFileData = (name) => {
   let data = '';
   return new Promise((res, rej) => {
      fs.createReadStream(`./uploads/${name}.txt`, 'utf-8')
      .on('error', (error) => rej(error))
      .on('data', (chunk) =>  data += chunk)
      .on('end', () => res(data));
   });
}