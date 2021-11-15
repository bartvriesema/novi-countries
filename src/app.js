import axios from "axios";

async function getCountries() {
    try {
        const countryList = await axios.get("https://restcountries.com/v2/all");
        createCountryList(countryList.data);

    } catch (e) {
        console.error(e);
    }

}

function createCountryList(countriesList) {
    const listOfCountries = document.getElementById("list-of-countries");

    countriesList.sort((a,b) => {
        return a.population - b.population;
    });

    const countryItems = countriesList.map((country) => {
        return `
        <li>
            <span class=${country.region.toLowerCase()}>
                <img class="country-flag" src="${country.flags.png}" alt="Flag of ${country.name}">
                ${country.name}
            </span>
            Has a population of ${country.population} people
        </li>
        `
    })

    listOfCountries.innerHTML = `${countryItems.join('')}`;

}

getCountries();