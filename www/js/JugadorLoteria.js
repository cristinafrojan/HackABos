"use strict";

class Gambler {
  static givePrediction() {
    const prediction = Math.ceil(Math.random() * 50);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(prediction);
      }, prediction * 100);
    });
  }
  static givePredictions(numPredictions) {
    const predictions = [];
    for (let i = 0; i < numPredictions; i++) {
      predictions.push(this.givePrediction());
    }
    return predictions;
  }
}

Promise.all(Gambler.givePredictions(10)).then(values => {
  console.log(values);
});
