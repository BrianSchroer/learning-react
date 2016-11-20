/*
This script generates mock data for local development.
This way you don't have to point to an actual API,
but you can enjoy realistic but randomized data
and rapid page loads due to local, static data.
*/

/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs';
import jsonSchemaFaker from 'json-schema-faker';
import path from 'path';
import {schema} from './mockDataSchema';

 console.log(chalk.green(
    `Using json-schema-faker to generate data for schema:
            ${path.join(__dirname, './mockDataSchema')}...`));

const json = JSON.stringify(jsonSchemaFaker(schema), null, /*indent:*/ 4);
const outputPath = './src/api/db.json';

fs.writeFile(outputPath, json, function(err) {
    if (err) {
        return console.log(chalk.red(err));
    } else {
        console.log(chalk.green(
            `Mock data was generated and saved to
            ${path.join(__dirname, outputPath)}.`));
    }
});
