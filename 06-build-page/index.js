const fs = require('fs');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { mkdir,  readdir, copyFile, readFile, writeFile } = require('node:fs/promises');

//Copy

const wayToProject = path.join(__dirname, 'project-dist');
const wayToAssets = path.join(__dirname, 'assets');
const wayToCopy = path.join(wayToProject, 'assets');

mkdir(wayToProject, { recursive: true })
mkdir(wayToCopy, { recursive: true })


async function copyD(or, copy) {
  try {
    const data = await readdir(or, { withFileTypes: true });
    for (const file of data) {
      const wayToOr = path.join(or, file.name);
      const wayToCopyF = path.join(copy, file.name);
      if (file.isDirectory()) {
        await mkdir(wayToCopyF, { recursive: true });
        await copyD(wayToOr, wayToCopyF);
      } else {
        await copyFile(wayToOr, wayToCopyF);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

copyD(wayToAssets, wayToCopy);
console.log(`Assets copied!`);


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
      }
    })
  })
  console.log(`Bandle maked!`);
}

makeBandle(wayToStyles);


//Tags

async function replaceTags() {
  try {
    const wayToHtml = path.join(__dirname, 'template.html');
    const template = await fs.promises.readFile(wayToHtml, 'utf8');
    const componentsDir = path.join(__dirname, 'components');
    const files = await fs.promises.readdir(componentsDir);
    let result = template;
    result = result.replace(new RegExp('style.css', 'g'), 'bundle.css');
    for (const file of files) {
      const componentPath = path.join(componentsDir, file);
      const content = await fs.promises.readFile(componentPath, 'utf8');
      const tag = `{{${path.parse(file).name}}}`;
      result = result.replace(new RegExp(tag, 'g'), content);
    }
    const outputPath = path.join(wayToProject, 'index.html');
    await fs.promises.writeFile(outputPath, result, 'utf8');
    
    console.log('HTML done!');
  } catch (err) {
    console.error(err);
  }
}

replaceTags();