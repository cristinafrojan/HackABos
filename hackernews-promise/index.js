"use strict";

const axios = require("axios");

axios
  .get("https://hacker-news.firebaseio.com/v0/topstories.json")
  .then(response => {
    const arrayOfTopStoriesIds = response.data;
    const theTen = arrayOfTopStoriesIds.slice(0, 10);

    for (let i = 0; i < theTen.length; i++) {
      const ulrsTen = `https://hacker-news.firebaseio.com/v0/item/${theTen[i]}.json`;

      axios
        .get(ulrsTen)
        .then(response => {
          const details = response.data;

          const { id, time, title } = details;

          const timeIso = new Date(time * 1000).toISOString();

          console.log(id, timeIso, title);
        })
        .catch(err => {
          console.error(err);
        });
    }
  })
  .catch(function(error) {
    console.log(error);
  });
