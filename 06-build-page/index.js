const fs = require('fs');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { mkdir, rm, readdir, copyFile, readFile, writeFile } = require('node:fs/promises');

//Copy

const wayToProject = path.join(__dirname, 'project-dist');
const wayToAssets = path.join(__dirname, 'assets');
const wayToCopy = path.join(wayToProject, 'assets');

mkdir(wayToProject, { recursive: true })
  .then((error) => {
    if (error) console.log(error);
  })
  .catch((error) => console.error(error));

mkdir(wayToCopy, { recursive: true })
  .then((error) => {
    if (error) console.log(error);
  })
  .catch((error) => console.error(error));

function copyD(or, copy) {
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

copyD(wayToAssets, wayToCopy);


//Bandle

const wayToStyles = path.join(__dirname, 'styles');
const wayToBandle = path.join(__dirname, 'project-dist', 'bundle.css');

const writeBundle = createWriteStream(wayToBandle);

function makeBandle(dirOfFiles) {
  readdir(dirOfFiles, { withFileTypes: true })
  .then((data) => {
    data.forEach((file) => {
      const wayToFile = path.join(dirOfFiles, file.name);
      if ( file.isFile() && path.extname(wayToFile) === ".css" ) {
        const readFile = createReadStream(wayToFile, "utf8");
        readFile.pipe(writeBundle);
        console.log('Another one file copied!');
      }
    })
  })
  console.log(`Bandle maked!`);
}

makeBandle(wayToStyles);


//Sample

const wayToSample = path.join(__dirname, 'template.html');
const wayToComps = path.join(__dirname, 'components');

const orHtml = createWriteStream(wayToSample);

function sampleHtml(wayToChancks, wayToFull) {
  readdir((wayToChancks), { withFileTypes: true })
  .then((data) => {

  })
}

sampleHtml(wayToComps, )