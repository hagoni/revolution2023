
const wrap = document.querySelector('#wrap');
const circle = document.querySelector('.circle');
const squareWrap = document.querySelector('.square_wrap');
const squares = document.querySelectorAll('.square');
const hrTitle = document.querySelector('.hr_title');
let count = 1;
let titleCount = 1;
let opacityCount = 1;
let defaultY = -wrap.getBoundingClientRect().top;


window.addEventListener('scroll', (e) => {
  let currentY = -wrap.getBoundingClientRect().top;
  if(e && (currentY - defaultY > 0)) {
    squares.forEach(el => {
      el.style.transform = `rotate(45deg) scale(${count})`;
    })
    hrTitle.style.transform = `scale(${titleCount})`;
    hrTitle.style.opacity = `${opacityCount}`;
    count = count + 0.2;
    titleCount = titleCount + 0.5;
    // opacityCount = opacityCount - 0.03;
  } else {
    squares.forEach(el => {
      el.style.transform = `rotate(45deg) scale(${count})`;
    })
    hrTitle.style.transform = `scale(${count})`;
    hrTitle.style.opacity = `${opacityCount}`;
    count = count - 0.07;
    titleCount = titleCount - 0.3;
    // opacityCount = opacityCount + 0.03;
  }
  if(titleCount > 10) {
    hrTitle.style.transform = `scale(20)`;
    hrTitle.style.opacity = 0;
  }
  defaultY = currentY;
});