//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let bookForm = document.querySelector('.my-form')
let addBookButton = document.querySelector('#add-book')

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

let hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 'Fantasy adventure', 295, false);
let hungerGames = new Book('Hunger Games', 'Stacey Mellody', 'Dystopia', 465, true);
let vagabond = new Book('Vagabonding', 'Rolf Potts', 'Travel', 241, true);

function addBookToLibrary() {
    library.push(hobbit);
    library.push(hungerGames);
    library.push(vagabond);

}

function displayBook() {


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
                    if (bookObj[key]) {
                        bookCard.innerHTML += "<div><p>Read &#9989; </p></div>";
                    } else {
                        bookCard.innerHTML += "<div><p>Read &#10060;</p></div>";
                    }
                    break;
            }
        }
    }
}

let bookTitle;
addBookButton.addEventListener('click', function () {
    getNewBookObject();
})

function getNewBookObject() {

    let newBook = [];

    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];
        newBook.push(formElement.value);
    }


console.log(newBook);
}












addBookToLibrary();
displayBook();