const sliderContainer = document.querySelector('.slider-container');
const leftSlide = document.querySelector('.left-slide');
const rightSlide = document.querySelector('.right-slide');
const leftSlides = leftSlide.querySelectorAll('div');
const rightSlides = rightSlide.querySelectorAll('div');
const slidesLength = leftSlides.length;

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

sliderContainer.addEventListener('click', changeSlide)

function changeSlide(event) {
  leftSlide.classList.add('shifting');
  rightSlide.classList.add('shifting');

  const target = event.target.closest('.button');

  if(!allowShift) return;

  if (target.classList.contains('up-button')) {
    currentSlide++;
    rightSlide.style.top = `-${100 * (currentSlide + 1)}vh`;
    leftSlide.style.top = `-${100 * (slidesLength - currentSlide)}vh`;
  }
  else {
    currentSlide--;
    rightSlide.style.top = `-${100 * (currentSlide + 1)}vh`;
    leftSlide.style.top = `-${100 * (slidesLength - currentSlide)}vh`;
  }

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