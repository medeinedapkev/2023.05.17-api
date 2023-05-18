const informationForm = document.querySelector('#information-by-name-form');
const selectCountry = document.querySelector('#country');
const textName = document.querySelector('.name-text');
const textAge = document.querySelector('.age-text');
const textGender = document.querySelector('.gender-text');
const textProbability = document.querySelector('.probability');
const textNationality = document.querySelector('.nationality');

function getCountryOptions() {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        countries.map(country => {
            const countryOption = document.createElement('option');
            const countryName = country.name.common;
            const countryCode = country.cca2;
            countryOption.textContent = `${countryCode} (${countryName})`;
            countryOption.value = countryCode;
            selectCountry.append(countryOption);
        })
    })
}

getCountryOptions()

informationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const code = event.target.country.value
    getAgeByNameAndCountry(name, code);
    getGenderByNameAndCountry(name, code);
    getNationalityByName(name);
})

function getAgeByNameAndCountry(name, code) {
    fetch(`https://api.agify.io?name=${name}&country_id=${code}`)
    .then(response => response.json())
    .then(data => {

        if (data.age) {
            textName.textContent = `Name: ${data.name}`;
            textAge.textContent = `Age: ${data.age}`;
        } else {
            textName.textContent = 'Name not found';
            textAge.textContent = '';
        }
    })
}

function getGenderByNameAndCountry(name, code) {
    fetch(`https://api.genderize.io?name=${name}&country_id=${code}`)
    .then(response => response.json())
    .then(data => {

        if (data.gender) {
            textGender.textContent = `Gender: ${data.gender}`;
            textProbability.textContent = `Probability: ${data.probability}`;
        } else {
            textGender.textContent = '';
            textProbability.textContent = '';
        }
    })
}

function getNationalityByName(name) {
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        textNationality.textContent = 'Nationality:';
        const ulElement = document.createElement('ul');
        textNationality.append(ulElement);
        data.country.map(item => {
            const liElement = document.createElement('li');
            liElement.textContent = `${item['country_id']} (probability: ${item.probability})`;
            ulElement.append(liElement);
        })
    })
}