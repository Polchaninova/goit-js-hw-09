import Notiflix from 'notiflix';

const refs = {
  btnSub: document.querySelector('.btnSub'),
  firstDelay: document.querySelector('.first-delay'),
  delayStep: document.querySelector('.delay-step'),
  amount: document.querySelector('.amount'),

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((res, rej) => {
      // Fulfill
      setTimeout(() => {
        res({ position, delay })

      }, delay)
    })
  } else {
    // Reject
    return new Promise((res, rej) => {
      setTimeout(() => {

        // Reject
        rej({ position, delay })

      }, delay)
    })
  }
}

refs.btnSub.addEventListener('click', function (e) {
  e.preventDefault();

  const delayStep = parseInt(refs.delayStep.value);
  const firstDelay = parseInt(refs.firstDelay.value);
  const amount = parseInt(refs.amount.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, firstDelay + delayStep * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      })
  }

});