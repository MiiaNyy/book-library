//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookButton = document.querySelector('#add-book-btn');
let readingStatusBtn = document.querySelector('.reading-status-btn');

let bookFormBtn = document.querySelector('.add-book');
let closeWindowBtn = document.querySelector('.close-window');


let library = [];

class Book {
    constructor(title, author, genre, pages, readingStatus) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.readingStatus = readingStatus;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

function checkIfEmpty() {
    const input = document.querySelectorAll('input');

    input.forEach(element => {
        element.addEventListener('input', evt => {
            const value = element.value;
            console.log(element.value)
            if (!value) {
                element.dataset.state = ''
                return
            }
            

            const trimmed = value.trim()

            if (trimmed) {
                element.dataset.state = 'valid';
            } else {
                element.dataset.state = 'invalid';
            }
        })
    });



}


function addBookToView(bookObj) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    gridContainer.appendChild(bookCard);

    for (let key in bookObj) {
        checkIfEmpty(bookObj[key]);
        console.log(key);
        switch (key) {
            case 'title':
                bookCard.innerHTML += "<div><h4>" + bookObj[key] + "</h4></div>";
                break;
            case 'author':
                bookCard.innerHTML += "<div><p>Author:<br> " + bookObj[key] + "</p></div>";
                break;
            case 'genre':
                bookCard.innerHTML += "<div><p> Genre:<br> " + bookObj[key] + "</p></div>";
                break;
            case 'pages':
                bookCard.innerHTML += "<div><p> " + bookObj[key] + " pages</p></div>";
                break;
            case 'readingStatus':
                console.log(bookObj[key]);
                if (bookObj[key] == 'read') {
                    bookCard.innerHTML += "<div><button class='reading-status-btn'>Read</button></div>";
                } else if (bookObj[key] == 'not-read') {
                    bookCard.innerHTML += "<div><button class='reading-status-btn not-read-btn'>Not read</button></div>";
                } else {
                    bookCard.innerHTML += "<div><button class='reading-status-btn in-progress-btn'>In progress</button></div>";
                }
                break;
            case ' ':
                console.log(bookObj + ' is empty');
                break;
        }
    }
}

function displayBooks() {

    for (let i = 0; i < library.length; i++) {
        addBookToView(library[i]);
    }
}

function clearView() {
    gridContainer.innerHTML = '';
}

function getNewBookObject() {
    let newBook = [];

    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];
        if (formElement.name == 'title' || formElement.name == 'author' || formElement.name == 'genre' || formElement.name == 'pages' || (formElement.name == 'readingStatus' && formElement.checked)) {
            newBook.push(formElement.value);
        }
    }

    newBook = new Book(newBook[0], newBook[1], newBook[2], newBook[3], newBook[4]);
    addBookToLibrary(newBook);
    addBookToView(newBook);


    console.log(Object.values(newBook));


}


function toggleFormVisibility() {
    if (form.style.display === "none") {
        form.style.display = "block";

    } else {
        form.style.display = "none";
    }
}

closeWindowBtn.addEventListener('click', function() {
    form.style.display = 'none';
})

addBookButton.addEventListener('click', function () {
    getNewBookObject();

})

readingStatusBtn.addEventListener('click', function (e) {
    changeReadingStatus(e);
})

bookFormBtn.addEventListener('click', function () {
    toggleFormVisibility();
    form.classList.toggle('alert')

})

checkIfEmpty();