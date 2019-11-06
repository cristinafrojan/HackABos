"use strict";

const foxes = ["fox1", "fox2"];
const chickens = ["chicken1", "chicken2"];
let mixOfAnimals = [];

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Fox extends Animal {
  constructor(name) {
    super(name);
    this.speak = function() {
      console.log("mmmm que rica la gallina");
    };
  }
}

class Chicken extends Animal {
  constructor(name) {
    super(name);
  }
}

class Room {
  constructor(name) {
    this.name = name;
  }

  putInRoom() {
    mixAnimals(putChickens, putFoxes);
    console.log(mixOfAnimals);
  }

  exitTheRoom() {
    console.log(mixOfAnimals);
    let what = mixOfAnimals.map(element => {
      return element.constructor.name;
    });

    for (let i = 0; i < what.length; i++) {
      if (what[i] === what[i + 1]) {
        let newAnimal;
        if (what[0] === "Fox") {
          newAnimal = Fox;
        } else if (what[0] === "Chicken") {
          newAnimal = Chicken;
        }
        mixOfAnimals.push(new newAnimal("nuevo"));
        console.log(mixOfAnimals);
        return mixOfAnimals;
      } else {
        for (let i = 0; i < what.length; i++) {
          if (what[i] === "Chicken") {
            mixOfAnimals.splice(i, 1);
            console.log(mixOfAnimals);
            mixOfAnimals[0].speak();
            return;
          }
        }
      }
    }
  }
}
const putFoxes = foxes.map(element => {
  return new Fox(element);
});

const putChickens = chickens.map(element => {
  return new Chicken(element);
});
// console.log(putFoxes);
// console.log(putChickens);

function mixAnimals(putChickens, putFoxes) {
  let mix = [...putChickens, ...putFoxes];
  let firstAnimal = Math.floor(Math.random() * (mix.length - 1));
  let secondAnimal = Math.floor(Math.random() * (mix.length - 1));
  if (firstAnimal === secondAnimal) {
    secondAnimal = Math.floor(Math.random() * (mix.length - 1));
  }

  // console.log(firstAnimal, secondAnimal);
  // console.log(mix);

  mixOfAnimals.push(mix[firstAnimal], mix[secondAnimal]);
  return mixOfAnimals;
}

const myRoom = new Room("kitchen");
myRoom.putInRoom();
myRoom.exitTheRoom();
