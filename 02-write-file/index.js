const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const file = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({ input, output });

rl.question('Write something, pls: ', (answer) => {
  fs.appendFile(file, 
    `\nNew note: ${answer} `,
    (err) => {
      if (err) console.log(err);
    }
  );
});

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    process.exit(-1);
  }
  fs.appendFile(file, 
    `${input} `,
    (err) => {
      if (err) console.log(err);
    }
  );
});

rl.on('SIGINT', () => {
  rl.question('Exit, yes? ', (answer) => {
      if (answer.match(/^y(es)?$/i)) rl.close();
    }
  );
});