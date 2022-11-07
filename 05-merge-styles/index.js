const fs = require("fs");
const path = require("path");
const { readdir } = require("fs/promises");

const wayToStyles = path.join(__dirname, "styles");
const wayToBandle = path.join(__dirname, "project-dist", "bundle.css")
const writeBundle = fs.createWriteStream(wayToBandle);

readdir(wayToStyles, { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    console.log(error);
})
.then((files) => files.forEach((file) => {
    const wayToFile = path.join(wayToStyles, file.name);
    if ( file.isFile() && path.extname(wayToFile) === ".css" ) {
      const readStyle = fs.createReadStream(wayToFile, "utf8");
      readStyle.pipe(writeBundle);
      console.log('Another one file copied!');
    }
  })
);