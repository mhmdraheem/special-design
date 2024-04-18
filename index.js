import { onClickOutside } from "./components.js";

// update landing section background
let landing = document.querySelector(".landing");
const imgsPath = "../img/";
const bgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

// initial background
landing.style.backgroundImage = `url(${imgsPath}${bgs[0]})`;
setInterval(() => {
  let randomIndex = Math.floor(Math.random() * 100) % 4;
  landing.style.backgroundImage = `url(${imgsPath}${bgs[randomIndex]})`;
}, 10000);

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
  //li.style.color = "green"; // test color
});

onClickOutside(ul, (event) => {
  if (event.target !== navIcon) {
    hideList(ul);
  }
});
