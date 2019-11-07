"use strict";

const express = require("express");

const app = express();

function sum(n1, n2, callback) {
  setTimeout(() => {
    const result = n1 + n2;
    return callback(null, result);
  }, 2000);
}

function sub(n1, n2, callback) {
  setTimeout(() => {
    const result = n1 - n2;
    return callback(null, result);
  }, 2000);
}

function mul(n1, n2, callback) {
  setTimeout(() => {
    const result = n1 * n2;
    return callback(null, result);
  }, 2000);
}

function div(n1, n2, callback) {
  setTimeout(() => {
    const result = n1 / n2;
    return callback(null, result);
  }, 2000);
}
function mostrar(err, result) {
  if (err) {
    return console.error(err);
  }
  console.log(result);
}

app.get("/operacion/:tipoOperacion", (req, res) => {
  const timeInit = process.hrtime();
  const { tipoOperacion } = req.params;

  const operacionesValidas = ["sum", "sub", "mul", "div"];

  if (!operacionesValidas.includes(tipoOperacion)) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.setHeader("content-type", "text/plain");
    res.setHeader(
      "x-request-time",
      `${seconds * 1000 + nanoseconds / 1000000}ms`
    );
    return res
      .status(404)
      .send(
        "La operacion no es correcta, debe ser: /operacion/[sum|sub|mul|div]"
      );
  }

  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);
  if (isNaN(n1) || isNaN(n2)) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.setHeader("content-type", "text/plain");
    res.setHeader(
      "x-request-time",
      `${seconds * 1000 + nanoseconds / 1000000}ms`
    );
    return res.status(400).send("n1 y n2 deben ser valores numéricos");
  }

  try {
    let resultado;

    if (tipoOperacion === "sum") {
      resultado = sum(n1, n2, mostrar);
    } else if (tipoOperacion === "sub") {
      resultado = sub(n1, n2, mostrar);
    } else if (tipoOperacion === "mul") {
      resultado = mul(n1, n2, mostrar);
    } else if (tipoOperacion === "div") {
      resultado = div(n1, n2, mostrar);
    }

    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.setHeader(
      "x-request-time",
      `${seconds * 1000 + nanoseconds / 1000000}ms`
    );

    const operacionesNombre = {
      sum: "sumar",
      sub: "restar",
      mul: "multiplicar",
      div: "dividir"
    };
    const output = {
      resultado,
      operacion: operacionesNombre[tipoOperacion]
    };

    return res.send(output);
  } catch (e) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.setHeader("content-type", "text/plain");
    res.setHeader(
      "x-request-time",
      `${seconds * 1000 + nanoseconds / 1000000}ms`
    );

    return res.status(409).send(e.message);
  }
});

app.use((req, res, next) => {
  const [seconds, nanoseconds] = process.hrtime(timeInit);
  const method = req.method;
  if (method !== "GET") {
    res.setHeader("content-type", "text/plain");
    res.setHeader(
      "x-request-time",
      `${seconds * 1000 + nanoseconds / 1000000}ms`
    );
    return res.status(405).send("No estás utilizando el método correcto");
  }

  res.setHeader("content-type", "text/plain");
  res.setHeader(
    "x-request-time",
    `${seconds * 1000 + nanoseconds / 1000000}ms`
  );
  return res.status(404).send("Ruta incorrecta");
});
const port = 3002;
app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  console.log(`Server listening at port ${port}`);
});
