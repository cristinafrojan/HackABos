"use strict";

const http = require("http");
const qs = require("querystring");

function sum(n1, n2) {
  return n1 + n2;
}
function sub(n1, n2) {
  return n1 - n2;
}

function mul(n1, n2) {
  return n1 * n2;
}

function div(n1, n2) {
  if (n2 === 0) {
    throw new Error("No se puede dividir por 0");
  }

  return n1 / n2;
}

const server = http.createServer((req, res) => {
  const timeInit = process.hrtime();

  const url = req.url;
  const method = req.method;

  console.log(url, method);

  if (method !== "GET") {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.writeHead(405, {
      "x-request-time": `${seconds}.${nanoseconds / 1000000}s`
    });
    return res.end();
  }

  const [pathname, stringParams] = url.split("?");
  const validPathnames = [
    "/operacion/sum",
    "/operacion/sub",
    "/operacion/mul",
    "/operacion/div"
  ];

  if (validPathnames.includes(pathname) === false) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.writeHead(404, {
      "content-type": "text/plain",
      "x-request-time": `${seconds * 1000 + nanoseconds / 1000000}ms`
    });
    res.end(
      "La operación no es correcta, debe ser: /operación/[sum|sub|mul|div]"
    );
  }

  const params = qs.parse(stringParams);
  const n1 = parseFloat(params.n1);
  const n2 = parseFloat(params.n2);

  if (isNaN(n1) || isNaN(n2)) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.writeHead(400, {
      "content-type": "text/plain",
      "x-request-time": `${seconds * 1000 + nanoseconds / 1000000}ns`
    });
    res.end("n1 y n2 deben ser valores numéricos");
  }

  const [, , operacion] = pathname.split("/");
  let resultado;
  try {
    if (operacion === "sum") {
      resultado = sum(n1, n2);
    } else if (operacion === "sub") {
      resultado = sub(n1, n2);
    } else if (operacion === "mul") {
      resultado = mul(n1, n2);
    } else if (operacion === "div") {
      resultado = div(n1, n2);
    }

    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.writeHead(200, {
      "content-type": "text-plain",
      "x-request-time": `${seconds * 1000 + nanoseconds / 1000000}ms`
    });
    const operacionesNombre = {
      sum: "sumar",
      sub: "restar",
      mul: "multiplicar",
      div: "dividir"
    };

    const output = {
      resultado,
      operacion: operacionesNombre[operacion]
    };

    return res.end(JSON.stringify(output));
  } catch (e) {
    const [seconds, nanoseconds] = process.hrtime(timeInit);
    res.writeHead(409, {
      "content-type": "text-plain",
      "x-request-time": `${seconds * 1000 + nanoseconds / 1000000}ms`
    });

    return res.end(e.message);
  }
});
server.listen(3002, "localhost", err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  console.log("server listening!");
});
