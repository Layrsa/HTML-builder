const fs = require('fs');
const path = require('path');

let way = path.join(__dirname, 'text.txt')
let read = fs.createReadStream(way);
let data = '';

read.on('data', chanck => data += chanck);
read.on('end', () => process.stdout.write(data));