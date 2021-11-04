import axios from "axios";

function setContinentColor(regionName) {
    switch (regionName) {
        case 'Africa':
            return 'blue';
            break;
        case 'Americas':
            return 'green';
            break;
        case 'Asia':
            return 'red';
            break;
        case 'Europe':
            return 'yellow';
            break;
        case 'Oceania':
            return 'purple';
            break;
        default:
            return 'pink';
            break;
    }
}

async function getCountries() {
    try {
        const countryList = await axios.get("https://restcountries.com/v2/all");
        return countryList.data;

    } catch (e) {
        console.error(e);
    }

}

async function createCountryList() {
    let countriesList = await getCountries();
    const listOfCountries = document.getElementById("list-of-countries");

    countriesList.sort((a,b) => {
        return a.population - b.population;
    });

    const countryItems = countriesList.map((country) => {
        let countryColor = setContinentColor(country.region);
        return `
        <li>
            <span class=${countryColor}>
                <img src="${country.flags.png}" alt="Flag of ${country.name}">
                ${country.name}
            </span>
            Has a population of ${country.population} people
        </li>
        `
    })

    listOfCountries.innerHTML = `${countryItems.join('')}`;

}

createCountryList().then();