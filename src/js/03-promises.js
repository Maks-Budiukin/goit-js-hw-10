import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitBtn = document.querySelector('[type="submit"]');
const formEl = document.querySelector('.form');

submitBtn.addEventListener('click', onClick);

let delayVal = 0;
let stepVal = 0;
let amountVal = 0;

function onClick() {
    event.preventDefault();
      
    delayVal = Number(formEl.delay.value);
    stepVal = Number(formEl.step.value);
    amountVal = Number(formEl.amount.value);

    for (let i = 1; i <= amountVal; i += 1) {
        
        createPromise(i, delayVal);
        delayVal += stepVal;
    }

    
}

function createPromise(position, delay) {

    
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {

            setTimeout(() => {

                if (shouldResolve) {
                    resolve({ position, delay });
                } else {
                    reject({ position, delay });
                }

            }, delayVal)   
        });

        promise
            .then(({ position, delay }) => {
                Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`Rejected promise ${position} in ${delay}ms`);
            });
    }




