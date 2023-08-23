
const browserHeight = window.innerHeight;
const circle = document.querySelector('.circle');
const sectionFirstHeight = document.querySelector('.first').getBoundingClientRect().height;
const sectionCircleHeight = document.querySelector('.circle_section').getBoundingClientRect().height;
const aniSection = sectionCircleHeight - sectionFirstHeight;
const maxWidth = 400;
const maxHeight = 400;
window.addEventListener('scroll', () => {
  let scrollPercent = 100 * (window.scrollY - sectionFirstHeight) / (sectionCircleHeight - browserHeight);
  console.log(scrollPercent);
  if(scrollPercent > 0) {
    circle.style.width = `${(scrollPercent) * maxWidth / 100}vw`;
    circle.style.height = `${(scrollPercent) * maxHeight / 100}vw`;
    circle.style.opacity = `${(scrollPercent) * 20 / 100}`;
  }
  if(scrollPercent <= 0) {
    circle.style.width = 0;
    circle.style.height = 0;
    circle.style.opacity = 0;
  }

})