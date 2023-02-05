import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', startP);
form.addEventListener('change', () => {
  inpDELAY = +delay.value;
  inpSTEP = +step.value;
  inpAMOUNT = +amount.value;
});

let inpDELAY = 0;
let inpSTEP = 0;
let inpAMOUNT = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, inpDELAY);
  });
}

function startP(e) {
  e.preventDefault();
  for (let i = 1; i <= inpAMOUNT; i++) {
    createPromise(i, inpDELAY)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    inpDELAY += inpSTEP;
  }
}
