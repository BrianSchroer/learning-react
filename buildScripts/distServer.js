/* eslint-disable no-console */

import chalk from 'chalk';
import compression from 'compression';
import express from 'express';
import path from 'path';
import open from 'open';

import config from '../src/config';

const app = express();
const serveFromPath = path.join(__dirname, '../dist');

app.use(compression());
app.use(express.static(serveFromPath));

app.get('/', function(request, response) {
    response.sendFile(path.join(serveFromPath, '/index.html'));
});

app.get('/users', function(request, response) {
    // Fake "database" data:
    response.json([
        {'id':1, 'firstName':'Bob', 'lastName':'Smith', 'email':'bob@gmail.com'},
        {'id':2, 'firstName':'Tammy', 'lastName':'Norton', 'email':'tnorton@gmail.com'},
        {'id':3, 'firstName':'Tina', 'lastName':'Lee', 'email':'lee.tina@gmail.com'}
    ]);
});

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
    } else {
        const url = 'http://localhost:' + config.port;
        open(url);
        console.log(chalk.green(`Serving ${url} from ${serveFromPath}...`));
    }
});
