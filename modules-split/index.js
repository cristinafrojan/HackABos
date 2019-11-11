"use strict";

const port = require("./libs/port");
const sumar = require("./libs/sum");
const operations = require("./libs/operations");
const operation2String = require("./libs/operations-mapper");
const misLibs = require("./libs");

console.log(port);

const resultSum = sumar(3, 2);
console.log(`resultSum: ${resultSum}`);
console.log(`valid operations: ${operations}`);
console.log(`Operation sum to string: ${operation2String("sum")}`);


console.log(`port from misLibs: ${misLibs.port}`);
console.log(`sum from string misLibs: ${misLibs.operation2String("sum")}`);
