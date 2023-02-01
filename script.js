/* -------------- Pour une bare de navigation résponsive ------------------- */
const btnMenu = document.querySelector('.logo-menu');
const menu = document.querySelector('.liste-nav');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('nav-active')
});

const allLinks = document.querySelectorAll('.item-nav');

allLinks.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.toggle('nav-active')
    })
});



/* ------------------- Pour la partie acccueil -------------------- */
/* Variables globales */
let compteur = 0;
/* Compteur qui permet de connaitre l'image sur la quelle on se trouve */
let timer, elements, slides, slideWidth, speed, transition;

window.onload = () => {
    /* on récupère le diaporama */
    const diapo = document.querySelector(".acc-diapo");

    /* on récupère le data-speed */
    speed = diapo.dataset.speed;

    transition = diapo.dataset.transition;

    elements = document.querySelector(".acc-elements");

    /* on clone la 1ère image */
    let firstImage = elements.firstElementChild.cloneNode(true);

    /* on injecte la clone à la fin du diapo */
    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    /* on récoupère la largeure d'un slide */
    slideWidth = diapo.getBoundingClientRect().width;

    /* on récoupère les fleches */
    let next = document.querySelector("#acc-nav-droite");
    let prev = document.querySelector("#acc-nav-gauche");

    /* on gère le click */
    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

    /* on automatiser le défilement */
    timer = setInterval(slideNext, speed);

    /* on gère l'arret et la reprise */
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);
}

/* Cette fonction fait défiler le diaporama vers la droite */
function slideNext() {
    /* on inrémente le compteur */
    compteur++;
    elements.style.transition = transition+"ms linear";

    /* on creér une variable locale pour recouperer la valeur du compteur e la multiplier par la largeure d'un seule slide */
    let decal = -slideWidth * compteur;

    elements.style.transform = `translateX(${decal}px)`;
    /* `` ces symbols (backticks) sont utiliser pour injecter une variable */

    /* on attend la fin de la transition et on "rebobine" de facon cachée */
    setTimeout(function() {
        if(compteur >= slides.length - 1) {
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, transition);
}

/* cette fonction faire défiler le diaporama vers la gauche */
function slidePrev() {
    /* on décrément le compteur */
    compteur--;
    elements.style.transition = transition+"ms linear";

    if(compteur < 0) {
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 1);
    }

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;
}

function stopTimer() {
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(slideNext, speed);
}



/* ------------------- Pour la partie appareils ------------------- */
let tabs = document.querySelectorAll('.app-tab-link');

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        unSelectAll();
        tab.classList.add('app-active');
        let ref = tab.getAttribute('data-ref');
        document.querySelector(`.app-tab-content[data-id="${ref}"]`).classList.add('app-active');
    });
});

function unSelectAll() {
    tabs.forEach(tab => {
        tab.classList.remove('app-active');
    })

    let tabbodies = document.querySelectorAll('.app-tab-content');
    tabbodies.forEach(tab => {
        tab.classList.remove('app-active');
    })
};

document.querySelector('.app-tab-link.app-active').click();