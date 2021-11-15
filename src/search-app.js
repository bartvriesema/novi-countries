import axios from "axios";

async function fetchCountryInformation(country) {
    try {
        const countryUrl = "https://restcountries.com/v2/name/" + country;
        const countryInfo = await axios.get(countryUrl);
        console.log(countryInfo.data);
        createCountryInfo(countryInfo.data);
    } catch (e) {
        console.error(e);
        countryNotFound();
    }
}

function countryNotFound() {
    const warningText = document.getElementById("country-not-found-warning");
    const countryInfo = document.getElementById("country-info-found");
    warningText.innerText = "Country not found";
    countryInfo.innerText = "";
}

function countryCurrency(country) {
    let currencyText = "";
    for (let i = 0; i < country.currencies.length; i++) {
        if (i > 0 && i < country.currencies.length) {
            currencyText += " and ";
        }
        currencyText += country.currencies[i].name;
    }
    return currencyText;
}

function createCountryInfo(countryFound) {
    const countryInfo = document.getElementById("country-info-found");
    const warningText = document.getElementById("country-not-found-warning");
    warningText.innerText = "";

    const countryItem = countryFound.map((country) => {

        return `
        <span id="country-info">
            <div class="${country.region.toLowerCase()}">
                <img class="country-flag" src="${country.flags.png}" alt="Flag of ${country.name}">
                ${country.name}</div>
            <div class="country-info-text">${country.name} is situated in ${country.subregion}. It has a population of ${country.population}.</div>
            <div class="country-info-text">The capital is ${country.capital} and you can pay with ${countryCurrency(country)}.</div>
        </span>
        `

    })

    countryInfo.innerHTML = `${countryItem.join('')}`;
}

const searchBoxText = document.getElementById("country-search-text");
const searchBoxButton = document.getElementById("country-search-button");

searchBoxButton.addEventListener('click', () => {
    fetchCountryInformation(searchBoxText.value);
});