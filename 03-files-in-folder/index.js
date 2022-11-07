const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

const way = path.join(__dirname, 'secret-folder');

readdir(way, { withFileTypes: true })
  .then((data) => {
    data.forEach((file) => {
      const fileWay = path.join(way, file.name);
      if (file.isFile()) {
        const elArr = file.name.split('.');
        const name = elArr.slice(0, -1).join('.');
        const ext = elArr[elArr.length - 1];
        stat(fileWay, (error, stats) => {
          const size = stats.size / 1024;
          console.log(`${name} ${ext} ${size}kb`);
        });
      }
    });
  })
  .catch((error) => console.error(error));