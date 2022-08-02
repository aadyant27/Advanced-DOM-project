'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

///////////////////////////////////////
// MODAL WINDOW

//remove hidden class while opening a modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//add hidden class while closing the modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Opening the Modal
btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', openModal);
}
//Closing the Modal
btnCloseModal.addEventListener('click', closeModal);
//clicking on any part of the overlay screen to close the modal
overlay.addEventListener('click', closeModal);
//Pressing ESC to close the modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// SMOOTH SCROLLING
btnScrollTo.addEventListener('click', e => {
  console.log(e.target.getBoundingClientRect());
  console.log(section1.getBoundingClientRect());
  // const s1Coord = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1Coord.left + window.scrollX,
  //   top: s1Coord.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////
// PAGE NAVIGATION using EVENT-DELEGATION

const abc = document
  .querySelector('.nav__links')
  .addEventListener('click', e => {
    if (e.target.classList.contains('nav__link')) {
      //To prevent default behavior of href elements to move to internal-links upon clicking
      e.preventDefault();
      // console.log();
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
//////////////////////////////////////
// TABBED COMPONENTS
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  //Guard Clause
  if (!clicked) return;

  //--Remove active class from
  //-1. Buttons
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  //-2. Content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //--Add active class to
  const data = clicked.dataset.tab;
  //-1. Button
  tabs[data - 1].classList.add('operations__tab--active');
  //-2. Content
  tabsContent[data - 1].classList.add('operations__content--active');
});

//////////////////////////////////////
// FADE IN-OUT ANIMATION(MENU
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //selecting the active element
    const link = e.target;
    //selecting the sibling of the active element
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    //selecting the logo
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// STICKY NAVIGATION: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (thresholdEntries) {
  // console.log(thresholdEntries[0].isIntersecting);
  const [entry] = thresholdEntries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const options1 = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, options1);
headerObserver.observe(header);

///////////////////////////////////////
// REVEAL SECTION

//section--hidden
const sectionAll = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // console.log(entries[0].target);
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    //To disable the 2nd observe event that happens for each intersection
    observer.unobserve(entry.target);
  }
};
const options2 = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealSection, options2);
sectionAll.forEach(section => {
  //Initially hiding all section so that we can reveal them later
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
///////////////////////////////////////
// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const options3 = {
  root: null,
  threshold: 0.5,
};
const imgObserver = new IntersectionObserver(loadImg, options3);
imgTargets.forEach(img => imgObserver.observe(img));
