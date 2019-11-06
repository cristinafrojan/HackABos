const menu = document.getElementById("menu");
const content = document.getElementById("content");
const noteSection = document.getElementById("notes");
const notes = noteSection.querySelectorAll("li");

//Functions
const toggleMenu = e => {
  content.classList.toggle("menu");
};

const hideMenu = e => {
  content.classList.remove("menu");
};

const selectNote = e => {
  if (content.classList.contains("menu")) return;

  const target = e.currentTarget;

  for (const note of notes) {
    note.classList.remove("selected");
  }

  target.classList.add("selected");
};

//Event listeners
menu.addEventListener("click", toggleMenu);
noteSection.addEventListener("click", hideMenu);

for (const note of notes) {
  note.addEventListener("click", selectNote);
}
