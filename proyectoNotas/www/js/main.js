// const menu = document.getElementById("menu");
// const content = document.getElementById("content");
// const noteSection = document.getElementById("notes");
// const notes = noteSection.querySelectorAll("li");

// //Functions
// const toggleMenu = e => {
//   content.classList.toggle("menu");
//   content.classList.remove("note");
//   unselectAllNotes();
// };

// // const hideMenu = e => {
// //   content.classList.remove("menu");
// // };

// const selectNote = e => {
//   if (content.classList.contains("menu")) {
//     content.classList.remove("menu");
//     return;
//   }

//   unselectAllNotes();

//   const li = e.currentTarget;
//   li.classList.add("note");

//   // for (const note of notes) {
//   //   note.classList.remove("note");
//   // }

//   // target.classList.add("selected");
// };

// function unselectAllNotes() {
//   for (const note of notes) {
//     note.classList.remove("selected");
//   }
// }

// function unselecNote(e) {
//   e.preventDefault();
//   unselectAllNotes();

//   content.classList.remove("note");
// }
// //Event listeners
// menu.addEventListener("click", toggleMenu);
// // noteSection.addEventListener("click", hideMenu);

// for (const note of notes) {
//   note.addEventListener("click", selectNote);
// }
// back.addEventListener("click", unselecNote);

const content = document.querySelector("section#content");
const menu = document.querySelector("button#menu");
const back = document.querySelector("article#note form button");
const notes = document.querySelectorAll("section#notes ul li");

function unselectAllNotes() {
  for (const note of notes) {
    note.classList.remove("selected");
  }
}

function toggleMenu() {
  content.classList.toggle("menu-visible");
  content.classList.remove("note-visible");
  unselectAllNotes();
}

function selectNote(e) {
  //Si está el menú visible oculta el menú en lugar de seleccionar nota
  if (content.classList.contains("menu-visible")) {
    //valdría ejecutar toggleMenu()
    content.classList.remove("menu-visible");
    return;
  }
  // quitar la clase selected de todos los li
  unselectAllNotes();

  // añadir la clase selected al li que cliqué
  const li = e.currentTarget;
  li.classList.add("selected");
  content.classList.add("note-visible");
}

function unselectNote(e) {
  e.preventDefault();
  unselectAllNotes();

  content.classList.remove("note-visible");
}

// Event listeners
menu.addEventListener("click", toggleMenu);

for (const note of notes) {
  note.addEventListener("click", selectNote);
}

back.addEventListener("click", unselectNote);
