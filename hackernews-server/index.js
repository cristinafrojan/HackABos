"use strict";

const express = require("express");
const axios = require("axios");

const app = express();

const puerto = 3000;

function parseNewsDetails(axiosResponde) {
  const details = axiosResponde.data;

  const { id, time, title } = details;

  const timeIso = new Date(time * 1000).toISOString();

  const storyDetail = {
    id,
    time: timeIso,
    title
  };

  return storyDetail;
}

function parseAllStoriesDetail(storiesDetailsResponse) {
  return storiesDetailsResponse.map(parseNewsDetails);
}

function processTopStoriesRequest(req, res) {
  axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(response => {
      const arrayOfTopStoriesIds = response.data;
      const theMostTop10Ids = arrayOfTopStoriesIds.slice(0, 10);

      const storyResponsesPromises = theMostTop10Ids.map(storyId => {
        const urlDetail = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;

        return axios.get(urlDetail);
      });

      return Promise.all(storyResponsesPromises);
    })
    .then(parseAllStoriesDetail)
    .then(arrayOfStories => {
      res.status(200).send(arrayOfStories);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
}

app.get("/stories/top", processTopStoriesRequest);

app.get("/operacion/:operation", function doOperation(req, res) {
  const { operation } = req.params;
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);

  const validOperations = ["sum", "sub", "div", "mul"];

  if (!validOperations.includes(operation)) {
    return res.status(400).send("Operation is not valid");
  }
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).send("n1 y n2 must be numerical values");
  }
  try {
    let result;
    if (operation === "sum") {
      result = n1 + n2;
    } else if (operation === "sub") {
      result = n1 - n2;
    } else if (operation === "div") {
      if (n2 === 0) {
        throw new Error("You cannot divide by 0");
      }
      result = n1 / n2;
    } else if (operation === "mul") {
      result = n1 * n2;
    }
    const operacionesNombre = {
      sum: "Sumar",
      sub: "Restar",
      div: "Dividir",
      mul: "Multiplicar"
    };
    const output = {
      result,
      operacion: operacionesNombre[operation]
    };

    return res.send(output);
  } catch (e) {
    return res.status(409).send(e.message);
  }
});

app.listen(puerto, err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  console.log(`Server listening on port ${puerto}`);
});
