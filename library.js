//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookButton = document.querySelector('#add-book-btn');
let readingStatusBtn = document.querySelector('.reading-status-btn');

let bookFormBtn = document.querySelector('.add-book');

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

function displayBooks() {

    for (let i = 0; i < library.length; i++) {
        let bookObj = library[i];

        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        gridContainer.appendChild(bookCard);

        for (let key in bookObj) {
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
                    } else if(bookObj[key] == 'not-read') {
                        bookCard.innerHTML += "<div><button class='reading-status-btn not-read-btn'>Not read</button></div>"; 
                    } else {
                        bookCard.innerHTML += "<div><button class='reading-status-btn in-progress-btn'>In progress</button></div>";
                    }
                    break;
            }
        }
    }
}

function clearView() {
    gridContainer.innerHTML = '';
}

function getNewBookObject() {
    let newBook = [];

    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];
        if(formElement.name == 'title' || formElement.name == 'author' || formElement.name == 'genre' || formElement.name == 'pages' || (formElement.name == 'readingStatus' && formElement.checked)) {
            newBook.push(formElement.value);
        }        
    }
    
    newBook = new Book(newBook[0], newBook[1], newBook[2], newBook[3], newBook[4] );
    addBookToLibrary(newBook);
    clearView();
    displayBooks();

console.log(newBook);
}

function changeReadingStatus(e) {
    readingStatusBtn.classList.toggle('not-read-btn');  
}





addBookButton.addEventListener('click', function () {
    getNewBookObject();
})

readingStatusBtn.addEventListener('click', function(e) {
    changeReadingStatus(e);
})

bookFormBtn.addEventListener('click', function() {
    form.style.display = 'block';
})






