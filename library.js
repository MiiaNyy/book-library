//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookBtn = document.querySelector('#add-book-btn');
//On the book-card div
let readingStatusBtn = document.querySelector('.reading-status-btn');

let openFormBtn = document.querySelector('.add-book');
let closeFormBtn = document.querySelector('.close-window');

let closeBookCardBtn = document.querySelector('.close-book-card');

let bookCard = document.querySelector('.book-card');


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

function pushBookToLibraryArr(book) {
    library.push(book);
}



function addBookToLibrary(bookObj) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML += "<span class='close-book-card'>&#10006;</span>"
    gridContainer.appendChild(bookCard);


    for (let key in bookObj) {
        switch (key) {
            case 'title':
                //add right class name whitout spaces, so we can compare it with the right object
                bookCard.innerHTML += "<div class='" + bookObj[key].replace(/\s+/g, '') + "'><h4>" + bookObj[key] + "</h4></div>";
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
        addBookToLibrary(library[i]);
    }
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
    pushBookToLibraryArr(newBook);
    addBookToLibrary(newBook);
}


function toggleFormVisibility() {
    if (form.style.display === "none") {
        form.style.display = "block";

    } else {
        form.style.display = "none";
    }
}

function removeBookFromView(event) {

    let parent = event.target.parentElement

    if (parent.className == 'book-card') {
        parent.style.display = 'none';

        removeBookFromLibrary(parent)

    }

}


function removeBookFromLibrary(parent) {

    let child = parent.childNodes;

    //Find the right class of the element and compare that to the library object and remove the right object
    for (let i = 0; i < child.length; i++) {
        let divsName = child[i].className;

        console.log('librarys length is ' + library.length );
        for (let j = 0; j < library.length; j++) {           

            //Remove all of the spaces so we can compare titles
            let objTitle = library[j].title.replace(/\s+/g, '');
            if (objTitle == divsName) {
                library.splice(j, 1);
            }
        }
    }
    console.log('Library is ' + library.length + ' items long after removin loop');
}








closeFormBtn.addEventListener('click', function () {
    form.style.display = 'none';
})

addBookBtn.addEventListener('click', function () {
    getNewBookObject();
    form.style.display = 'none';
    form.reset();

})

readingStatusBtn.addEventListener('click', function (e) {
    changeReadingStatus(e);
})

openFormBtn.addEventListener('click', function () {
    toggleFormVisibility();
    form.classList.toggle('alert')

})


document.addEventListener('click', function (event) {
    removeBookFromView(event)



})