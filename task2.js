import csv from "csvtojson/v2/index.js";
import { createReadStream, createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';

const csvFilePath='./csv/nodejs-hw1-ex1.csv';
const writePath = './csv1/write.txt'

async function run(readPath, writePath) {
  const writeDir = writePath.substr(0, writePath.lastIndexOf('/'))
  if (!existsSync(writeDir)) {
    mkdirSync(writeDir)
  }
  await pipeline(
    createReadStream(readPath, 'utf-8'),
    csv({
      output: "json"
    }),
    createWriteStream(writePath, 'utf-8')
  ).then(()=> {
    console.log('Pipeline is succeeded.')
  }).catch((error) => console.error("See the error", error))
}

run(csvFilePath, writePath)