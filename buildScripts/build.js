/**
 * Production build
 */

/* eslint-disable no-console */

import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';

// Checked by babel & potentially other libraries:
process.env.NODE_ENV = 'production';

console.log(chalk.blue(
    'Generating minified bundles for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the following warnings: '));
    }

    console.log(`Webpack stats: ${stats}`);

    console.log(chalk.green(
        `App was built for production and written to ${webpackConfig.output.path}.`));

    return 0;
});
