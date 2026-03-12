// ================= DARK MODE =================
const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  }
});

// ================= RTL TOGGLE =================


const rtlBtn = document.getElementById("rtlToggle");

/* load saved rtl */

if(localStorage.getItem("rtl") === "enabled"){
document.documentElement.setAttribute("dir","rtl");
}

/* toggle rtl */

rtlBtn.addEventListener("click", () => {

const html = document.documentElement;

if(html.getAttribute("dir") === "rtl"){

html.setAttribute("dir","ltr");
localStorage.setItem("rtl","disabled");

}else{

html.setAttribute("dir","rtl");
localStorage.setItem("rtl","enabled");

}

});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".menu-close");

/* open menu */

hamburger.addEventListener("click", ()=>{
navMenu.classList.add("active");
});

/* close menu */

closeBtn.addEventListener("click", ()=>{
navMenu.classList.remove("active");
});

/* dropdown toggle */

document.querySelectorAll(".dropdown > a").forEach(menu => {

menu.addEventListener("click", function(e){

if(window.innerWidth <= 768){

e.preventDefault();
this.parentElement.classList.toggle("open");

}

});

});

/* click outside closes */

document.addEventListener("click", function(e){

if(!navMenu.contains(e.target) && !hamburger.contains(e.target)){
navMenu.classList.remove("active");
}

});


// ================= ACTIVE MENU =================

const currentPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll(".nav-menu a");

menuLinks.forEach(link => {

  const linkPage = link.getAttribute("href").split("/").pop();

  if(linkPage === currentPage){
    link.classList.add("active");
  }

});

/* HOME DROPDOWN ACTIVE */

if(currentPage === "index.html" || currentPage === "home2.html"){

  document.querySelector(".dropdown > a").classList.add("active");

}

const swiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

/* =========================
   SIMPLE LIGHTBOX
========================= */

const instaImages = document.querySelectorAll(".insta-item");

instaImages.forEach(item => {

  item.addEventListener("click", function(e){

    e.preventDefault();

    const imgSrc = this.getAttribute("href");

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img src="${imgSrc}">
    `;

    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });

  });

});
/* =========================
   MENU HERO SLIDER
========================= */

new Swiper(".menuHeroSwiper", {

  slidesPerView:1,
  loop:true,

  autoplay:{
    delay:4000,
    disableOnInteraction:false
  },

  speed:1200,
  effect:"fade",

});
/* =========================
   MENU FILTER
========================= */

const filterButtons = document.querySelectorAll(".menu-filter");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    menuItems.forEach(item => {

      if(filter === "all" || item.dataset.category === filter){
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

    });

  });

});
/* ================= QUICK VIEW MODAL ================= */

const quickButtons = document.querySelectorAll(".quick-view");
const modal = document.getElementById("menuModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".menu-close");

quickButtons.forEach(btn => {

btn.addEventListener("click", function(){

const card = this.closest(".menu-card");

const image = card.querySelector("img").src;
const title = card.querySelector("h3").innerText;
const desc = card.querySelector("p").innerText;

modalImage.src = image;
modalTitle.innerText = title;
modalDescription.innerText = desc;

modal.style.display = "flex";

});

});

/* close */

closeModal.onclick = function(){
modal.style.display = "none";
}

/* click outside */

window.onclick = function(e){
if(e.target === modal){
modal.style.display = "none";
}
}
const form = document.getElementById("bookingForm");
const popup = document.querySelector(".booking-popup");
const closeBtn2 = document.querySelector(".popup-close");

const inputs = form.querySelectorAll("input, textarea");

/* PHONE INPUT BLOCK TEXT */

const phoneInput = form.querySelector("input[name='phone']");

phoneInput.addEventListener("input", function(){

this.value = this.value.replace(/[^0-9]/g,'');

});

/* GUEST VALIDATION */

const guestsInput = form.querySelector("input[name='guests']");

guestsInput.addEventListener("input", function(){

if(this.value < 1){
this.value = 1;
}

});

/* REAL TIME VALIDATION */

inputs.forEach(input => {

input.addEventListener("input", () => {

const group = input.parentElement;

if(input.value.trim() === ""){
group.classList.add("error");
group.classList.remove("success");
}else{
group.classList.remove("error");
group.classList.add("success");
}

});

});

/* FORM SUBMIT */

form.addEventListener("submit", function(e){

e.preventDefault();

let valid = true;

inputs.forEach(input => {

if(input.value.trim() === ""){
valid = false;
input.parentElement.classList.add("error");
}

});

if(!valid) return;

/* SHOW POPUP */

popup.classList.add("active");

/* CONFETTI */

createConfetti();

/* AUTO CLOSE */

setTimeout(()=>{
popup.classList.remove("active");
},3000);

});

/* CLOSE BUTTON */

closeBtn2.addEventListener("click", ()=>{

popup.classList.remove("active");

});

/* CLICK OUTSIDE */

popup.addEventListener("click", function(e){

if(e.target === popup){
popup.classList.remove("active");
}

});

/* CONFETTI */

function createConfetti(){

for(let i=0;i<40;i++){

const confetti = document.createElement("div");
confetti.classList.add("confetti");

confetti.style.left = Math.random()*100 + "vw";

document.body.appendChild(confetti);

setTimeout(()=>{
confetti.remove();
},3000);

}

}
var cateringHero = new Swiper(".cateringHeroSwiper", {

loop:true,

effect:"fade",

autoplay:{
delay:4000,
disableOnInteraction:false,
},

speed:1200,

});
const toggles = document.querySelectorAll(".toggle-password");

toggles.forEach(toggle => {

toggle.addEventListener("click", function(){

const input = this.parentElement.querySelector("input");

if(input.type === "password"){
input.type = "text";
this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
}else{
input.type = "password";
this.innerHTML = '<i class="fa-solid fa-eye"></i>';
}

});

});
const launchDate = new Date("Dec 30, 2026 00:00:00").getTime();

const timer = setInterval(function(){

const now = new Date().getTime();

const distance = launchDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;

},1000);