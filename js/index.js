const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const carrosselIds = ["diamante", "topazio", "esmeralda"];
let currentIndex = 0;
let currentCarrossel = 0;
let intervalTime = 4000;
let slideInterval = null;
function showSlide(slides, index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}
function nextSlide(manual = !1) {
    const activeCarousel = document.querySelector(".carousel-slides.active-carousel");
    const slides = activeCarousel.querySelectorAll("img");
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        showSlide(slides, currentIndex);
    } else {
        trocarParaProximoCarrossel();
    }
}
function prevSlide() {
    const activeCarousel = document.querySelector(".carousel-slides.active-carousel");
    const slides = activeCarousel.querySelectorAll("img");
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(slides, currentIndex);
    } else {
        let anterior = (currentCarrossel - 1 + carrosselIds.length) % carrosselIds.length;
        trocarCarrossel(carrosselIds[anterior], !0);
    }
}
function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => nextSlide(!1), intervalTime);
}
function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}
function normalizar(str) {
    return str
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
function trocarCarrossel(tipo, irParaUltimo = !1) {
    const todos = carrosselIds.map((id) => `carousel-${id}`);
    todos.forEach((id) => {
        const el = document.getElementById(id);
        el.classList.remove("active-carousel");
        el.classList.add("hidden");
        const imgs = el.querySelectorAll("img");
        imgs.forEach((img) => img.classList.remove("active"));
    });
    const ativo = document.getElementById(`carousel-${tipo}`);
    const imgs = ativo.querySelectorAll("img");
    ativo.classList.remove("hidden");
    ativo.classList.add("active-carousel");
    currentIndex = irParaUltimo ? imgs.length - 1 : 0;
    imgs[currentIndex].classList.add("active");
    currentCarrossel = carrosselIds.indexOf(tipo);
    const externals = document.querySelectorAll(".carousel-selector-externo button");
    externals.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = [...externals].find((b) => normalizar(b.textContent) === tipo);
    if (activeBtn) activeBtn.classList.add("active");
    const indicadores = document.querySelectorAll(".carousel-label");
    indicadores.forEach((lbl) => {
        lbl.classList.remove("show");
        lbl.classList.add("hidden");
    });
    const atual = document.querySelector(`.carousel-label-${tipo}`);
    if (atual) {
        atual.classList.remove("hidden");
        setTimeout(() => atual.classList.add("show"), 50);
    }
    stopSlideShow();
    startSlideShow();
}
function trocarParaProximoCarrossel() {
    let proximo = (currentCarrossel + 1) % carrosselIds.length;
    trocarCarrossel(carrosselIds[proximo]);
}
nextBtn.addEventListener("click", () => {
    stopSlideShow();
    nextSlide(!0);
    startSlideShow();
});
prevBtn.addEventListener("click", () => {
    stopSlideShow();
    prevSlide();
    startSlideShow();
});
function toggleMenu() {
    const menu = document.querySelector("nav.menu");
    menu.classList.toggle("active");
}
const links = document.querySelectorAll("nav.menu a");
links.forEach((link) => {
    link.addEventListener("click", () => {
        const menu = document.querySelector("nav.menu");
        menu.classList.remove("active");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    trocarCarrossel("diamante");
});
