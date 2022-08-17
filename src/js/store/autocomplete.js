import { getCountries, getCities } from '../services/location';
import UI from '../config/ui.config';

const { signUpFromFields } = UI;
const inputCountry = signUpFromFields.inputCountry;
const inputCity = signUpFromFields.inputCity;
const listGroup = document.querySelector('.list-group-country');
const listGroupCity = document.querySelector('.list-group-city');
let idCountry;

async function getInputSelectCountry(countriesList) {
  const countriesCountriesArray = [];
  const countryObj = Object.entries(countriesList).reduce((acc, country) => {
    acc[country[1]] = {
      id: country[0],
      country: country[1],
    };
    return acc;
  }, {});

  removeItemTemplates();
  renderCountries(countryObj, countriesCountriesArray);
}

async function renderCountries(arrayCountries, currentArray) {
  const fragment = document.createDocumentFragment();

  for (let country in arrayCountries) {
    if (
      country.toLowerCase().startsWith(inputCountry.value.toLowerCase()) &&
      inputCountry.value != ''
    ) {
      let countryObj = arrayCountries[country];
      currentArray.push([countryObj.country, countryObj.id]);

      if (currentArray.length > 4) return;
      getItemTemplateCountries(country, fragment, currentArray);
    }
  }
  listGroup.appendChild(fragment);
}

async function getItemTemplateCountries(country, fragment, currentArray) {
  let listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.style.cursor = 'pointer';
  listItem.onclick = function () {
    displayNames(country, currentArray);
    removeItemTemplates();
  };

  let word = '<b>' + country.substring(0, inputCountry.value.length) + '</b>';
  word += country.substring(inputCountry.value.length);
  listItem.innerHTML = word;
  fragment.appendChild(listItem);
}

async function displayNames(coutry, currentArray) {
  inputCountry.value = coutry;

  currentArray.forEach(([key, value]) => {
    if (key.toLowerCase() === inputCountry.value.toLowerCase()) {
      inputCity.disabled = false;
      idCountry = value;
    }
  });
}

export async function getAutocompleteTemplateCities() {
  try {
    const citiesList = await getCities(idCountry);
    await getInputSelectCities(citiesList);
  } catch (err) {
    console.log(err);
  }
}

function getInputSelectCities(citiesList) {
  let citiesArray = [];
  const citiesObj = Object.entries(citiesList).reduce((acc, city) => {
    acc[city[1]] = {
      id: city[0],
      city: city[1],
    };
    return acc;
  }, {});

  inputCity.addEventListener('input', () => {
    renderCities(citiesObj, citiesArray);
  });
}

function renderCities(Cities, currentArray) {
  const fragment = document.createDocumentFragment();
  removeItemTemplates();
  for (let city in Cities) {
    if (
      city.toLowerCase().startsWith(inputCity.value.toLowerCase()) &&
      inputCity.value != ''
    ) {
      let cityObj = Cities[city];
      currentArray.push([cityObj.city, cityObj.id]);

      if (currentArray.length > 4) return;
      getItemTemplateCities(city, fragment, currentArray);
    }
  }
  listGroupCity.appendChild(fragment);
}

async function getItemTemplateCities(city, fragment, currentArray) {
  let listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.style.cursor = 'pointer';
  listItem.onclick = function () {
    displayNamesCity(city, currentArray);
    removeItemTemplates();
  };

  let word = '<b>' + city.substring(0, inputCity.value.length) + '</b>';
  word += city.substring(inputCity.value.length);
  listItem.innerHTML = word;
  fragment.appendChild(listItem);
}

async function displayNamesCity(city, currentArray) {
  inputCity.value = city;
}

async function removeItemTemplates() {
  let items = document.querySelectorAll('.list-group-item');
  items.forEach((item) => item.remove());
}

export async function getAutocompleteTemplate() {
  try {
    const countriesList = await getCountries();
    await getInputSelectCountry(countriesList);
  } catch (err) {
    console.log(err);
  }
}
