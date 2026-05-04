// ================= DARK MODE =================
const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

if (themeBtn && themeIcon) {
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    // In dark mode, show the sun to indicate switching back to light.
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      // Show sun icon when dark mode is active.
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      // Show moon icon when light mode is active.
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

// ================= RTL TOGGLE =================


const rtlBtn = document.getElementById("rtlToggle");

if (rtlBtn) {
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
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".nav-menu .menu-close");
const navWrapper = document.querySelector(".nav-wrapper");
const navActions = document.querySelector(".nav-actions");
const compactNavBreakpoint = 1023;
let navActionsPlaceholder = null;

if (navWrapper && navActions) {
  navActionsPlaceholder = document.createComment("nav-actions-placeholder");
  navWrapper.insertBefore(navActionsPlaceholder, navActions);
}

function isCompactNav() {
  return window.innerWidth <= compactNavBreakpoint;
}

function syncNavActionsPlacement() {
  if (!navMenu || !navWrapper || !navActions) {
    return;
  }

  if (isCompactNav()) {
    if (navActions.parentElement !== navMenu) {
      navMenu.appendChild(navActions);
    }
    return;
  }

  if (navActions.parentElement !== navWrapper) {
    if (navActionsPlaceholder) {
      navWrapper.insertBefore(navActions, navActionsPlaceholder.nextSibling);
    } else {
      navWrapper.appendChild(navActions);
    }
  }

  navMenu.classList.remove("active");
  document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
    dropdown.classList.remove("open");
  });
}

syncNavActionsPlacement();
window.addEventListener("resize", syncNavActionsPlacement);

/* open menu */

if (hamburger && navMenu) {
  hamburger.addEventListener("click", ()=>{
    navMenu.classList.add("active");
  });
}

/* close menu */

if (closeBtn && navMenu) {
  closeBtn.addEventListener("click", ()=>{
    navMenu.classList.remove("active");
  });
}

/* dropdown toggle */

document.querySelectorAll(".dropdown > a").forEach(menu => {

menu.addEventListener("click", function(e){

if(isCompactNav()){

e.preventDefault();
this.parentElement.classList.toggle("open");

}

});

});

/* click outside closes */

document.addEventListener("click", function(e){
  if(navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)){
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
  const dropdownLink = document.querySelector(".dropdown > a");
  if (dropdownLink) {
    dropdownLink.classList.add("active");
  }

}

const testimonialSwiper = document.querySelector(".testimonialSwiper");
if (testimonialSwiper) {
  new Swiper(".testimonialSwiper", {
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
}

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

const menuHeroSwiper = document.querySelector(".menuHeroSwiper");
if (menuHeroSwiper) {
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
}
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
const closeModal = document.querySelector("#menuModal .menu-close");

if (quickButtons.length && modal && modalImage && modalTitle && modalDescription) {
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
}

/* close */

if (closeModal && modal) {
  closeModal.onclick = function(){
    modal.style.display = "none";
  };
}

/* click outside */

if (modal) {
  window.addEventListener("click", function(e){
    if(e.target === modal){
      modal.style.display = "none";
    }
  });
}
const form = document.getElementById("bookingForm");
const popup = document.querySelector(".booking-popup");
const closeBtn2 = document.querySelector(".popup-close");

if (form && popup) {
  const inputs = form.querySelectorAll("input, textarea");

  /* PHONE INPUT BLOCK TEXT */

  const phoneInput = form.querySelector("input[name='phone']");

  if (phoneInput) {
    phoneInput.addEventListener("input", function(){
      this.value = this.value.replace(/[^0-9]/g,'');
    });
  }

  /* GUEST VALIDATION */

  const guestsInput = form.querySelector("input[name='guests']");

  if (guestsInput) {
    guestsInput.addEventListener("input", function(){
      if(this.value < 1){
        this.value = 1;
      }
    });
  }

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

  if (closeBtn2) {
    closeBtn2.addEventListener("click", ()=>{
      popup.classList.remove("active");
    });
  }

  /* CLICK OUTSIDE */

  popup.addEventListener("click", function(e){
    if(e.target === popup){
      popup.classList.remove("active");
    }
  });
}

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
const cateringHeroSwiper = document.querySelector(".cateringHeroSwiper");
if (cateringHeroSwiper) {
  new Swiper(".cateringHeroSwiper", {
    loop:true,
    effect:"fade",
    autoplay:{
      delay:4000,
      disableOnInteraction:false,
    },
    speed:1200,
  });
}
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
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {
  const launchDate = new Date("Dec 30, 2026 00:00:00").getTime();

  setInterval(function(){

    const now = new Date().getTime();

    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;

  },1000);
}
