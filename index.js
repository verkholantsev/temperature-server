/* jshint node: true */

'use strict';

var recluster = require('recluster');
var path = require('path');

var cluster = recluster(path.join(__dirname, './server.js'));

cluster.run();
