const fs = require('fs');
const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');

const filesWayToCopy = path.join(__dirname, 'files-copy');
const filesWay = path.join(__dirname, 'files');

mkdir(filesWayToCopy, { recursive: true })
  .then((error) => {
    if (error) console.log(error);
  })
  .catch((error) => console.error(error));

function copyDir(or, copy) {
  readdir(or, { withFileTypes: true })
    .then((data) => {
      data.forEach((file) => {
        const wayToOr = path.join(or, file.name);
        const wayToCopy = path.join(copy, file.name);
        copyFile(wayToOr, wayToCopy)
        .then((error) => {
          if (error) {
            console.log(error);
          } 
        });
      });
      console.log(`Copy of folder done!`);
    });
}
  
copyDir(filesWay, filesWayToCopy);

