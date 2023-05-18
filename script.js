const jokeButton = document.querySelector('.random-joke');
const jokeWrapper = document.querySelector('.joke-wrapper');
const jokeText = document.createElement('p');
jokeWrapper.append(jokeText);

jokeWrapper.append(jokeText);
jokeButton.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(joke => {
        jokeText.textContent = joke.value;
    })
})


const form = document.querySelector('.form-categories');
let selectElement = document.querySelector('#category');
const submitButton = document.querySelector('.joke-button');

function categoryOptions(button, select) {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(categories => {
        categories.map(category => {        
            let optionElement = document.createElement('option');        
            optionElement.textContent = '- ' + category;
            optionElement.value = category;     
            select.prepend(optionElement);   
        })

        button.removeAttribute('disabled');
    })
}

categoryOptions(submitButton, selectElement);

function createJokeByCategory() {
    const form = document.querySelector('.form-categories');
    form.addEventListener('submit', (event) => {
        event.preventDefault();     
        const category = event.target.category.value;
        fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(response => response.json())
        .then(joke => {
            jokeText.textContent = joke.value;
        })
    })
}

createJokeByCategory()



const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = event.target.search.value;
    searchForJoke(searchText)
})

function searchForJoke(text) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
    .then(response => response.json())
    .then(data => {
        let index = data.result.length - 1;
        let randomNumber = Math.random() * index;
        randomNumber = Math.round(randomNumber);

        let randomJoke = data.result[randomNumber].value;
        jokeText.textContent = randomJoke;
    })
    .catch(error => {
        jokeText.textContent = 'Not found, try something else..'
    })
}

function categoryAndSearch() {
    const searchAndCategoryForm = document.querySelector('.search-categories-form');
    const searchAndCategoryButton = document.querySelector('.search-button');
    let selectElement = document.querySelector('#categories');
    categoryOptions(searchAndCategoryButton, selectElement);

    searchAndCategoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchValue = event.target['search-for'].value;
        searchForJoke(searchValue);

        

    })
}

categoryAndSearch()
