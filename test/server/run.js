/**
 * @file server test entry
 * @author leon <ludafa@outlook.com>
 */

const Jasmine = require('jasmine');
const path = require('path');
const jasmine = new Jasmine();

jasmine.loadConfigFile(path.join(__dirname, 'jasmine.json'));

jasmine.execute();
