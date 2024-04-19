import { onClickOutside } from "./components.js";

/* start landing section */
let landing = document.querySelector(".landing");

// periodically update bacground image
const bgImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"].map((elem) => "../img/" + elem);
landing.style.backgroundImage = `url(${bgImages[0]})`;

setInterval(() => {
  let randomIndex = Math.floor(Math.random() * 100) % 4;
  landing.style.backgroundImage = `url(${bgImages[randomIndex]})`;
}, 10000);

// handle nav bar events
let navIcon = document.querySelector(".nav .nav-icon");
let ul = document.querySelector(".nav ul");
navIcon.onclick = () => {
  ul.style.zIndex == 1 ? hideList(ul) : showList(ul);
};

function hideList(ul) {
  ul.style.zIndex = -1;
}

function showList(ul) {
  ul.style.zIndex = 1;
}

let li = document.querySelectorAll(".nav ul li");
li.forEach((li) => {
  li.onclick = () => hideList(ul);
});

onClickOutside(ul, (event) => {
  if (event.target !== navIcon) {
    hideList(ul);
  }
});

/* end landing section */
