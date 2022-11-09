import { Notify } from "notiflix";

const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

export function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(data => {
            let countries = data;

            for (let { name: {official: countryName}, capital, population, flags: {svg: flag}, languages } of countries) {
                    if (countries.length > 1 && countries.length < 11) {
                        listEl.insertAdjacentHTML('beforeend', `
                    <li>
                    <img src="${flag}", width="70"></img>
                    <span class="country-info__entry">${countryName}</span>
                    </li>`);
                    } else if (countries.length === 1) {
                        infoEl.insertAdjacentHTML('beforeend', `
                        <div class="country-info__name">
                        <img src="${flag}", width="70"></img>
                        <span class="country-info__entry">${countryName}</span>
                        </div>
                        <p><span class="country-info__entry">Capital:</span> ${capital}</p>
                        <p><span class="country-info__entry">Population:</span> ${population}</p>
                        <p><span class="country-info__entry">Languages:</span> ${Object.values(languages)}</p>
                        `)
                        
                    } else {
                        Notify.info("Too many matches found. Please enter a more specific name.");
                        return;
                    }
                
            }
            // countries.map(country => listEl.insertAdjacentHTML('beforeend', `<img src="${country.flags.svg}", width="250"></img>`))
        })
        .catch((error) => {
            
                Notify.failure('Oops, there is no country with that name');
            console.log(error);
    })
}

