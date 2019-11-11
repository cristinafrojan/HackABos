"use strict";

const operationsMapper = {
  sum: "sumar",
  sub: "restar"
};

/**
 * @param {String} operation ['sum' | 'sub']
 * @returns {String} operationCompleteName
 */

function operation2String(operation) {
  if (operationsMapper[operation]) {
    return operationsMapper[operation];
  }

  return null;
}

module.exports = operation2String;
