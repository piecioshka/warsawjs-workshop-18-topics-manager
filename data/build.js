'use strict';

const jsf = require('json-schema-faker');
jsf.extend('faker', () => require('faker'));
const schema = require('./schema.json');
const sample = jsf(schema);
const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, 'database.json');

if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
}
fs.writeFileSync(filename, JSON.stringify(sample, null, 4));
