/**
 * Share site via localtunnel
 */

/* eslint-disable no-console */

import chalk from 'chalk';
import localtunnel from  'localtunnel';
import config from '../src/config';

var tunnel = localtunnel(config.port, {subdomain: config.localtunnelSubDomain},
    function(err, tunnel) {
        if (err) {
            console.log(err);
        } else {
            console.log(chalk.green(
                `Sharing http://localhost:${config.port} at ${tunnel.url}...`));
        }
    }
);

tunnel.on('close', function() {
    console.log(chalk.green(`localtunnel closed.`));
});
