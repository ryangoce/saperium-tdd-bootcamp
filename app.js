'use strict';

const BbPromise = require('bluebird');
// const logError = require('../lib/classes/Error').logError;

BbPromise.config({
    longStackTraces: true,
});

process.on('unhandledRejection', (e) => logError(e));
process.noDeprecation = true;

(() => BbPromise.resolve().then(() => {
    // requiring here so that if anything went wrong,
    // during require, it will be caught.
    const Serverless = require('../lib/Serverless'); // eslint-disable-line global-require
    const serverless = new Serverless({
        interactive: typeof process.env.CI === 'undefined',
    });

    return serverless.init().then(() => serverless.run());
}).catch(e => {
    process.exitCode = 1;
    // logError(e);
}))();