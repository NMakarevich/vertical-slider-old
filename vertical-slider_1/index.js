const sliderContainer = document.querySelector('.slider-container');
const leftSlide = document.querySelector('.left-slide');
const rightSlide = document.querySelector('.right-slide');
const leftSlides = leftSlide.querySelectorAll('div');
const rightSlides = rightSlide.querySelectorAll('div');
const slidesLength = leftSlides.length;
let startPosX, startPosY, endPosX, endPosY

const cloneFirstLeft = leftSlides[0].cloneNode(true);
const cloneLastLeft = leftSlides[slidesLength - 1].cloneNode(true);
const cloneFirstRight = rightSlides[0].cloneNode(true);
const cloneLastRight = rightSlides[slidesLength - 1].cloneNode(true);

leftSlide.appendChild(cloneFirstLeft);
leftSlide.insertBefore(cloneLastLeft, leftSlides[0]);
rightSlide.appendChild(cloneFirstRight,);
rightSlide.insertBefore(cloneLastRight, rightSlides[0]);

let currentSlide = 0;
let allowShift = true;

leftSlide.style.top = `-${100 * (slidesLength)}vh`
rightSlide.style.top = `-100vh`

sliderContainer.addEventListener('click', changeSlide);
sliderContainer.addEventListener('pointerdown', pointerDown);
sliderContainer.addEventListener('pointerup', pointerUp);
document.addEventListener('keyup', keyUp);

function keyUp(event) {
  const keyCode = event.code;
  if (keyCode == 'ArrowUp') {
    slideUp();
  }
  if(keyCode == 'ArrowDown') {
    slideDown();
  }
}

function changeSlide(event) {
  leftSlide.classList.add('shifting');
  rightSlide.classList.add('shifting');

  const target = event.target.closest('.button');

  if(!allowShift || !target) return;

  if (target.classList.contains('up-button')) {
    slideUp();
  }
  else {
    slideDown();
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
  if (Math.abs(startPosX - endPosX) > 50 || Math.abs(startPosY - endPosY) < 100) return;
  if (startPosY - endPosY < 0) {
    slideDown();
  }
  else if (startPosY - endPosY > 0) {
    slideUp();
  }
  else return;
}

function slideUp() {
  leftSlide.classList.add('shifting');
  rightSlide.classList.add('shifting');
  currentSlide++;
  rightSlide.style.top = `-${100 * (currentSlide + 1)}vh`;
  leftSlide.style.top = `-${100 * (slidesLength - currentSlide)}vh`;
  allowShift = false;
}

function slideDown() {
  leftSlide.classList.add('shifting');
  rightSlide.classList.add('shifting');
  currentSlide--;
  rightSlide.style.top = `-${100 * (currentSlide + 1)}vh`;
  leftSlide.style.top = `-${100 * (slidesLength - currentSlide)}vh`;
  allowShift = false;
}

leftSlide.addEventListener('transitionend', () => {
  leftSlide.classList.remove('shifting');
  rightSlide.classList.remove('shifting');
  if (currentSlide == slidesLength) {
    leftSlide.style.top = `-${100 * (slidesLength)}vh`
    rightSlide.style.top = `-100vh`
    currentSlide = 0;
  }
  
  allowShift = true;
})

rightSlide.addEventListener('transitionend', () => {
  leftSlide.classList.remove('shifting');
  rightSlide.classList.remove('shifting');
  if (currentSlide == -1) {
    leftSlide.style.top = `-100vh`
    rightSlide.style.top = `-${100 * (slidesLength)}vh`
    currentSlide = slidesLength - 1;
  }
})
