
const wrap = document.querySelector('#wrap');
const circle = document.querySelector('.circle');
const squareWrap1 = document.querySelector('.square_1_wrap');
const squares1 = document.querySelectorAll('.square_1');
const squares2 = document.querySelectorAll('.square_2');
const hrTitle = document.querySelector('.hr_title');
let count = 1;
let titleCount = 1;
let opacityCount = 1;
let defaultY = -wrap.getBoundingClientRect().top;


window.addEventListener('scroll', () => {
  squares1.forEach(el => {
    el.style.transform = 'scale(30) rotate(2000deg)';
  })
  squares2.forEach(el => {
    el.style.transform = 'scale(30) rotate(2000deg)';
  })
});