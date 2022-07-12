'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

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
