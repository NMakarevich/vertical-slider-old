const carousel = document.querySelector('.container');
const firstSlider = document.querySelector('.first-slider');
const secondSlider = document.querySelector('.second-slider');
const firstSliderContainer = firstSlider.querySelector('.slider-container');
const secondSliderContainer = secondSlider.querySelector('.slider-container')
const firstSlides = firstSliderContainer.querySelectorAll('div');
const secondSlides = secondSliderContainer.querySelectorAll('div');
const slidesLength = firstSlides.length;
const toggler = document.querySelector('.toggle');
const after = toggler.querySelector('.after');
let startPosX, startPosY, endPosX, endPosY

const cloneFirstLeft = firstSlides[0].cloneNode(true);
const cloneLastLeft = firstSlides[slidesLength - 1].cloneNode(true);
const cloneFirstRight = secondSlides[0].cloneNode(true);
const cloneLastRight = secondSlides[slidesLength - 1].cloneNode(true);

firstSliderContainer.appendChild(cloneFirstLeft);
firstSliderContainer.insertBefore(cloneLastLeft, firstSlides[0]);
secondSliderContainer.appendChild(cloneFirstRight);
secondSliderContainer.insertBefore(cloneLastRight, secondSlides[0]);

let currentSlide = 0;
let allowShift = true;

function init() {
  firstSliderContainer.style = '';
  secondSliderContainer.style = ''
  if (carousel.classList.contains('vertical-slider')) {
    firstSliderContainer.style.top = `-${100 * (slidesLength)}vh`
    secondSliderContainer.style.top = `-100vh`
  }
  if (carousel.classList.contains('horizontal-slider')) {
    firstSliderContainer.style.left = `-${100 * slidesLength}vw`
    secondSliderContainer.style.left = `-100vw`
  }
}

toggler.addEventListener('change', ()=> {
    carousel.classList.toggle('vertical-slider');
    carousel.classList.toggle('horizontal-slider');
    firstSliderContainer.style = '';
    secondSliderContainer.style = ''
    slideMove();
})

init();

carousel.addEventListener('click', changeSlide);
carousel.addEventListener('pointerdown', pointerDown);
carousel.addEventListener('pointerup', pointerUp);
document.addEventListener('keyup', keyUp);

function keyUp(event) {
  const keyCode = event.code;
  if (keyCode == 'ArrowUp' || keyCode == 'ArrowLeft') {
    slideForward();
  }
  if(keyCode == 'ArrowDown' || keyCode == 'ArrowRight') {
    slideBackward();
  }
}

function changeSlide(event) {
  firstSliderContainer.classList.add('shifting');
  secondSliderContainer.classList.add('shifting');

  const target = event.target.closest('.button');

  if(!allowShift || !target) return;

  if (target.classList.contains('up-button')) {
    slideForward();
  }
  else {
    slideBackward();
  }

  allowShift = false;
} 

function pointerDown(evt) {
  startPosX = evt.clientX;
  startPosY = evt.clientY;
}

function pointerUp(evt) {
  endPosX = evt.clientX;
  endPosY = evt.clientY;
  if (startPosY - endPosY > 100 || startPosX - endPosX > 100) {
    slideForward();
  }
  if (startPosY - endPosY < -100 || startPosX - endPosX < -100) {
    slideBackward();
  }
}

function addShiftingClass() {
  firstSliderContainer.classList.add('shifting');
  secondSliderContainer.classList.add('shifting');
}

function removeShiftingClass() {
  firstSliderContainer.classList.remove('shifting');
  secondSliderContainer.classList.remove('shifting');
}

function slideForward() {
  addShiftingClass()
  currentSlide++;
  slideMove()
  allowShift = false;
}

function slideBackward() {
  addShiftingClass()
  currentSlide--;
  slideMove()
  allowShift = false;
}

function slideMove() {
  if (carousel.classList.contains('vertical-slider')) {
    secondSliderContainer.style.top = `-${100 * (currentSlide + 1)}vh`;
    firstSliderContainer.style.top = `-${100 * (slidesLength - currentSlide)}vh`;
  }
  if (carousel.classList.contains('horizontal-slider')) {
    secondSliderContainer.style.left = `-${100 * (currentSlide + 1)}vw`;
    firstSliderContainer.style.left = `-${100 * (slidesLength - currentSlide)}vw`;
  }
  let slideIndex = currentSlide == -1 ? slidesLength - 1 : currentSlide == slidesLength ? 0 : currentSlide;
  after.style.backgroundColor = Array.from(firstSlides)[slidesLength - slideIndex - 1].style.backgroundColor
}

firstSliderContainer.addEventListener('transitionend', () => {
  removeShiftingClass()
  if (currentSlide == slidesLength) {
    init();
    currentSlide = 0;
  }
  
  allowShift = true;
})

secondSliderContainer.addEventListener('transitionend', () => {
  removeShiftingClass()
  if (currentSlide == -1) {
    if (carousel.classList.contains('vertical-slider')) {
      firstSliderContainer.style.top = `-100vh`
      secondSliderContainer.style.top = `-${100 * (slidesLength)}vh`
    }
    if (carousel.classList.contains('horizontal-slider')) {
      firstSliderContainer.style.left = `-100vw`
      secondSliderContainer.style.left = `-${100 * slidesLength}vw`
    }
    currentSlide = slidesLength - 1;
  }
})