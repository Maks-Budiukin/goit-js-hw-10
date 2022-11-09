import './css/styles.css';
import { fetchCountries } from './fetchCountries';

let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    
    listEl.innerHTML = "";
    infoEl.innerHTML = "";

    const inputVal = event.target.value.trim();

    if(inputVal !== "") {
        fetchCountries(inputVal);
    }
}


